var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("./multer");

router.post("/addnewrecord", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "insert into task_one (name,rate,qty,description)values(?,?,?,?) ",
    [req.body.name, req.body.rate, req.body.qty, req.body.description],
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

router.get("/displaydata", function (req, res, next) {
  pool.query("select * from task_one", function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json([]);
    } else {
      return res.status(200).json(result);
    }
  });
});
router.post("/displaydatabyid", function (req, res, next) {
  pool.query(
    "select * from task_one where idtask_one=?",
    [req.body.idtask_one],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      } else {
        console.log(result);

        return res.status(200).json(result);
      }
    }
  );
});
router.post("/deleteData", function (req, res, next) {
  pool.query(
    "delete  from task_one where idtask_one=?",
    [req.body.idtask_one],
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

router.post("/updaterecord", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "update task_one set name=?,rate=?,qty=?,description=? where idtask_one=?  ",
    [
      req.body.name,
      req.body.rate,
      req.body.qty,
      req.body.description,
      req.body.idtask_one,
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

module.exports = router;
