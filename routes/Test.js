var express = require("express");
var router = express.Router();
var pool = require("./pool");

const tablename = "test_dell";

// router.post("/addUpdate", function (req, res, next) {
//   var q = "0";
//   pool.query(q, [], function (error, result) {
//     if (error) {
//       return res.status(500).json({ result: false });
//     } else {
//       return res.status(500).json({ result: true });
//     }
//   });
// });

router.post("/addandupdate", function (req, res, next) {
  res.status(200).json({ status: true, ...req.body });
  pool.query(
    `select * from ${tablename} where idTest_dell=? `,
    [req.body.idTest_dell],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err });
      } else {
        if (result.length > 0) {
          pool.query(
            `update ${tablename} set ? where idTest_dell=? `,
            [req.body, req.body.idTest_dell],
            function (uerr, uresult) {
              if (uerr) {
                res.status(500).json({
                  status: false,
                  message: "server error",
                });
              } else {
                res.status(200).json({
                  status: true,
                  message: "Record update sucessfully",
                });
              }
            }
          );
        } else {
          pool.query(
            `insert into ${tablename} set ?`,
            req.body,
            function (uerr, uresult) {
              if (uerr) {
                res.status(500).json({
                  status: false,
                  message: "Server Error add new record",
                });
              } else {
                res.status(200).json({
                  status: true,
                  message: "Record added successfully",
                });
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
