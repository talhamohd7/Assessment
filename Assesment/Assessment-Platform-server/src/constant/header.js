// exports.headers = {
//     'Access-Control-Allow-Headers': 'Authorization, Content-Type', // Add Content-Type here
//     'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN_FOR_CORS,
//     'Access-Control-Allow-Methods': 'DELETE, GET, POST, OPTIONS, PUT, PATCH',
//     'Content-Type': 'image/png, image/jpeg, image/gif, image/svg+xml, application/pdf, video/mp4, video/quicktime, video/avi, audio/mpeg, audio/wav, application/json' // Include application/json here
// };



https://assessment-platform-b630c.web.app
// http://localhost:5173

exports.headers= {
    'Access-Control-Allow-Origin' : 'https://assessment-platform-b630c.web.app',
    'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Credentials' : true,
    'Content-Type': 'application/json'
}


