var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("./multer");

/* GET home page. */
router.post("/addproduct", multer.any(), function (req, res, next) {
  pool.query(
    "insert into productregister(venderid,category,brand,model,productname,description,price,offerprice,devilrycharge,ratings,color,status,ad,productads,adstatus)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.venderid,
      req.body.category,
      req.body.brand,
      req.body.model,
      req.body.productname,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      req.body.devilrycharge,
      req.body.ratings,
      req.body.color,
      req.body.status,
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
          console.log(result);
          return res.status(500).json({ RESULT: false });
        }
      }
    }
  );
});

router.get("/displayall", multer.any(), function (req, res, next) {
  pool.query(
    "select p . *,(select C.categoryname from categories C where C.categoryid=p.category) as categoryname,(select  B.brandname from brand B where B.brandid=p.brand) as brandname,(select A.modelnam from model A where A.modelid=p.model) as modelnam from  productregister p",
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

router.post("/deleterecord", function (req, res, next) {
  pool.query(
    "delete from productregister where productreid=?",
    [req.body.productreid],
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

router.get("/displayallproduct", function (req, res, next) {
  pool.query(
    "select P. *,false as cartstatus from productregister P",
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

//    router.get('/productbycategorylist',function(req,res,next){
//        pool.query(" select P. * ,false as cartstatus from productregister P where P.category=?",[req.body.category],function(error,result){
//            if(error){
//                console.log(error)
//                return res.status(500).json([])

//            }
//            else{
//                console.log(result)
//                return res.status(200).json(result)

//            }
//        })
//    })

router.post("/productbycategorylist", function (req, res, next) {
  pool.query(
    "select P.*,false as cartstatus from productregister P  where P.category=?",
    [req.body.category],
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
// ////////User view/////////

router.post("/displaybyid", function (req, res, next) {
  pool.query(
    "select P.*,(select B.brandname from Brand B where B.brandid=P.brand) as brandname, false as cartstatus from productregister P where productreid=?",
    [req.body.productreid],
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
