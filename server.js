const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const Owner = require("./models/user").Owner
const Dog = require("./models/user").Dog
const Route = require("./routes/index").data
const cors = require("cors");
const Auth = require("./routes/index").Auth
const bodyParser = require('body-parser')

// connect cosmos db
mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
  auth: {

    user: process.env.COSMOSDB_USER,
    password: process.env.COSMOSDB_PASSWORD
  },
useNewUrlParser: true,
useUnifiedTopology: true,
retryWrites: false
})
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));


// middlewares
app.use(express.urlencoded({extended:false})); 
app.use(express.json())
app.use(cors())
app.use("/",Route)
app.use("/api",Auth)


// 備注使用路徑管理時，不要再使用重疊的路徑在server.js
//如 
// app.get('/',(req,res)=>{
//     res.send("Hello")
// })
//會出錯




app.get('/user/:id',(req,res)=>{
    res.send(req.params.id)
})

app.listen(4000,()=>{
    console.log("It's port 4000")
})