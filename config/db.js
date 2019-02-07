const mongoose =require('mongoose')

//Map global promises
mongoose.Promise = global.Promise;
//mongoose connect
mongoose.connect('mongodb://krash:krishnaisgod1@ds225205.mlab.com:25205/pusherpoll',{useNewUrlParser:true})
    .then(()=>console.log("MOngodb connected"))
    .catch((err)=>console.log(err))

