const express = require('express')
const route = express.Router()
const urlsController = require('../app/controller/urlsController')
const urlscontroller = require('../app/controller/urlsController')

route.get('/urls',urlsController.list)
route.get('/urls/:id',urlsController.show)
route.post('/urls',urlsController.create)
route.delete('/urls/:id',urlsController.remove)
//route.get('/:id?type',urlsController.hash)
route.get('/:hashedUrl',urlsController.hash)

module.exports = route