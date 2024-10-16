const { ObjectId } = require('mongodb');
const {getCollectionRef}=require('../utility/mongoDBClient.js')
const {apiResponseBody}=require('../utility/apiResponseBody.js')
const { generateSignedUrl }=require('../S3/s3.js')
const bcrypt = require("bcryptjs")
const { generateJwtToken,calculateAge,generateStrongPassword,extractTokenInfo,hashing } = require('../utility/methods.js');
const validator = require('validator');
const { Parser } = require('json2csv');
const dotenv = require("dotenv");
const axios = require('axios');
dotenv.config()

exports.signup = async (event) => {
  console.log("email>>", event.body);
  try {
    const { name, email, password } = event.body;
    console.log(email, password);
    const collection = await getCollectionRef("assessmentUser");
    const user = await collection.findOne({ email: email });
    console.log("user>>", user);

    if (user) {
        return apiResponseBody(400, false, "email already exist");
    }
    const hashedPassword=await hashing(password);
    const newUser = await collection.insertOne({ email, name, password:hashedPassword });
    console.log("emp>>", newUser);
    return apiResponseBody(200, true, "User added successfully");
  } catch (error) {
    console.log(error);
    return apiResponseBody(500, false, "Internal Server Error");
  }
};

exports.login = async (event) => {
  console.log("email>>", event.body);
  try {
      const { email, password } = event.body;
      console.log(email,password);
      const collection = await getCollectionRef("assessmentUser");
      const user = await collection.findOne({ email: email });
      console.log("user", user);

      if (!user) {
          return apiResponseBody(400, false, "User Not Found");
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("valid>>",isPasswordValid);
      if (!isPasswordValid) {
        return apiResponseBody(400, false, "Invalid Password");
      }
      if (user.testGiven) {
        return apiResponseBody(400, false, "Test Already Given");
      }
      console.log("user", user);
      const payload = { _id: user._id.toString()};
      console.log("payload", payload);
      const token = generateJwtToken(payload, process.env.JWT_SECRET);
      console.log("token", token);
      
      // Create the response with the success message and data
      let response = apiResponseBody(200, true, user);
      
      // Set the cookie in the response headers
      response.headers = {
          "Set-Cookie": `access_token=${token}; Max-Age=${86400}; HttpOnly; SameSite=None; Secure; Path=/`,
          ...response.headers // Include other headers if needed
      };
    
      console.log("res after>>", response);
      return response;
  } catch (error) {
      console.log(error);
      return apiResponseBody(500, false, "Internal Server Error");
  }
};

exports.resetPassword = async (event) => {
  try {
    const { email, newPassword, confirmNewPassword } = event.body;
    console.log(email,newPassword,confirmNewPassword);
    const collection = await getCollectionRef("assessmentUser");
    const user = await collection.findOne({ email: email });

    if (!user) {
      return apiResponseBody(400, false, "User not found");
    }

    if (newPassword !== confirmNewPassword) {
      return apiResponseBody(400, false, "Passwords do not match");
    }

    const hashedPassword = await hashing(newPassword);
    await collection.updateOne({ email: email }, { $set: { password: hashedPassword } });

    return apiResponseBody(200, true, "Password reset successfully");
  } catch (error) {
    console.error(error);
    return apiResponseBody(500, false, "Internal Server Error");
  }
};

exports.addQuestion = async (event) => {
  try {
    const { answers } = event.body;
    const collection = await getCollectionRef("assessmentUser");

    // Assuming the structure of a question document in MongoDB
   

    await collection.insertOne(questionDocument);

    return apiResponseBody(200, true, "Question added successfully");
  } catch (error) {
    console.error(error);
    return apiResponseBody(500, false, "Internal Server Error");
  }
};

exports.getAllQuestions = async () => {
  try {
    const collection = await getCollectionRef("questionBank");

    const questions = await collection.find().toArray();

    return apiResponseBody(200, true, questions);
  } catch (error) {
    console.error(error);
    return apiResponseBody(500, false, "Internal Server Error");
  }
};


exports.addScore = async (event) => {
  try {
    const { email } = event.body; // Extract email from the request body
    const collection = await getCollectionRef("assessmentUser");

    // Step 1: Find the user by their email
    const user = await collection.findOne({ email: email });

    if (!user) {
      return apiResponseBody(404, false, "User not found");
    }

    // Step 2: Calculate the total score
    const { score } = user; // Get the score array from the user's details
    let totalScore = { depressed: 0, anxiety: 0, stressed: 0 };

    // Calculate the sum of each field
    score.forEach((item) => {
      totalScore.depressed += item.depressed;
      totalScore.anxiety += item.anxiety;
      totalScore.stressed += item.stressed;
    });

    // Multiply each sum by 2
    totalScore.depressed *= 2;
    totalScore.anxiety *= 2;
    totalScore.stressed *= 2;


    const filter = { email: email }; // Filter based on the user's email
    const update = {
      $set: { totalScore: totalScore } // Set the new total score object
    };

    await collection.updateOne(filter, update);

    return apiResponseBody(200, true, totalScore);
  } catch (error) {
    console.error(error);
    return apiResponseBody(500, false, "Internal Server Error");
  }
};



exports.addAnswers = async (event) => {
  try {
    const {score}  = event.body; // Extract answers from the request body
    console.log(">>",score);
    const collection = await getCollectionRef("assessmentUser");

    
    // Step 1: Find the user by their email
    const user = await collection.findOne({ email: score.email });

    if (!user) {
      return apiResponseBody(404, false, "User not found");
    }


    const newScore = {
      depressed: score.depressed,
      anxiety: score.anxiety,
      stressed: score.stressed
    };

    const filter = { email: score.email }; 
    const update = { $push: { score: newScore } }; 

    await collection.updateOne(filter, update);

    return apiResponseBody(200, true, "Score added successfully");
  } catch (error) {
    console.error(error);
    return apiResponseBody(500, false, "Internal Server Error");
  }
};


exports.calculateScore = async (event) => {
  console.log("insde score>>");
  try {
    // const { email } = event.body; // Extract email from the request body
    const collection = await getCollectionRef("assessmentUser");
    const email = 'mdadilakhtar8@gmail.com';

    // Step 1: Find the user by their email
    const user = await collection.findOne({ email: email });
    console.log("user>>");
    if (!user) {
      return apiResponseBody(404, false, "User not found");
    }

    // Step 2: Calculate the sum of scores for Depressed, Anxiety, and Stressed
    let depressedScore = 0;
    let anxietyScore = 0;
    let stressedScore = 0;

    if (user.score && Array.isArray(user.score)) {
      user.score.forEach(scoreObj => {
        depressedScore += scoreObj.depressed || 0;
        anxietyScore += scoreObj.anxiety || 0;
        stressedScore += scoreObj.stressed || 0;
      });
    }
     console.log("final score>>",depressedScore,anxietyScore,stressedScore);
    // Return the calculated scores as an object
    return apiResponseBody(200, true, { depressed: depressedScore, anxiety: anxietyScore, stressed: stressedScore });
  } catch (error) {
    console.error(error);
    return apiResponseBody(500, false, "Internal Server Error");
  }
};


exports.testGiven = async (event) => {
  try {
    const { email } = event.body; // Extract email from the request body
    console.log("email>>", email);
    const collection = await getCollectionRef("assessmentUser");

    // Step 1: Find the user by their email
    const user = await collection.findOne({ email: email });

    // If the user doesn't exist, return without doing anything
    if (!user) {
      return apiResponseBody(404, false, "User not found");
    }

    // Step 2: Update the user's document
    const filter = { email: email }; // Filter based on the user's email
    const update = {
      $set: {
        testGiven: true, // Set testGiven to true if the field doesn't exist
      }
    };

    await collection.updateOne(filter, update);

    return apiResponseBody(200, true, "updated successfully");
  } catch (error) {
    console.error(error);
    return apiResponseBody(500, false, "Internal Server Error");
  }
};



