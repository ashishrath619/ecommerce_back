var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("./multer");

/* GET home page. */
router.post("/addnewuser", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "insert into userdetails(firstname,lastname,email,password,phone,state,city,address,zipcode)values(?,?,?,?,?,?,?,?,?)",
    [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.password,
      req.body.phone,
      req.body.state,
      req.body.city,
      req.body.address,
      req.body.zipcode,
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ RESULT: false });
      } else {
        console.log(result.affectedRows);
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});
module.exports = router;
