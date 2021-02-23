var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("./multer");
// const { json } = require('express');
// const { response } = require('express');
var LocalStorage = require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage("/scratch");

/* GET home page. */
router.post("/addnewrecord", multer.any(), function (req, res, next) {
  if (!localStorage.getItem("token")) {
    return res.status(200).json("Sesson Expire pls login ");
  }
  pool.query(
    "insert into categories(categoryname,description,icon,ad,adstatus)values(?,?,?,?,?)",
    [
      req.body.categoryname,
      req.body.description,
      req.files[0].filename,
      req.files[1].filename,
      req.body.adstatus,
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ RESULT: false });
      } else {
        console.log(result.affectedRows);
        if (result.affectedRows >= 1)
          return res.status(200).json({ RESULT: true });
        else {
          return res.status(200).json({ RESULT: false });
        }
      }
    }
  );
});
router.get("/displayall", function (req, res, next) {
  if (!localStorage.getItem("token")) {
    return res.status(200).json("Sesson Expire pls login ");
  }
  pool.query("select * from categories", function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json([]);
    } else {
      return res.status(200).json(result);
    }
  });
});
router.post("/deleteData", function (req, res, next) {
  if (!localStorage.getItem("token")) {
    return res.status(200).json("Sesson Expire pls login ");
  }
  pool.query(
    "delete  from categories where categoryid=?",
    [req.body.categoryid],
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

router.post("/editData", multer.any(), function (req, res) {
  if (!localStorage.getItem("token")) {
    return res.status(200).json("Sesson Expire pls login ");
  }
  var q = "";
  if (req.body.icon != "" && req.body.ad != "") {
    q =
      "update categories set categoryname=?,description=?,icon=?,ad=?,adstatus=? where categoryid=?";
    para = [
      req.body.categoryname,
      req.body.description,
      req.files[0].filename,
      req.files[1].filename,
      req.body.adstatus,
      req.body.categoryid,
    ];
  } else if (req.body.icon != "") {
    q =
      "update categories set categoryname=?,description=?,icon=?,adstatus=? where categoryid=?";
    para = [
      req.body.categoryname,
      req.body.description,
      req.files[0].filename,
      req.body.adstatus,
      req.body.categoryid,
    ];
  } else if (req.body.ad != "") {
    q =
      "update categories set categoryname=?,description=?,ad=?,adstatus=? where categoryid=?";
    para = [
      req.body.categoryname,
      req.body.description,
      req.files[0].filename,
      req.body.adstatus,
      req.body.categoryid,
    ];
  } else {
    q =
      "update categories set categoryname=?,description=?,adstatus=? where categoryid=?";
    para = [
      req.body.categoryname,
      req.body.description,
      req.body.adstatus,
      req.body.categoryid,
    ];
  }

  pool.query(q, para, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({ RESULT: false });
    } else {
      return res.status(200).json({ RESULT: true });
    }
  });
});
router.get("/fetchcategory", function (req, res, next) {
  pool.query("select * from categories", function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json([]);
    } else {
      return res.status(200).json(result);
    }
  });
});
router.get("/fetchcategoryadstatus", function (req, res, next) {
  pool.query(
    "select * from categories where adstatus='Yes'",
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
