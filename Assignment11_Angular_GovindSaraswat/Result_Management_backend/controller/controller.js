const db = require("../dbconnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.home = (req, res) => {
  res.send("api are working ...");
};

//signup
module.exports.signup = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // checking if email id already exits or not
  let emailqry = `select email from teachers where email = '${email}' `;
  db.query(emailqry, async (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.send({
        status: false,
        msg: "Email Id already exists",
      });
    } else {
      // password decrypt
      let decryptpwd = await bcrypt.hash(password, 10);

      //insert data
      let insertqry = `insert into teachers(name,email,password) values('${name}', '${email}', '${decryptpwd}')`;
      db.query(insertqry, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send({
            status: true,
            msg: "User Registration Successful",
          });
        }
      });
    }
  });
};

// login
module.exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // check email id
  let checkemailid = `select * from teachers where email = '${email}'`;
  db.query(checkemailid, async (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      let data = {
        name: result[0].name,
        email: result[0].email,
      };

      //check password
      let checkpwd = await bcrypt.compare(password, result[0].password);
      if (checkpwd === true) {
        const token = jwt.sign({ data }, "privatekey");
        res.send({
          status: true,
          token: token,
          result: data,
          msg: "Login Successful",
        });
      } else {
        res.send({
          status: false,
          msg: "Invalid Credentials",
        });
      }
    } else {
      res.send({
        status: false,
        msg: "Email Id doesn't exist",
      });
    }
  });
};

// get all students records
module.exports.record = (req, res) => {
  //verifying tokens
  let checkToken = verifyToken(req.token);
  if (checkToken.status == true) {
    let recordqry = "select * from students";

    db.query(recordqry, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        res.send({
          status: true,
          message: "Students Records are",
          data: result,
        });
      } else {
        res.send({
          status: false,
          message: "No Records!",
          data: result,
        });
      }
    });
  } else {
    res.send({
      status: false,
      message: "Invalid Token!",
    });
  }
};

// get single student data
module.exports.singleRecord = (req, res) => {
  let rollno = req.params.id;
  let resultqry = `select * from students where rollno = ${rollno}`;

  db.query(resultqry, (err, result) => {
    if (err) {
      throw err;
    } else if (result.length > 0) {
      res.send({
        status:true,
        message: "Requested Student Result!",
        data: result,
      });
    } else {
      res.send({
        status:false,
        message: "Result Not Found!",
      });
    }
  });
};

// add student result
module.exports.addResult = (req, res) => {
  let rollno = req.body.rollno;
  let name = req.body.name;
  let dob = req.body.dob;
  let score = req.body.score;

  // check if rollno already exists
  let checkqry = `select * from students where rollno = ${rollno}`;
  db.query(checkqry, (err, result) => {
    if (err) {
      throw err;
    } else if (result.length > 0) {
      res.send({
        status: false,
        msg: "RollNo already exists",
      });
    } else {
      let qr = `insert into students values (${rollno}, '${name}', '${dob}', ${score})`;

      db.query(qr, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send({
            message: "Data inserted",
            data: result,
          });
        }
      });
    }
  });
};

// update result
module.exports.updateResult = (req, res) => {
  let rollno = req.body.rollno;
  let name = req.body.name;
  let dob = req.body.dob;
  let score = req.body.score;

  let qr = `update students set rollno = ${rollno}, name = '${name}' , dob = '${dob}', score = ${score} where rollno = ${rollno}`;

  db.query(qr, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        message: "Data updated",
        data: result,
      });
    }
  });
};

// delete result
module.exports.deleteResult = (req, res) => {
  let rollno = req.params.id;
  console.log(rollno);
  let qr = `delete from students where rollno = ${rollno}`;

  db.query(qr, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        data:result,
        message: "Requested Data Deleted",
      });
    }
  });
};

// verify token
function verifyToken(token) {
  return jwt.verify(token, "privatekey", (err, result) => {
    if (err) {
      let a = { status: false };
      return a;
    } else {
      let b = { status: true };
      return b;
    }
  });
}
