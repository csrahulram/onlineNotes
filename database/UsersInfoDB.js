/**
 * Created by sajankumar on 9/16/14.
 */

var mongoose = require('mongoose');
var UsersSchema = mongoose.Schema;


var UsersInfo = new UsersSchema({

     fullname:{type:String, required:true, index:{unique:true}},
     email:{type:String,required:true},
     password:{type:String, required:true},
     joined:{type:Date,required:true}

});


module.exports = mongoose.model('UsersInfo', UsersInfo);

