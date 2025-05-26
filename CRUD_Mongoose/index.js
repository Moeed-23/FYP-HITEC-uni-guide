let express=require('express');
var mongoose = require('mongoose');

const userRoutes = require('./App/routes/web/userRoutes');
require('dotenv').config();

//connect to MongoDB
let app=express();

app.use(express.json());

app.use(express.json());

app.use("/web/api/user",userRoutes);

//http://localhost:2500/web/api/user/user-insert


mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB Succesfully")
    app.listen(process.env.PORT,()=>{
        console.log("server is running on port "+process.env.PORT);
    })
})

