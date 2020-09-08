const express = require('express')
const Url = require('../model/Url')
const urlscontroller = {}

urlscontroller.list = (req,res) =>{
    Url.find()
    .then((urls)=>{
        res.json(urls)
    })
    .catch((err)=>{
        res.json(err)
    })
}

urlscontroller.show = (req,res) =>{
    const id = req.params.id
    Url.findById(id)
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

urlscontroller.create = (req,res) =>{
    const body = req.body
    const url = new Url(body)
    url.save()
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

urlscontroller.remove = (req,res) =>{
    const id = req.params.id
    Url.findByIdAndDelete(id)
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

urlscontroller.hash = (req,res) =>{
    const hashedUrl = req.params.hashedUrl
    const clicks = {
        clickDateTime : new Date().toDateString(),
        browser : req.useragent.browser ,
        platform : req.useragent.platform ,
        device : req.useragent.isDesktop ? 'desktop' : 'mobile' ,
        ipAddress : req.ip
    }
    Url.findOneAndUpdate({hashedUrl},{ $push : {clicks}})
    .then((url)=>{ 
        //url.save()
        res.redirect(url.originalUrl)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports = urlscontroller