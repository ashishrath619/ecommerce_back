var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.post("/addnewrecord", function (req, res, next) {
  pool.query(
    "insert into employee (name,password,item) values(?,?,?)",
    [req.body.name, req.body.password, req.body.item],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "failed", status: false });
      } else {
        console.log(result);
        var id = result.insertId;
        var q = "";
        q = `insert into agee (idemployee,age,num) values(?,?,?)`;
        var m = JSON.stringify(req.body.age);
        para = [id, m, req.body.num];
        console.log(JSON.stringify(req.body.age));
        // return res.status(200).json({ message: "insert", status: true });
        pool.query(q, para, function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({ RESULT: false });
          } else {
            console.log(result);

            return res.status(200).json({ RESULT: true });
          }
        });
      }
    }
  );
});
module.exports = router;
