var express = require('express');
var router = express.Router();
var pool= require('./pool')

router.get('/displayall',function(req, res, next) {
    pool.query("select * from  state",function(err,result){
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
router.post('/displayallcity',function(req, res, next) {
    pool.query("select * from  city where stateid=?",[req.body.stateid],function(err,result){
        if(err){
            console.log(req.body)
            console.log(err)
          return res.status(500).json([])
         }
         else

    {  console.log(result.affectedRows)
        console.log(req.body)

         return res.status(200).json(result)
         
    }
    })

    
});

module.exports = router;
