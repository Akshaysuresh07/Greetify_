const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://akshaysureshm07:95dk9h0lhVt8CcIy@greet.xj4br.mongodb.net/?retryWrites=true&w=majority&appName=Greet').then(
    result=>{
        console.log("mongodb connected with server");
    }

).catch(err=>{
    console.log("connection failed");
    console.log(err);
})
