var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Definitions = require('./defSchema');

var engSchema = new Schema({
    wordEnglish: {type: String, required: true},
    wordNonEnglish: String,
    wordExpanded: String,
    languageCode: {type: String, required: true},
    image: String,
    imageType: String,
    audio: String,
    audioType: String,
    linkAuthoritative: String,
    linkWikipedia: String,
    linkYoutube: String,
    authorName: String,
    dateCreated: {type: Date, required: true},
    dateRevised: {type: Date, required: true},
    fieldOfStudy: String,
    helpYes: Number,
    helpNo: Number,
    definitions: [Definitions]
});

module.exports = engSchema;