//The most basic node.js app
//Inspired by tutorials at
//#https://www.sitepoint.com/creating-and-handling-forms-in-node-js/
//#http://devcrapshoot.com/javascript/nodejs-expressjs-and-mustachejs-template-engine
//required for using the http server and client

//TODO: organize the routes into a separate file
// Figure out if there is a better way to access the database
var http= require('http');

var assert = require('assert');
var express = require('express');

var bodyParser=require('body-parser');

var routes=require('./index');


var app=express();
//a better way to interface with mongodb
const db= require('monk')('127.0.0.1:27017/test');

//can refer to the db in all the routes
app.use(function(req, res, next){
  req.db=db;
  next();
});

//body-parser is a middle-ware that needs to be explicitly
//configured to be used.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//traffic towards to the default address is directed to index
app.use('/', routes);

//custom 404 stuff
app.use(function(req,res,next){
  var err=new Error('Ahhhhhhhhh! This page doesn\'t exist now...mah bad');
  err.status=404;
  //finds the next route handler
  next(err);
})

app.set('view engine', 'mustache');
app.get('/', function(req, res){
    //displayForm(res);
    res.sendFile(__dirname+ '/form.html')

});



app.listen(1185);
console.log("server listening on 1185");

//required to avoid middle-ware error
module.exports=app;
