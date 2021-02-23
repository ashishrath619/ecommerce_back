var express = require('express');
var router = express.Router();
var pool= require('./pool')
require('dotenv').config()
var jwt=require('jsonwebtoken');
// const { token } = require('morgan');
var LocalStorage=require('node-localstorage').LocalStorage
var localStorage=new LocalStorage('/scratch')

function generateToken(adminname)
{
     return jwt.sign(adminname,process.env.TOKEN_SECRET,{expiresIn:'10s'})
}

router.post('/chklogin',function(req, res, next) {
    pool.query("select * from adminlog where adminid=? and password=?",[req.body.adminid,req.body.password],function(err,result){
    if(err){
       console.log(err)
     return res.status(500).json([])

    }
    else
    { 
         if(result.length==1){
         console.log(result)
     const token=generateToken({adminname:result[0].adminname})
     localStorage.setItem('token',token)
         return res.status(200).json(result)
         }
         else{
          return res.status(200).json([])}

         
         
    }
    })
   });

   router.get('/logout',function(req,res){
       
        localStorage.removeItem('token')
       return  res.status(200).json(true)
        

   })

   router.get('/chktoken',function(req,res){
     if(!localStorage.getItem('token'))
     {
      return  res.status(200).json(false)
     }
     else{
    return  res.status(200).json(true)
     }

})

   module.exports = router;
