const mongoose = require('mongoose')
const validator = require('validator')
const sh = require('shorthash')

const Schema = mongoose.Schema
const urlSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    originalUrl : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isURL(value)
            },
            message : function(){
                return 'url is not valid'
            }
        }

    },
    hashedUrl : {
        type : String,
        
    },
    createdAt :{
       type : Date,   
    },
    clicks :[
        {
            clickDateTime : String,
            IPAddress : String,
            browser : String ,
            platform : String,
            device : String
        }
    ]

})

urlSchema.pre('save',function(next){
    //console.log(this.originalUrl.slice(8))
    this.hashedUrl = sh.unique(this.originalUrl)
    this.createdAt = new Date()
    console.log(this);
    next()
})

const Url = mongoose.model('Url',urlSchema)

module.exports = Url