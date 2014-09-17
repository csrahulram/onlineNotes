var express = require('express');
var crypto = require('crypto');

var Users = require('../database/UsersInfoDB');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {

  if(req.session.haslogged){

      res.redirect('/users');
  }else
  {
      res.render('index', {
          title: 'Web Application',
          applicationname:'Online Notes'
      });
  }

});


router.post('/signup',function(req,res){
   if(!req.session.haslogged){

       var users = new Users();
           users.fullname = req.body.fullname;
           users.email = req.body.email;
       var cipher = crypto.createCipher('aes-256-cbc','salt');

       cipher.update(req.body.password,'utf8','base64');
           users.password = cipher.final('base64');
           users.joined = Date.now();

       users.save(function(err,user){
           if(err){console.error(err)}
           res.redirect('/');
       })
   }else{
       res.redirect('/')
   }

});

router.post('/login',function(req,res){
     if(!req.session.haslogged){
         var cipher = crypto.createCipher('aes-256-cbc','salt');
         cipher.update(req.body.password,'utf8','base64');
         Users.findOne({email:req.body.email, password:cipher.final('base64')}, function(err,user){
             if(err){res.send('Not a valid user :' + err); return}
             req.session.haslogged = {name:user.fullname, userid:user._id}
             res.redirect('/users');

         });
     }else{
        res.redirect('/')
    }
});

module.exports = router;
