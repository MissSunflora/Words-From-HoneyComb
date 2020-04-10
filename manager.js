
// ################################################################################
// Data service operations setup

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Load the schemas...

// Data entities; the standard format is:
const englishTermSchema = require('./englishSchema.js');
const otherTermSchema = require('./otherSchema.js');
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

  /* ------------        ENGLISH            ------------- 
*/



// ######################################-        ENGLISH           -##########################################

  //links.push({ "rel": "collection", "href": "/api/terms/english", "methods": "GET,POST" });
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

  //links.push({ "rel": "collection", "href": "/api/terms/english/:id", "methods": "GET" });
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

  //links.push({ "rel": "collection", "href": "/api/terms/english/name/:word", "methods": "GET" });
  termGetByWord: async function(word) {
    word = decodeURIComponent(word);
    let results = await EnglishTerms.find({ wordEnglish: { $regex: word, $options: "i" } });
    return results;
},

  //links.push({ "rel": "collection", "href": "/api/terms/english/:id/add-definition", "methods": "POST" });

termAddDefinitionEdit: async function (itemId, newItem) {

  // Attempt to locate the existing document
  let term = await EnglishTerms.findById(itemId);

  if (term) {
      term.definitions.push(newItem);
      await term.save();
      return term;
  }
  else {
      throw "Not found";
  }
},
  //links.push({ "rel": "collection", "href": "/api/terms/english/helpYes/:id", "methods": "PUT" });
  termIncrementHelpYes: async function (itemId, newItem) {
    if (newItem._id !== itemId) throw "ID not found";

    let term = await EnglishTerms.findById(itemId);

    if (term) {
        term.helpYes++;
        await term.save();
        return term;
    }
    else {
        throw "Not found";
    }
},

  //links.push({ "rel": "collection", "href": "/api/terms/english/helpNo/:id", "methods": "PUT" });
  termIncrementHelpNo: async function (itemId, newItem) {
    if (newItem._id !== itemId) throw "ID not found";

    let term = await EnglishTerms.findById(itemId);

    if (term) {
        term.helpNo++;
        await term.save();
        return term;
    }
    else {
        throw "Not found";
    }
},

  //links.push({ "rel": "collection", "href": "/api/terms/english/definition-like/:id", "methods": "PUT" });
  termIncrementLikes: async function(itemId, newItem) {
    let term = await EnglishTerms.findOne({"definitions._id": itemId});
    // find id for definition
    if (term) {
        let def = term.definitions.id(itemId);
        console.log(def);
        def.likes++;
        await term.save();
        return term;
    }
    else throw "Not found";
},


// ######################################-        OTHER           -##########################################
  
  //links.push({ "rel": "collection", "href": "/api/terms/other", "methods": "GET,POST" });
  otherGetAll: function() {
            return new Promise((resolve, reject) => {
                OtherTerms.find()
                .sort({wordNonEnglish: 'asc'})
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

  //links.push({ "rel": "collection", "href": "/api/terms/other/:id", "methods": "GET" });
  otherGetById: function(itemId) {
    return new Promise((resolve, reject) => {

        // Find one specific document
        OtherTerms.findById(itemId)
        .exec((error, item) => {
            if (error) {
                return reject(error.message);
            }
            if (item) {
                return resolve(item);
            }
            else {
                return reject('Not found');
            }
        });
    })
},

  //links.push({ "rel": "collection", "href": "/api/terms/other/name/:word", "methods": "GET" });
  otherGetByWord: async function(word) {
    word = decodeURIComponent(word);
    let results = await OtherTerms.find({ wordNonEnglish: { $regex: word, $options: "i" } });
    return results;
},

  //links.push({ "rel": "collection", "href": "/api/terms/other/definition-like/:idn", "methods": "POST" });
  otherIncrementLikes: async function(itemId, newItem) {
    let term = await OtherTerms.findOne({"definitions._id": itemId});
    console.log(term);
    // find id for definition
    if (term) {
        let def = term.definitions.id(itemId);
        console.log(def);
        def.likes++;
        await term.save();
        return term;
    }
    else throw "Not found";
},


 // links.push({ "rel": "collection", "href": "/api/terms/other/helpYes/:id", "methods": "PUT" });
 otherIncrementHelpYes: async function (itemId, newItem) {
  if (newItem._id !== itemId) throw "ID not found";
  let term = await OtherTerms.findById(itemId);

  if (term) {
      term.helpYes++;
      await term.save();
      return term;
  }
  else {
      throw "Not found";
  }
},

  //links.push({ "rel": "collection", "href": "/api/terms/other/helpNo/:id", "methods": "PUT" });
  otherIncrementHelpNo: async function (itemId, newItem) {
    if (newItem._id !== itemId) throw "ID not found";
    let term = await OtherTerms.findById(itemId);

    if (term) {
        term.helpNo++;
        await term.save();
        return term;
    }
    else {
        throw "Not found";
    }
},

  //links.push({ "rel": "collection", "href": "/api/terms/other/definition-like/:id", "methods": "PUT" });
  otherAddDefinitionEdit: async function (itemId, newItem) {

    // Attempt to locate the existing document
    let term = await OtherTerms.findById(itemId);
    console.log(term)
    if (term) {
        term.definitions.push(newItem);
        await term.save();
        return term;
    }
    else {
        throw "Not found";
    }
}
  } // return statement that encloses all the function members
} // module.exports