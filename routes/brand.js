var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("./multer");

/* GET home page. */
router.post("/addbrand", multer.any(), function (req, res, next) {
  pool.query(
    "insert into brand(categoryid,brandname,description ,picture,ad,adstatus,topbrands,newbrands)values(?,?,?,?,?,?,?,?)",
    [
      req.body.categoryid,
      req.body.brandname,
      req.body.description,
      req.files[0].filename,
      req.files[1].filename,
      req.body.adstatus,
      req.body.topbrands,
      req.body.newbrands,
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ RESULT: false });
      } else {
        console.log(result.affectedRows);
        if (result.affectedRows >= 1)
          return res.status(200).json({ RESULT: true });
        else return res.status(200).json({ RESULT: false });
      }
    }
  );
});
router.get("/displayall", multer.any(), function (req, res, next) {
  pool.query(
    "select b. *,(select C.categoryname from categories C where C.categoryid=b.categoryid) as categoryname from  brand b",
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        console.log(result.affectedRows);
        return res.status(200).json(result);
      }
    }
  );
});
router.post("/deleteData", multer.any(), function (req, res, next) {
  pool.query(
    "delete from  brand where brandid=?",
    [req.body.brandid],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        console.log(result.affectedRows);
        return res.status(200).json(result);
      }
    }
  );
});
router.post("/editData", multer.any(), function (req, res) {
  var q = "";
  if (req.body.picture != "" && req.body.ad != "") {
    q =
      "update brand set categoryid=?,brandname=?,description=?,picture=?,ad=?,adstatus=?,topbrands=?,newbrands=? where brandid=?";
    para = [
      req.body.categoryid,
      req.body.brandname,
      req.body.description,
      req.files[0].filename,
      req.files[1].filename,
      req.body.adstatus,
      req.body.topbrands,
      req.body.newbrands,
      req.body.brandid,
    ];
  } else if (req.body.picture != "") {
    q =
      "update brand set categoryid=?,brandname=?,description=?,picture=?,adstatus=?,topbrands=?,newbrands=? where brandid=?";
    para = [
      req.body.categoryid,
      req.body.brandname,
      req.body.description,
      req.files[0].filename,
      req.body.adstatus,
      req.body.topbrands,
      req.body.newbrands,
      req.body.brandid,
    ];
  } else if (req.body.ad != "") {
    q =
      "update brand set categoryid=?,brandname=?,description=?,ad=?,adstatus=?,topbrands=?,newbrands=? where brandid=?";
    para = [
      req.body.categoryid,
      req.body.brandname,
      req.body.description,
      req.files[0].filename,
      req.body.adstatus,
      req.body.topbrands,
      req.body.newbrands,
      req.body.brandid,
    ];
  } else {
    q =
      "update brand set categoryid=?,brandname=?,description=?,adstatus=?,topbrands=?,newbrands=? where brandid=?";
    para = [
      req.body.categoryid,
      req.body.brandname,
      req.body.description,
      req.body.adstatus,
      req.body.topbrands,
      req.body.newbrands,
      req.body.brandid,
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

router.post("/displayallbrands", function (req, res, next) {
  pool.query(
    "select * from brand where categoryid=?",
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

router.post("/displayallbrandmainmenu", function (req, res, next) {
  pool.query(
    "select * from brand where categoryid=?",
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
//ads
router.get("/displayallbrandad", function (req, res, next) {
  pool.query("select * from brand where adstatus='No'", function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json([]);
    } else {
      return res.status(200).json(result);
    }
  });
});
router.get("/fetchtopbrand", function (req, res, next) {
  pool.query(
    "select * from brand where topbrands='Yes'",
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
