var express = require('express');
var app=express();
var router = express.Router();
var pool=require("../servers/api")

/* GET home page. */

module.exports =router.get('/home',function (req,res,next) {
    res.render('home');
    res.end();
})
