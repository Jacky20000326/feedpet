const Route = require("express").Router();
const Owner = require("../models/user").Owner
const Dog = require("../models/user").Dog
const mongoose = require("mongoose");


Route.get('/alldata',async (req,res)=>{
    
        // const owner = await Owner.find({},(err,user)=>{
        //     if(err){
        //         console.log(err)
        //     }else{
        //         return user
        //     }
        // })
        // const dogs = await Dog.find({},(err,dog)=>{
        //     if(err){
        //         console.log(err)
        //     }else{
        //         return dog
        //     }
        // })

        // res.json({dogs,owner})
        const user = await Owner.find({},(err,result)=>{
            if(err){
                console.log(err)
            }else{
                return result
            }
        }).populate('dog')

        res.json({user})



})



// findById(id) is almost* equivalent to findOne({ _id: id })

module.exports = Route