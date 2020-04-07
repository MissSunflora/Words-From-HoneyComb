
// ################################################################################
// Data service operations setup

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Load the schemas...

// Data entities; the standard format is:
const englishTermSchema = require('./englishSchema.js');
const otherTermSchema = require('./englishSchema.js');
// Add others as needed



// ################################################################################
// Define the functions that can be called by server.js

module.exports = function () {

  // Collection properties, which get their values upon connecting to the database
  let EnglishTerms;
  let OtherTerms;

  return {

    // ############################################################
    // Connect to the database

    connect: function () {
      return new Promise(function (resolve, reject) {

        // Create connection to the database
        console.log('Attempting to connect to the database...');

        // The following works for localhost...
        // Replace the database name with your own value
        //mongodb+srv://nesa:^(Nesa69@cluster0-dbtwp.mongodb.net/test?retryWrites=true&w=majority
        //mongodb+srv://dbUser:1amApassword@senecaweb-v2sgh.mongodb.net/test?retryWrites=true&w=majority
        
        mongoose.connect(
          //'mongodb+srv://rjayroso-ong:321456@bti-ra6an.mongodb.net/test?retryWrites=true&w=majority',
          //mongodb+srv://nesa:^(Nesa69@cluster0-dbtwp.mongodb.net/test?retryWrites=true&w=majority
           'mongodb+srv://dbUser:1amApassword@senecaweb-v2sgh.mongodb.net/test?retryWrites=true&w=majority',
           { connectTimeoutMS: 5000, useUnifiedTopology: true , dbName: "db-a2"});
        
        // This one works for MongoDB Atlas...
        // (coming soon)

        // From https://mongoosejs.com/docs/connections.html
        // Mongoose creates a default connection when you call mongoose.connect(). 
        // You can access the default connection using mongoose.connection.
        var db = mongoose.connection;

        // Handle connection events...
        // https://mongoosejs.com/docs/connections.html#connection-events
        // The data type of a connection event is string
        // And more than one connection event may be emitted during execution

        // FYI the Node.js EventEmitter class docs is here...
        // https://nodejs.org/api/events.html#events_class_eventemitter

        // Handle the unable to connect scenario
        // "on" is a Node.js method in the EventEmitter class
        // https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
        db.on('error', (error) => {
          console.log('Connection error:', error.message);
          reject(error);
        });

        // Handle the open/connected event scenario
        // "once" is a Node.js method in the EventEmitter class
        // https://nodejs.org/api/events.html#events_emitter_once_eventname_listener
        db.once('open', () => {
          console.log('Connection to the database was successful');
          EnglishTerms = db.model("EnglishTerms", englishTermSchema, "TermsEnglish");
          OtherTerms = db.model("OtherTerms", otherTermSchema, "TermsOther");
          // Add others here...

          resolve();
        });
      });
    },



    // ############################################################

    englishTermGetAll: function () {
      return new Promise(function (resolve, reject) {

        // Fetch all documents
        // During development and testing, can "limit" the returned results to a smaller number
        // Remove that function call when deploying into production
        EnglishTerms.find()
          .limit(20)
          //.sort({ wordEnglish: 'asc'})
          .exec((error, items) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
            // Found, a collection will be returned
            return resolve(items);
          });
      })
    },

    englishTermGetById: function (itemId) {
      return new Promise(function (resolve, reject) {

        console.log(itemId);
        // Find one specific document
        EnglishTerms.findById(itemId, (error, item) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Found, one object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    englishTermAdd: function (newItem) {
      return new Promise(function (resolve, reject) {

        EnglishTerms.create(newItem, (error, item) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(item);
        });
      })
    },

    englishTermEdit: function (newItem) {
      return new Promise(function (resolve, reject) {

        EnglishTerms.findByIdAndUpdate(newItem._id, newItem, { new: true }, (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    /*
    carDelete: function (itemId) {
      return new Promise(function (resolve, reject) {

        EnglishTerms.findByIdAndRemove(itemId, (error) => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        })
      })
    }
    */

   // #########################################################################
  
    otherTermGetAll: function () {
      return new Promise(function (resolve, reject) {

        // Fetch all documents
        // During development and testing, can "limit" the returned results to a smaller number
        // Remove that function call when deploying into production
        OtherTerms.find()
          .limit(20)
          .sort({ make: 'asc', model: 'asc', year: 'asc' })
          .exec((error, items) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
            // Found, a collection will be returned
            return resolve(items);
          });
      })
    },

    otherTermGetById: function (itemId) {
      return new Promise(function (resolve, reject) {

        // Find one specific document
        OtherTerms.findById(itemId, (error, item) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Found, one object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    otherTermAdd: function (newItem) {
      return new Promise(function (resolve, reject) {

        OtherTerms.create(newItem, (error, item) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(item);
        });
      })
    },

    otherTermEdit: function (newItem) {
      return new Promise(function (resolve, reject) {

        OtherTerms.findByIdAndUpdate(newItem._id, newItem, { new: true }, (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }

        });
      })
    }
  } // return statement that encloses all the function members
} // module.exports