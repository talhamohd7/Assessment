// exports.bulkUpload = async (event) => {
//     console.log("inside bulkupload>>");
//     const csvFile = event.body; // Assuming event.body contains the parsed CSV data as an array of objects
//     console.log(csvFile.length);
//     console.log(csvFile);
//     const collection = await getCollectionRef('employees');

//     for (let i = 0; i < csvFile.length-1; i++) {
//         const { emp_name, emp_id, emp_departement, emp_designation, emp_gender, emp_gmail, emp_joining_date,organisation_Id,organisation_name,emp_mob_no,emp_dob,emp_address,emp_passowrd} = csvFile[i];
        
//         // Parse the date string in "dd-mm-yyyy" format and convert it to a Date object
//         const [day, month, year] = emp_joining_date.split('-');
//         const formattedDate = new Date(`${year}-${month}-${day}`);
//         const age=calculateAge(emp_dob)
//         console.log(age);
//         const insertResult = await collection.insertOne({ emp_name, emp_id, emp_departement, emp_designation, emp_gender, emp_gmail, emp_joining_date: formattedDate,organisation_Id, organisation_name, emp_mob_no, emp_dob, emp_address,emp_age:age,emp_passowrd});
//         console.log("Inserted user:", csvFile[i], insertResult.insertedId.toString());
//     }

//     return apiResponseBody(200, "success", event.body);
// };


// skippong the error record
// exports.bulkUpload = async (event) => {
//     console.log("inside bulkupload>>");
//     const csvFile = event.body; // Assuming event.body contains the parsed CSV data as an array of objects
//     console.log(csvFile.length);
//     console.log(csvFile);
//     const collection = await getCollectionRef('employees');

//     for (let i = 0; i < csvFile.length-1; i++) {
//         console.log("inside loop");
//         const { emp_name, emp_id, emp_departement, emp_designation, emp_gender, emp_gmail, emp_joining_date, organisation_Id, organisation_name, emp_mob_no, emp_dob, emp_address, emp_passowrd } = csvFile[i];
        
//         // Validate required fields
//         if (!emp_name || !emp_id || !emp_departement || !emp_designation || !emp_gender || !emp_gmail || !emp_joining_date || !organisation_Id || !organisation_name || !emp_mob_no || !emp_dob || !emp_address || !emp_passowrd) {
//             console.log(`Skipping record ${i + 1} due to missing required fields`);
//             continue;
//         }

//         // Validate email format
//         if (!validator.isEmail(emp_gmail)) {
//             console.log(`Skipping record ${i + 1} due to invalid email format: ${emp_gmail}`);
//             continue;
//         }

//         // Validate mobile number format
//         if (!validator.isMobilePhone(emp_mob_no, 'any', { strictMode: false })) {
//             console.log(`Skipping record ${i + 1} due to invalid mobile number format: ${emp_mob_no}`);
//             continue;
//         }

//         // Parse the date string in "dd-mm-yyyy" format and convert it to a Date object
//         const [day, month, year] = emp_joining_date.split('-');
//         const formattedDate = new Date(`${year}-${month}-${day}`);
//         const age = calculateAge(emp_dob);
//         console.log(age);
        
//         const insertResult = await collection.insertOne({ emp_name, emp_id, emp_departement, emp_designation, emp_gender, emp_gmail, emp_joining_date: formattedDate, organisation_Id, organisation_name, emp_mob_no, emp_dob, emp_address, emp_age: age, emp_passowrd });
//         console.log("Inserted user:", csvFile[i], insertResult.insertedId.toString());
//     }

//     return apiResponseBody(200, "success", event.body);
// };


// exports.bulkUpload = async (event) => {
//     console.log("inside bulkupload>>");
//     const csvFile = event.body; // Assuming event.body contains the parsed CSV data as an array of objects
//     console.log(csvFile.length);
//     console.log(csvFile);
//     const collection = await getCollectionRef('user');

//     for (let i = 0; i < csvFile.length-1; i++) {
//         const { emp_name, emp_id, emp_departement, emp_designation, emp_gender, emp_gmail ,emp_joining_date } = csvFile[i];
//         const insertResult = await collection.insertOne({ Email, Password, Name, emp_joining_date: new Date(emp_joining_date) });
//         console.log("Inserted user:",csvFile[i], insertResult.insertedId.toString());
//     }

