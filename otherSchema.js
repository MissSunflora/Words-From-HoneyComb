var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Definitions = require('./defSchema');

var othSchema = new Schema({
    wordEnglish: {type: String, required: true},
    wordNonEnglish: {type: String, required: true},
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
    termEnglishId: {type: Schema.Types.ObjectId, ref: 'TermEnglish', required: true},
    definitions: [Definitions]
});

module.exports = othSchema;