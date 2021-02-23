var express = require('express');
var router = express.Router();
var pool= require('./pool')
var multer= require('./multer'); 


router.post('/addpicinfo',multer.any(),function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    
    console.log("Length"+req.files.length)
    console.log("DATA"+req.files)
    
    let q=`insert into productpic(productname ,productid ,productpicture)values ?`;
    //'insert into productpictures(productid ,ppdescription,pppicture)values(?,?,?) '
    pool.query(q, [req.files.map(item=>[req.body.productname,req.body.productid,item.originalname])],function(error,result)
    { if(error) 
       {
          console.log(error)
          return res.status(500).json({'RESULT':false})
         
         }
        else
        { 
          console.log(result);
          
          return res.status(200).json({'RESULT':true})
        
        }
      
      })
  

   })
router.post('/addpic',multer.any(),function(req, res, next) {
   // console.log(req.body)
  //  console.log(req.files)
    
   return res.status(200).json('Session Expired Pls Login Again')
   })
   
   // where productname=?",[req.query.productname]
   router.post('/fetchproductpic',function(req, res, next) {
 
      pool.query("select * from productpic where productid=?",[req.body.productid] ,function(err,result){
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
    
  module.exports=router 