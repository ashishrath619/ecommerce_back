var express = require('express');
var router = express.Router();
var pool= require('./pool')
require('dotenv').config()
var jwt=require('jsonwebtoken');
// const { token } = require('morgan');
var LocalStorage=require('node-localstorage').LocalStorage
var localStorage=new LocalStorage('/scratch')

function generateToken(username)
{
     return jwt.sign(username,process.env.TOKEN_SECRET,{expiresIn:'10s'})
}

router.post('/chklogin',function(req, res, next) {
    pool.query("select * from userlog where userid=? and password=?",[req.body.userid,req.body.password],function(err,result){
    if(err){
       console.log(err)
     return res.status(500).json([])

    }
    else
    { 
         if(result.length==1){
         console.log(result)
     const token=generateToken({username:result[0].username})
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
