const mongoose =require('mongoose');

const URI = "mongodb+srv://admin:admin@cluster0.jgpnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = () =>{
  mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true});
  console.log('db connected');
};
connectDB();