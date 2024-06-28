const mongoose=require('mongoose')
const mongoURL='mongodb://127.0.0.1:27017/hotels'

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected successfully');
});
  
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
  
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
  
module.exports=db;