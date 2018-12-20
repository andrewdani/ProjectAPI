 'use strict';

var express = require("express");
var router = express.Router();
var model = require("./models");
var Sentence = model.Sentence;

router.param("sentenceID", function(req,res,next,id){
	Sentence.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.sentence = doc;
		return next();
	});
});

router.param("suggestionID", function(req,res,next,id){
	req.suggestion = req.sentence.suggestion.id(id);
	if(!req.suggestion) {
		err = new Error("Not Found");
		err.status = 404;
		return next(err);
	}
	next();
});

// GET /sentence //work
router.get("/", function(req, res, next){
	Sentence.find({})
				.exec(function(err, sentence){
					if(err) return next(err);
					res.json(sentence);
				});
});

// POST /sentence //work
router.post("/", function(req, res, next){
	var sentence = new Sentence(req.body);
	sentence.save(function(err, sentence){
		if(err) return next(err);
		res.status(201);
		res.json(sentence);
	});
});

// GET /sentence/:id //work
router.get("/:sentenceID", function(req, res, next){
	res.json(req.sentence);
});

// POST /sentence/:id/suggestion //work
router.post("/:sentenceID/suggestion", function(req, res,next){
	req.sentence.suggestion = req.sentence.suggestion.concat([req.body]);

	req.sentence.save(function(err, sentence){
		if(err) return next(err);
		res.status(201);
		res.json(sentence);
	});
});

// DELETE /sentence/:sentenceID/suggestion/:suggestionID //work
router.delete("/:sentenceID/suggestion/:suggestionID", function(req, res){
	req.suggestion.remove(function(err){
		req.sentence.save(function(err, sentence){
			if(err) return next(err);
			res.json(sentence);
		});
	});
});

module.exports = router;