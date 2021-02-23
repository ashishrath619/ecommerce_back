const { log } = require("debug");
const { json } = require("express");
var express = require("express");
var router = express.Router();
var pool = require("./pool");

/* GET home page. */
router.post("/addnewrecord", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "insert into copy (mobileno,firstname,lastname,emailaddress,password,city,state,zipcode,address)values(?,?,?,?,?,?,?,?,?)",
    [
      req.body.mobileno,
      req.body.firstname,
      req.body.lastname,
      req.body.emailaddress,
      req.body.password,
      req.body.city,
      req.body.state,
      req.body.zipcode,
      req.body.address,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ RESULT: false });
      } else {
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.post("/checkuser", function (req, res, next) {
  pool.query(
    "select * from copy where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        console.log(err);
        return res.status(500).json({ RESULT: "Not Found", Data: [] });
      } else {
        if (result.length == 0) {
          return res.status(200).json({ RESULT: "NOT FOUND", DATA: [] });
        } else {
          return res.status(200).json({ RESULT: "FOUND", DATA: result });
        }
      }
    }
  );
});
router.post("/updatenewrecord", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "update copy set firstname=?,lastname=?,emailaddress=?,password=?,city=?,state=?,zipcode=?,address=? where mobileno=?",
    [
      req.body.firstname,
      req.body.lastname,
      req.body.emailaddress,
      req.body.password,
      req.body.city,
      req.body.state,
      req.body.zipcode,
      req.body.address,
      req.body.mobileno,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ RESULT: false });
      } else {
        console.log(result);
        return res.status(200).json({ RESULT: true, RESULT: result });
      }
    }
  );
});

router.post("/Displydata", function (req, res, next) {
  pool.query(
    "select * from copy where mobileno=?",
    [req.body.mobileno],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});
module.exports = router;
