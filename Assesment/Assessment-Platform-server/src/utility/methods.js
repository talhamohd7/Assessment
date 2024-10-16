const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function hashing(plaintextPassword) {
    try {
        const hash = await bcrypt.hash(plaintextPassword, 10);
        console.log("Hashed Password:", hash);
        return hash;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function generateJwtToken(payload, secretKey) {
    const token = jwt.sign(payload, secretKey);
    return token;
}

function calculateAge(dateOfBirth) {
    console.log(dateOfBirth);
      const [day, month, year] = dateOfBirth.split('-').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; 
      const currentDay = currentDate.getDate();
      let age = currentYear - year;
      if (currentMonth < month || (currentMonth === month && currentDay < day)) {
          age--;
      }
      return age;
  }


  function generateStrongPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
  }





const extractTokenInfo = async (cookies) => {
    try {
      const token = cookies ? cookies.split('=')[1] : null; // Extract token from Cookie header
      console.log("Token:", token);
      if (!token) {
        throw new Error("Access token not found in cookies");
      }
      console.log("helo>>",token,process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);
      return {
        id: decoded._id,
        organisation_id: decoded.organisation_id,
        emp_id: decoded.emp_id,
      };
    } catch (error) {
      console.error("Token Verification Error:", error);
      throw new Error("Invalid access token");
    }
  };



  
module.exports = {
    hashing,
    generateJwtToken,
    calculateAge,
    generateStrongPassword,
    extractTokenInfo
};