//     return apiResponseBody(200, "success", event.body);
// };





// exports.bulkUpload = async (event) => {
//     console.log("inside bulkupload>>");
//     const csvFile = event.body; // Assuming event.body contains the parsed CSV data as an array of objects
//     console.log(csvFile.length);
//     console.log(csvFile);
//     const collection = await getCollectionRef('employees');

//     const skippedRecords = []; // Array to store skipped records

//     for (let i = 0; i < csvFile.length-1; i++) {
//         console.log("inside loop");
//         const { emp_name, emp_id, emp_departement, emp_designation, emp_gender, emp_gmail, emp_joining_date, organisation_Id, organisation_name, emp_mob_no, emp_dob, emp_address, emp_passowrd } = csvFile[i];
        
//         // Validate required fields
//         if (!emp_name || !emp_id || !emp_departement || !emp_designation || !emp_gender || !emp_gmail || !emp_joining_date || !organisation_Id || !organisation_name || !emp_mob_no || !emp_dob || !emp_address || !emp_passowrd) {
//             console.log(`Skipping record ${i + 1} due to missing required fields`);
//             skippedRecords.push(csvFile[i]); // Store skipped record
//             continue;
//         }

//         // Validate email format
//         if (!validator.isEmail(emp_gmail)) {
//             console.log(`Skipping record ${i + 1} due to invalid email format: ${emp_gmail}`);
//             skippedRecords.push(csvFile[i]); // Store skipped record
//             continue;
//         }

//         // Validate mobile number format
//         if (!validator.isMobilePhone(emp_mob_no, 'any', { strictMode: false })) {
//             console.log(`Skipping record ${i + 1} due to invalid mobile number format: ${emp_mob_no}`);
//             skippedRecords.push(csvFile[i]); // Store skipped record
//             continue;
//         }

//         // Parse the date string in "dd-mm-yyyy" format and convert it to a Date object
//         const [day, month, year] = emp_joining_date.split('-');
//         const formattedDate = new Date(`${year}-${month}-${day}`);
//         const age = calculateAge(emp_dob);
//         console.log(age);
        
//         try {
//             const insertResult = await collection.insertOne({ emp_name, emp_id, emp_departement, emp_designation, emp_gender, emp_gmail, emp_joining_date: formattedDate, organisation_Id, organisation_name, emp_mob_no, emp_dob, emp_address, emp_age: age, emp_passowrd });
//             console.log("Inserted user:", csvFile[i], insertResult.insertedId.toString());
//         } catch (error) {
//              console.log(error); 
//         }
        
//     }
//    console.log("after the loop");
//     // Convert skipped records to CSV format
//     let imageUrl
//     if (skippedRecords.length > 0) {
//       const json2csvParser = new Parser();
//       const csvData = json2csvParser.parse(skippedRecords);
//       console.log("csv", csvData);
//     //   // Save the CSV data to a file
//     //   const constantsFolderPath = path.join(__dirname, "..", "constant");
//     //   const filePath = path.join(constantsFolderPath, "skipped_records.csv");
//     //   console.log(filePath);
//     //   fs.writeFileSync(filePath, csvData);
  
//       try {
//         const { url, imageName } = await generateSignedUrl();
//         console.log("url>>", url, imageName);
//         const config = {
//           headers: {
//             "Content-Type": "text/csv",
//           },
//         };
//         axios
//           .put(url, csvData, config)
//           .then((res) => {
//             console.log("isnide res", res?.status);
//           })
//           .catch((err) => {
//             console.log("isndie err", err);
//           });

//         imageUrl = `https://${process.env.AWS_BUCKETNAME}.s3.${process.env.AWS_REGION}.amazonaws.com/upload/profilePic/${imageName}`;
//       } catch (error) {
//         console.log(error);
//       }
//     }
    
//     // Return response with success message and CSV file
//     return apiResponseBody(200, "success", { skippedRecords: imageUrl });
// };



