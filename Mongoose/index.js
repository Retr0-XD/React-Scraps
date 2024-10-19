

const mongoose = require('mongoose');


const User = require('./User');



async function createConnection() {


    const value = await mongoose.connect("mongodb+srv://retr0:1234@slave1.pyoha.mongodb.net/?retryWrites=true&w=majority&appName=Slave1");
    //console.log(value);
}



createConnection().catch((err)=>{

    console.error("Failed to connect to MongoDB");
    console.error(err);

})


const user = new User({
    name: "John",
    age: 25
});

console.log(user);

user.save().then(()=>{
    console.log("User created");
}).catch((err)=>{
    console.error("Failed to create user");
    console.error(err);
});