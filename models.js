'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//kalimat yang akan menjadi suggesti kalimat pilihan lain dari kalimat tertentu.
var SuggestionSchema = new Schema({
	text: String,
});

//kalimat yang didapat dari client
var SentenceSchema = new Schema({
	text: String,
	suggestion: [SuggestionSchema]
});

var Sentence = mongoose.model("Sentence", SentenceSchema);

module.exports.Sentence = Sentence;