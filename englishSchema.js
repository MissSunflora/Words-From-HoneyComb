
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema

var engSchema = new Schema({
   // _id : String,
    wordEnglish : String,
    wordNonEnglish : String,
    wordExpanded : String,
    languageCode : String,
    image : String,
    imageType : String,
    audio : String,
    audioType : String,
    linkAuthoritative : String,
    linkWikipedia : String,
    linkYouTube : String,
    authorName : String,
    dateCreated : String,
    dateRevised : String,
    fieldOfStudy : String,
    helpYes : Number,
    helpNo : Number,
    definitions: [
        {
            authorName: String,
            dateCreated: String,
            definition: String,
            quality: String,
            likes: String
        }
    ]
});

// Make schema available to the application
module.exports = engSchema;
