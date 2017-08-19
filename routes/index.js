var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Bring in models
let Article = require('../models/articles');

//Check connection
db.once('open', function(){
    console.log('1Connected to MongoDB');
})
//Check for DB errors
db.on('error', function(error){
    console.log(error);
})



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