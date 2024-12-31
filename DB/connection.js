const mongoose=require('mongoose')
mongoose.connect(process.env.DATA_BASE).then(out=>{
    console.log('MongoDB Server Connected');
    
}).catch(err=>{
    console.log(`MongoDB server not connected : ${err}`);
    
})