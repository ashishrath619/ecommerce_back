var express = require('express');
var router = express.Router();
var pool=require('./pool')
var multer=require('./multer')

/* GET home page. */

router.post('/addnewmodel',multer.any(),function(req, res, next) {
  
    console.log(req.body)
    pool.query("insert into model(category,brandid,modelnam,description) values(?,?,?,?)",
    [req.body.category,req.body.brandid,req.body.modelnam,req.body.description],function(err,result){
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

  router.get('/displayall',function(req,res,next){
    // if(!localStorage.getItem('token')){
    //   return res.status(200).json('Session has Expired Please Login Again')
    // }
     pool.query("select p . *,(select C.categoryname from categories C where C.categoryid=p.category) as categoryname,(select  B.brandname from brand B where B.brandid=p.brandid) as brandname from  model p",function(err,result){

      if(err){
        console.log(err)
      return res.status(500).json([])
     }
     else

{  console.log(result.affectedRows)
     return res.status(200).json(result)
     
}
})
  })

  router.post('/deleteRecord',function(req,res,next){
    // if(!localStorage.getItem('token')){
    //   return res.status(200).json('Session has Expired Please Login Again')
    // }
    pool.query("delete from model where modelid=?",[req.body.modelid],function(err,result){
      if(err){
        return  res.status(500).json([])
      }
      else{
        return  res.status(200).json(result)
      }
    })
  
  })
  
  router.post('/updateRecord',function(req, res, next) {
    // if(!localStorage.getItem('token')){
    //   return res.status(200).json('Session has Expired Please Login Again')
    // }
    console.log(req.body)
    pool.query("update model set category=? ,brandid=?,modelnam=?,description=? where modelid=?",
    [req.body.category,req.body.brandid,req.body.modelnam,req.body.description,req.body.modelid],function(err,result){
        if(err){
             console.log(err)
          return  res.status(500).json({RESULT:false})
        }
        else{
          console.log(result)
        return  res.status(200).json({RESULT:true})
  
        }
    })
  });

  router.post('/displaybyid',function(req, res, next) {
    console.log(req.body)
    pool.query("select * from model where brandid=?",[req.body.brandid],function(err,result){
        if(err){
             console.log(err)
          return  res.status(500).json([])
        }
        else{
          console.log(result)
        return  res.status(200).json(result)
  
        }
    })
  });


module.exports = router;
