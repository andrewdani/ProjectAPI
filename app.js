'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var jsonParser = require("body-parser").json;

app.use(jsonParser());


//connecting mongodb
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection successful");
});


app.use("/sentence", routes);

// jika request jatuh tanpa menggunakan routes dengan awalan /sentence, beri status 404 
// karena parameter yang diberikan tidak sesuai dengan yang diharapkan.
app.use(function(req, res, next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error Handler

app.use(function(err, req, res, next){
	res.status(err.status || 500);  
	res.json({
		error: {
			message: err.message
		}
	});
});

//listen to port 3000
var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Express server is listening on port", port);
});
