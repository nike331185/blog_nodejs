var express = require('express');
var router =express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

db.once('open', function(){
    console.log('2Connected to MongoDB');
})
//Check for DB errors
db.on('error', function(error){
    console.log(error);
})

//Bring in models
let Article = require('../models/articles');

router.get('/add', function(req, res) {
  res.render('add', {
    title:'Add Articles'
  });
});
router.get('/:id',function(req,res){
  console.log("req.params.id",req.params.id);
    Article.findById(req.params.id,function(err, article){
       if(err){
            console.log(err)
       } else{
            res.render('article',{
                title:'Articles',
                article:article
            });
            //res.status(200).send({ "success": true, "result": article });
       }       
       
   });     
});

router.get('/edit/:id',function(req,res){
  console.log("req.params.id",req.params.id);
    Article.findById(req.params.id,function(err, article){
       if(err){
            console.log(err)
       } else{
            res.render('edit',{
                title:'Edit Articles',
                article:article
            });
            //res.status(200).send({ "success": true, "result": article });
       }       
       
   });     
});


router.post('/add', function(req, res) {
  let article = new Article(); 
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  article.save(function(err){
    if(err){  
      console.log(err);
      return;
    }else{
      res.redirect('/');
    }
  });
});
router.post('/edit/:id', function(req, res) {
  let article = {}; 
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  let query ={_id:req.params.id}
  Article.update(query, article, function(err){
    if(err){  
      console.log(err);
      return;
    }else{
      res.redirect('/');
    }
  });

});




module.exports = router;