/*

Name: Nesa Bertanico
Heroku: https://gentle-reaches-62730.herokuapp.com/


*/
// ################################################################################
// Web service setup

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
// Or use some other port number that you like better
/*
const URI = process.env.MONGODB_URI || process.env.DB_DEV;

//setting up the mongoose
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "TermsEnglish"
  })
  .then(() => {
    return console.log("MongoDB connected successfully.");
  })
  .catch(err => {
    return console.log("MongoDB failed to connect: " + err);
  });

  */
// Add support for incoming JSON entities
app.use(bodyParser.json());
// Add support for CORS
app.use(cors());



// ################################################################################
// Data model and persistent store setup

const manager = require("./manager.js");
const m = manager();



// ################################################################################
// Deliver the app's home page to browser clients

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});



// ################################################################################
// Resources available in this web API

app.get("/api", (req, res) => {
  // Here are the resources that are available for users of this web API...
  // YOU MUST EDIT THIS COLLECTION
  const links = [];
  // This app's resources...
  links.push({ "rel": "collection", "href": "/api/terms/english", "methods": "GET,POST" });
  links.push({ "rel": "collection", "href": "/api/languages", "methods": "GET" });
  //links.push({ "rel": "collection", "href": "/api/terms/english", "methods": "GET" });
  links.push({ "rel": "collection", "href": "/api/terms/detail/:id", "methods": "GET" });
  //links.push({ "rel": "collection", "href": "/api/languages", "methods": "GET" });
  //links.push({ "rel": "collection", "href": "/api/languages", "methods": "GET" });
  //links.push({ "rel": "collection", "href": "/api/languages", "methods": "GET" });
  
  // Example resources...
  //links.push({ "rel": "collection", "href": "/api/customers", "methods": "GET,POST" });
  //links.push({ "rel": "collection", "href": "/api/employees", "methods": "GET,POST" });
  const linkObject = { 
    "apiName": "Web API assignment 1",
    "apiDescription": "originally Peter McIntyre's code, but some components are changed to fit the bti a2",
    "apiVersion": "1.0", 
    "apiAuthor": "Nesa B",
    "links": links
  };
  res.json(linkObject);
});



// ################################################################################
// Request handlers for data entities (listeners)

// Get all
app.get("/api/terms/english", (req, res) => {
  // Call the manager method
  m.englishGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});
/*
// Get one
app.get("/api/terms/detail/:id", (req, res) => {
  // Call the manager method
  m.englishGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
      //console.log("id: "+req.params.id);
    })
});

// Add new
app.post("/api/terms/create", (req, res) => {
  // Call the manager method
  m.englishAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Edit existing
app.put("/api/terms/definition/:id", (req, res) => {
  // Call the manager method
  m.englishEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Delete item
app.delete("/api/cars/:id", (req, res) => {
  // Call the manager method
  m.carDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});
*/


// ################################################################################
// Resource not found (this should be at the end)

app.use((req, res) => {
  res.status(404).send("Resource not found");
});



// ################################################################################
// Attempt to connect to the database, and
// tell the app to start listening for requests

m.connect().then(() => {
  app.listen(HTTP_PORT, () => { console.log("Ready to handle requests on port " + HTTP_PORT) });
})
  .catch((err) => {
    console.log("Unable to start the server:\n" + err);
    process.exit();
  });
