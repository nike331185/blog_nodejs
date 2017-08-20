var express = require('express');
var router =express.Router();

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

router.delete('/:id',function(req,res){
  let query = {_id:req.params.id}

  Article.remove(query,function(err){
     if(err){ 
        console.log(err)
      } else{
          res.send('Success');
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
  //檢查輸入是否有誤
  req.checkBody('title','Title is required').notEmpty();
  req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();

  let errors = req.validationErrors();
  console.log("errors",errors);
  if(errors){
    res.render('add',{
        title:'Add Articles',
        errors:errors
    });
  }else{
    let article = new Article(); 
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
      if(err){  
        console.log(err);
        return;
      }else{
        req.flash('success','Article Added')
        res.redirect('/');
      }
    });
  }  
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