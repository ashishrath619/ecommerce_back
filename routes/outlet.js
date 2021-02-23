var express = require('express');
var router = express.Router();
var pool= require('./pool')
var multer=require('./multer');

/* GET home page. */
router.post('/addnewrecord',multer.any(),function(req, res, next) {
    pool.query('insert into outlets (firmname,ownername,mobile,phone,registrationno,gstno,address,state,city,location,photograph,emailid,description,averageprice,ratings,status,password,lat,lng)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.firmname,req.body.ownername,req.body.mobile,req.body.phone,req.body.registrationno,req.body.gstno,req.body.address,req.body.state,req.body.city,req.body.location,req.files[0].filename,req.body.emailid,req.body.description,req.body.averageprice,req.body.ratings,req.body.status,req.body.password,req.body.lat,req.body.lng],function(err,result){

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

router.get('/displayall',function(req, res, next) {
    pool.query("select o. *,(select S.statename from state S where stateid=o.state) as statename,(select C.cityname from city C where C.cityid=o.city) as cityname from  outlets o",function(err,result){
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

router.post('/deleteData',multer.any(),function(req, res, next) {
    pool.query("delete from  outlets where idoutlets=?",[req.body.idoutlets],function(err,result){
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

router.post('/editData',multer.any(),function(req, res) {
    console.log(req.body)
    var q=''
    if(req.body.photograph!='' )
    {
        q='update outlets set firmname=?,ownername=?,mobile=?,phone=?,registrationno=?,gstno=?,address=?,state=?,city=?,location=?,photograph=?,emailid=?,description=?,averageprice=?,ratings=?,status=?,password=?,lat=?,lng=? where idoutlets=?'
        para=[req.body.firmname,req.body.ownername,req.body.mobile,req.body.phone,req.body.registrationno,req.body.gstno,req.body.address,req.body.state,req.body.city,req.body.location,req.files[0].filename,req.body.emailid,req.body.description,req.body.averageprice,req.body.ratings,req.body.status,req.body.password,req.body.lat,req.body.lng,req.body.idoutlets]
    }
    else
    {
        q='update outlets set firmname=?,ownername=?,mobile=?,phone=?,registrationno=?,gstno=?,address=?,state=?,city=?,location=?,emailid=?,description=?,averageprice=?,ratings=?,status=?,password=?,lat=?,lng=? where idoutlets=?'
        para=[req.body.firmname,req.body.ownername,req.body.mobile,req.body.phone,req.body.registrationno,req.body.gstno,req.body.address,req.body.state,req.body.city,req.body.location,req.body.emailid,req.body.description,req.body.averageprice,req.body.ratings,req.body.status,req.body.password,req.body.lat,req.body.lng,req.body.idoutlets]
    }
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
});

module.exports = router;
