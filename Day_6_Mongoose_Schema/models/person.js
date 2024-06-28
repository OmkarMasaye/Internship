const mongoose=require('mongoose');

const personschema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        require:true,
        enum:['chef','waiter','manager']
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    }
})

const Person=mongoose.model("Person",personschema)
module.exports=Person;