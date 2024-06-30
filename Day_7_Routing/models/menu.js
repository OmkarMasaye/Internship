const mongoose=require('mongoose')

const menuItemSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        enum:['spicy','sour','sweet'],
        require:true
    },
    isDrink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    nume_sales:{
        type:Number,
        default:0
    }
});

const MenuItem=mongoose.model("MenuItem",menuItemSchema);
module.exports=MenuItem;