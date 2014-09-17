var express = require('express');
var UsersNotes = require('../database/Usernotes');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    if(req.session.haslogged){

        UsersNotes.find({userid:req.session.haslogged.userid}).sort({created:-1}).exec(function(err,usernote){
            if(err){console.error(err)}

            res.render('users/users.ejs',{
                title:'Web Application',
                username:req.session.haslogged.name,
                notes:usernote
            });
        });

    }else
    {
        res.redirect('/');
    }

});

router.get('/logout',function(req,res){
    if(req.session.haslogged){
         req.session.destroy(function(err){
             if(err){res.send('unable to logout'); return}
             req.session = null;
             res.redirect('/');

         });
    }else
    {
        res.send('Sorry!, wrong request.');
    }

});

router.post('/create/notes',function(req,res){
    if(req.session.haslogged){

        var usernotes = new UsersNotes();
            usernotes.userid = req.session.haslogged.userid;
            usernotes.notes = req.body.contents;
            usernotes.created = Date.now();

        usernotes.save(function(err, unotes){
            if(err){res.send('Notes unable to save. Try again' + err); return}

            res.redirect('/users');

        });
    }
});

router.get('/notes/actions/trash/:id', function(req,res){
    if(req.session.haslogged){
        UsersNotes.findOneAndRemove({_id:req.params.id}, function(err){
              if(err){res.send('unable to delete the document' + err); return}
            res.redirect('/users');
        });
    }
});

router.post('/notes/actions/update/:id', function(req,res){
    if(req.session.haslogged){
        var query = {_id:req.params.id};

        UsersNotes.findOneAndUpdate(query,{$set:{notes:req.body.contents,created:Date.now()}},{upsert:true},function(err,unote){
            if(err){res.send('something went wrong' + err); return}

            res.redirect('/users');

        });
    }
})

module.exports = router;
