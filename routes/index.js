const express = require('express');
const router = express.Router();




//Bring in models
let Article = require('../models/articles');




router.get('/',function(req,res){
    Article.find({},function(err, articles){
       if(err){
            console.log(err)
       } else{
            res.render('index',{
                title:'Articles',
                articles:articles
            });
             //res.status(200).send({ "success": true, "result": articles });
       }       
   });     
});


module.exports = router;