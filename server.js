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
  // links.push({ "rel": "collection", "href": "/", "methods": "GET,POST" });
  links.push({ "rel": "collection", "href": "/api/terms/english", "methods": "GET,POST" });
  links.push({ "rel": "item", "href": "/api/terms/english/:id", "methods": "GET" });
  links.push({ "rel": "item", "href": "/api/terms/english/:id/add-defition", "methods": "PUT" });
  links.push({ "rel": "item", "href": "/api/terms/english/helpyes/:id", "methods": "PUT" });
  links.push({ "rel": "item", "href": "/api/terms/english/helpno/:id", "methods": "PUT" });

  links.push({ "rel": "collection", "href": "/api/terms/other", "methods": "GET,POST" });
  links.push({ "rel": "item", "href": "/api/terms/other/:id", "methods": "GET" });
  links.push({ "rel": "item", "href": "/api/terms/other/:id/add-defition", "methods": "PUT" });
  links.push({ "rel": "item", "href": "/api/terms/other/helpyes/:id", "methods": "PUT" });
  links.push({ "rel": "item", "href": "/api/terms/other/helpno/:id", "methods": "PUT" });

  const linkObject = { 
    "apiName": "Web API assignment 2",
    "apiDescription": "BTI425 - A2",
    "apiVersion": "1.0", 
    "apiAuthor": "Royce Ayroso-Ong",
    "links": links
  };
  res.json(linkObject);
});



// ################################################################################
// Request handlers for data entities (listeners)

// Get all ENGLISH
app.get("/api/terms/english", (req, res) => {
  // Call the manager method
  m.englishTermGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Get one ENGLISH
app.get("/api/terms/english/:id", (req, res) => {
  // Call the manager method
  m.englishTermGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

/*

// Add new ENGLISH
app.post("/api/terms/english", (req, res) => {
  // Call the manager method
  m.englishTermAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Edit existing ENGLISH - add-definition
app.put("/api/terms/english/:id/add-definition", (req, res) => {
  // Call the manager method
  m.englishTermEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Edit existing ENGLISH - help YES
app.put("/api/terms/english/helpyes/:id", (req, res) => {
  // Call the manager method
  m.englishTermEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Edit existing ENGLISH - help NO
app.put("/api/terms/english/helpno/:id", (req, res) => {
  // Call the manager method
  m.englishTermEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// ################################################################################

// Get all OTHER
app.get("/api/terms/other", (req, res) => {
  // Call the manager method
  m.otherTermGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Get one OTHER
app.get("/api/terms/other/:id", (req, res) => {
  // Call the manager method
  m.otherTermGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Add new OTHER
app.post("/api/terms/other", (req, res) => {
  // Call the manager method
  m.otherTermAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Edit existing OTHER - add-definition
app.put("/api/terms/other/:id/add-definition", (req, res) => {
  // Call the manager method
  m.otherTermEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Edit existing OTHER - help YES
app.put("/api/terms/other/helpyes/:id", (req, res) => {
  // Call the manager method
  m.otherTermEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Edit existing OTHER - help NO
app.put("/api/terms/other/helpno/:id", (req, res) => {
  // Call the manager method
  m.otherTermEdit(req.body)
    .then((data) => {
      res.json(data);
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

/*
  // Delete item ENGLISH
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