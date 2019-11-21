//var config = require("config");
var express = require("express");
var emprouter= require("./emp");
var app =  express();

//const port = parseInt(config.get("port"));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Use Middleware
app.use(express.json());
app.use("/employees",emprouter);

//listen to port for requests
app.listen(4000, function(){
    console.log("Server Started on port  4000 " );
})
