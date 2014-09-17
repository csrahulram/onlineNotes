/**
 * Created by sajankumar on 9/17/14.
 */
var mongoose = require('mongoose');
var NotesSchema = mongoose.Schema;

var Usernotes = new NotesSchema({

      userid:{type:String,required:true},
      notes:{type:String,required:true},
      created:{type:Date,required:true}

});

module.exports = mongoose.model('Usernotes', Usernotes);