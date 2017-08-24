var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var passport = require('passport');

router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;    

    req.checkBody('name','name is required').notEmpty();
    req.checkBody('email','email is required').notEmpty();
    req.checkBody('email','email is required').isEmail();
    req.checkBody('username','username is required').notEmpty();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('password2','passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors : errors
        })
    } else {
       
        var newUser = new User({
            name:name,
            email:email,
            username:username,
            password:password
        });
        bcrypt.genSalt(10 ,function(err, salt){  //加密
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else {
                        req.flash('success','You are now registered and can login');
                        res.redirect('/users/login');
                    }
                })
            });
        });
    }   
});
router.get('/login',function(req, res){
    res.render('login');
});
router.post('/login',function(req, res, next){
  
    passport.authenticate('local', {
        successRedirect:'/',            // 成功則導入首頁
        failureRedirect:'/users/login', // 失敗則返回登入頁 
        failureFlash: true  // 允許 flash 訊息
    })(req, res, next) 
      
});
 


module.exports = router;