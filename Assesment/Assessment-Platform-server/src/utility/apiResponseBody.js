
const { headers }=require('../constant/header.js')
exports.apiResponseBody = (statusCode, success, data) => {
    console.log("header>>",headers);
    return {
        statusCode,
        headers,
        body: JSON.stringify({success,data})
    }
}