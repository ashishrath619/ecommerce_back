var express = require('express');
var router = express.Router();
var pool= require('./pool')
var multer=require('./multer');

/* GET home page. */
router.post('/addnewrecord',multer.any(),function(req, res, next) {
    pool.query('insert into modeldata (category,brand,model,description)values(?,?,?,?)',[req.body.category,req.body.brand,req.body.model,req.body.description],function(err,result){

    if(err){
        console.log(err)
      return res.status(500).json({'RESULT':false})
     }
     else

{  console.log(result.affectedRows)
    if(result.affectedRows>=1)
     return res.status(200).json({'RESULT':true})
     else
     return res.status(500).json({'RESULT':false})
     
}
})
});

router.get('/displayall',multer.any(),function(req, res, next) {
    pool.query("select p . *,(select C.categoryname from categories C where C.categoryid=p.category) as categoryname,(select  B.brandname from brand B where B.brandid=p.brand) as brandname from  modeldata p",function(err,result){
        if(err){
            console.log(err)
          return res.status(500).json([])
         }
         else

    {  console.log(result.affectedRows)
         return res.status(200).json(result)
         
    }
    })
});
router.post('/displayallmodel',function(req, res, next) {
    pool.query("select * from modeldata ",function(err,result){
    if(err){
       console.log(err)
     return res.status(500).json([])
    }
    else
    {
         return res.status(200).json(result)
        
         
    }
    })
   });

   router.post('/deleteData',multer.any(),function(req, res, next) {
    pool.query("delete from  modeldata where modelid=?",[req.body.modelid],function(err,result){
        if(err){
            console.log(err)
          return res.status(500).json([])
         }
         else

    {  console.log(result.affectedRows)
         return res.status(200).json(result)
        
    }
    })
});
router.post('/editData',multer.any(),function(req,res){
  q='update modeldata set category=?,brand=?,model=? ,description=? where modelid=?'
  para=[req.body.category,req.body.brand,req.body.model,req.body.description,req.body.modelid]

  pool.query(q,para,function(err,result){
    if(err){
        console.log(err)
        return res.status(500).json({'RESULT':false})
      }
      else
      {
        return res.status(200).json({'RESULT':true})
      }
    })
})

module.exports = router;
