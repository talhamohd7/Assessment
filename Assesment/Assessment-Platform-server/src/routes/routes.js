const {
  login,
  signup,
  addQuestion,
  getAllQuestions,
  addScore,
  calculateScore,
  resetPassword,
  addAnswers,
  testGiven
} = require("../controller/user");

exports.routes = {
  ["/login"]:{
      POST:login
  },
  ["/signup"]:{
    POST:signup
  },
  ["/resetPassword"]:{
    POST:resetPassword
  },
  ["/addQuestion"]:{
    POST:addQuestion
  },
  ["/getAllQuestions"]:{
    GET:getAllQuestions
  },
  ["/addScore"]: {
    PATCH: addScore,
  },
  ["/addAnswers"]:{
    PATCH:addAnswers
  },
  ["/calculateScore"]: {
    GET: calculateScore,
  },
  ["/testGiven"]: {
    PATCH: testGiven,
  },
};


