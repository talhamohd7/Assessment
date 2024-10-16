// const aws=require('aws-sdk')
const dotenv=require('dotenv')
const crypto=require('crypto')
const { promisify } = require('util')
const {S3Client,PutObjectCommand}=require('@aws-sdk/client-s3')
const {getSignedUrl}=require('@aws-sdk/s3-request-presigner')
const {headers}=require('../constant/header')
dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWSREGION;
const bucketName = process.env.AWSBUCKETNAME;
const accessKeyId = process.env.AWSACCESSKEYID;
const secretAccessKey = process.env.AWSSECRETACCESSKEY;






const s3Client=new S3Client({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
})

exports.generateSignedUrl = async ()=>{
   const bytes = await randomBytes(16);
   const imageName = bytes.toString('hex');
   console.log("imagename>>",imageName);
   const command=new PutObjectCommand({
        Bucket: 'corportal',
        Key: `upload/profilePic/${imageName}`,
        ContentType: headers['Content-Type']
   })
   const url=await getSignedUrl(s3Client,command);
   console.log("yrl??",url,imageName);
   return {
    url,
    imageName
   }
}









//for get url
// const {S3Client,GetObjectCommand}=require('@aws-sdk/client-s3')
// const {getSignedUrl}=require('@aws-sdk/s3-request-presigner')


// const s3Client=new S3Client({
//     region,
//     accessKeyId,
//     secretAccessKey,
//     signatureVersion: "v4"
// })

// async function getObjectUrl(key){
//    const command=new GetObjectCommand({
//         Bucket: 'corportal',
//         Key: key,
//         // ContentType: 'image/jpeg'
//    })
//    const url=await getSignedUrl(s3Client,command);
//    return url
// }

// async function init(){
//     console.log("get object url",await getObjectUrl('mdadilkhan.jpeg'));
// }

// init()
