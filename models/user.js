const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    dog:[{
        type: mongoose.Types.ObjectId,
        ref: "Dog",
    }],
    description:{
        type: String 
    }
})

const dogSchema = new mongoose.Schema({
    name: {
        type: String
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "Owner",
        
    },
    description:{
        type: String 
    }
})






ownerSchema.statics.findUser = function(user,callback){
    this.findOne({"name": user.name},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            callback(result)
        }
    })
}


ownerSchema.methods.feedDog = function(Dog){
    this.dog.push(Dog)
    this.save()
}

dogSchema.methods.myowner = function(Owner){
    if(this.owner){
        console.log("I Have Owner")
        return
    }else{
        this.owner = Owner
        this.save()
    }
    
}

const Owner = mongoose.model("Owner",ownerSchema)
const Dog = mongoose.model("Dog",dogSchema)

module.exports.Owner = Owner
module.exports.Dog = Dog