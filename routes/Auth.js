const Route = require("express").Router();
const mongoose = require("mongoose");
const Owner = require("../models/user").Owner
const Dog = require("../models/user").Dog
const ejs = require("ejs")

let user_Info 
let all_user




Route.post("/login",(req,res)=>{
    Owner.findOne({"name": req.body.name},(err,user)=>{
        if(err){
            console.log(err)
        }
        if(user){
            user_Info = user
            
            console.log(user_Info)
            
        }else{
            console.log("user is not exist")
        }
    }).populate('dog')
    
})

Route.get('/user',(req,res)=>{
    Owner.findOne({"name": user_Info.name},(err,user)=>{
        if(err){
            console.log(err)
        }
        if(user){
            user_Info = user
            
            res.json([user_Info])
            
        }else{
            console.log("user is not exist")
        }
    }).populate('dog')
})



Route.get('/all_user',(req,res)=>{
    Dog.find({},(err,user)=>{
        if(err){
            console.log(err)
        }
        if(user){
            all_user = user
            res.json(all_user)
            console.log(all_user)
        
        }else{
            console.log("user is not exist")
        }
    }).populate('owner')

    console.log(all_user)
})


Route.post("/feedDog",(req,res)=> {
        Owner.findUser(user_Info,(user)=>{
            Dog.findOne({"name": req.body.name},(err,dog)=>{
                if(err){
                    console.log(err)
                }else{         
                    if(dog.owner){
                        console.log("I Have Owner")
                    }else{
                        
                        let hasdog = user_Info.dog.findIndex( res =>
                            res._id.equals(dog._id)
                        // 要return 
                        )
                        console.log(hasdog)
                        if(hasdog == -1){
                            user.feedDog(dog)
                            dog.myowner(user._id)


                        }else{
                            console.log("I have this dog")
                        }
                    
                    }
                    
                }
            })
        })
            
})

Route.get('/userdog',(req,res)=>{
    Dog.find({},(err,dog)=>{
        let mydog = dog.filter((res)=>{
            return res.owner
        })
        res.json(mydog)
    })
})

Route.post("/delete",(req,res)=>{
    Dog.updateOne({"_id":req.body._id},{owner: null},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            Owner.findUser(user_Info,(user)=>{
                let findIndex = user.dog.findIndex((res)=>{
                    return res.equals(req.body._id) 
                })
                user.dog.splice(findIndex,1)
        
                Owner.updateOne({"_id":user_Info._id},{dog: user.dog},(err,res)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("success")
                        console.log(res)
                    }
                })
                
            })
        }
    })
    
})



module.exports = Route