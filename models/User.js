const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  phoneNumber:{
    type:Number,
  //  required: true,
    unique:true
  },
  gender:{
    type:String,
  //  required: true
  },
  DOB:{
    type:Date,
   // required:true
  },
  parentDOB:{
    type:Date,
   // required:true
  },
  schoolName:{
    type:String,
   // required: true
  },
  stream:{
    type:String,
    //required: true
  },
  grade:{
    type:String,
   // required: true
  },
  moreEducation:[],
  bankName:{
    type:String,
   // required: true
  },
  cardNumber:{
    type:Number,
    //required: true
  },
  CVV:{
    type:Number,
    required: true
  },
  NameOfCard:{
    type:String,
    // required: true
  },

  //bookedTutors
  bookedTutor:[],
});

module.exports = User = mongoose.model("users", UserSchema);
