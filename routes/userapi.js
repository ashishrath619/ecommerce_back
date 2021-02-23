var express = require("express");
var router = express.Router();
var pool = require("./pool");

var d = new Date();
// var h = (d.getHours() < 10 ? "0" : "") + d.getHours();
// var m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
var dmonth = d.getUTCMonth() + 1; //months from 1-12
var dday = d.getUTCDate();
var dyear = d.getUTCFullYear();
var gettime = dday + "/" + dmonth + "/" + dyear;
router.post("/add", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "insert into users (username,role,login_id,password,added_by,last_updated )values(?,?,?,?,?,?)",
    [
      req.body.username,
      req.body.role,
      req.body.login_id,
      req.body.password,
      req.body.added_by,
      req.body.last_updated,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: false, message: "server Error!..." });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Record insert......" });
      }
    }
  );
});

router.put("/update/:Newuser_id", function (req, res, next) {
  pool.query(
    "update users set username=?,role=?,login_id=?,password=?,added_by=?,last_updated=? where Newuser_id=?",
    [
      req.body.username,
      req.body.role,
      req.body.login_id,
      req.body.password,
      req.body.added_by,
      req.body.last_updated,
      req.params.Newuser_id,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: false, message: "server Error!..." });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Record Updated......" });
      }
    }
  );
});

router.get("/read", function (req, res, next) {
  pool.query("select * from  users", function (error, result) {
    if (error) {
      return res
        .status(500)
        .json({ status: false, data: [], message: "Server Error!...." });
    } else {
      return res
        .status(200)
        .json({ status: true, data: result, message: "Record Found...." });
    }
  });
});

router.get("/readbyid/:Newuser_id", function (req, res, next) {
  pool.query(
    "select * from users where  Newuser_id=?",
    [req.params.Newuser_id],
    function (error, result) {
      if (error) {
        return res
          .status(500)
          .json({ status: false, data: [], message: "Server Error!...." });
      } else {
        return res
          .status(200)
          .json({ status: true, data: result, message: "Record Found...." });
      }
    }
  );
});
router.delete("/delete/:Newuser_id", function (req, res, next) {
  pool.query(
    "delete from users where  Newuser_id=?",
    [req.params.Newuser_id],
    function (error, result) {
      if (error) {
        return res
          .status(500)
          .json({ status: false, data: [], message: "Server Error!...." });
      } else {
        return res
          .status(200)
          .json({ status: true, data: result, message: "Record Found...." });
      }
    }
  );
});
module.exports = router;
