const express = require('express')
var useragent = require('express-useragent')
const port  = 3033
const app = express()
const route = require('./config/route')
const ConfigDB = require('./config/database')

ConfigDB()
app.use(express.json())
app.use(useragent.express())
app.use(route)


app.get('/',(req,res)=>{
    res.send('hi the server is up')
    //res.send(req.useragent)
})

app.listen(port , ()=>{
    console.log("the server is listeninig on port ",port)
})