const express = require("express");
const router = express.Router();
//contoller path
const controller = require("../controller/controller");

router.get("/home", controller.home);

//signup routes
router.post("/signup", controller.signup);

//login routes
router.post("/login", controller.login);

//all students records routes
router.get("/record", requiredToken, controller.record);

//single student result
router.get("/student/:id", controller.singleRecord);

//add student result
router.post("/record", controller.addResult);

//update student result
router.put("/record/:id", controller.updateResult);

//delete student result
router.delete("/record/:id", controller.deleteResult);

// required token
function requiredToken(req, res, next) {
  let headers = req.headers["token"];

  if (typeof headers !== undefined && headers !== "") {
    req.token = headers;
    next();
  } else {
    res.send({
      status: false,
      msg: "token is required ...",
    });
  }
}

module.exports = router;
