/*

Name: Nesa Bertanico
https://polar-stream-23993.herokuapp.com/api/terms/english

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
  
  /* ------------        ENGLISH            ------------- */
  links.push({ "rel": "collection", "href": "/api/terms/english", "methods": "GET,POST" });
  links.push({ "rel": "collection", "href": "/api/terms/english/:id", "methods": "GET" });
  links.push({ "rel": "collection", "href": "/api/terms/english/name/:word", "methods": "GET" });
  links.push({ "rel": "collection", "href": "/api/terms/english/:id/add-definition", "methods": "POST" });
  links.push({ "rel": "collection", "href": "/api/terms/english/helpYes/:id", "methods": "PUT" });
  links.push({ "rel": "collection", "href": "/api/terms/english/helpNo/:id", "methods": "PUT" });
  links.push({ "rel": "collection", "href": "/api/terms/english/definition-like/:id", "methods": "PUT" });
  links.push({ "rel": "collection", "href": "/api/terms/english/download", "methods": "GET" });

  /* ------------        OTHER            ------------- */
  links.push({ "rel": "collection", "href": "/api/terms/other", "methods": "GET,POST" });
  links.push({ "rel": "collection", "href": "/api/terms/other/:id", "methods": "GET" });
  links.push({ "rel": "collection", "href": "/api/terms/other/name/:word", "methods": "GET" });
  links.push({ "rel": "collection", "href": "/api/terms/other/definition-like/:idn", "methods": "POST" });
  links.push({ "rel": "collection", "href": "/api/terms/other/helpYes/:id", "methods": "PUT" });
  links.push({ "rel": "collection", "href": "/api/terms/other/helpNo/:id", "methods": "PUT" });
  links.push({ "rel": "collection", "href": "/api/terms/other/definition-like/:id", "methods": "PUT" });
  links.push({ "rel": "collection", "href": "/api/terms/other/download", "methods": "GET" });

  const linkObject = { 
    "apiName": "Web API assignment 2",
    "apiDescription": "BTI425 - A2",
    "apiVersion": "1.0", 
    "apiAuthor": "Nesa Bertanico",
    "links": links
  };
  res.json(linkObject);
});



// ######################################-        ENGLISH            -##########################################
// Request handlers for data entities (listeners)

// Get all ENGLISH
//links.push({ "rel": "collection", "href": "/api/terms/english", "methods": "GET,POST" });
app.get("/api/terms/english", (req, res) => {
  m.englishTermGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});


// Get one ENGLISH
//links.push({ "rel": "collection", "href": "/api/terms/english/:id", "methods": "GET" });
app.get("/api/terms/english/:id", (req, res) => {
  m.englishTermGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});
/*
//links.push({ "rel": "collection", "href": "/api/terms/english/name/:word", "methods": "GET" });
app.get('/api/terms/english/name/:word', (req, res) => {
  console.log(req.params.word);
  m.termGetByWord(req.params.word)
  .then((data) => {
      res.json(data);
  })
  .catch(() => {
      res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/english/:id/add-definition", "methods": "POST" });
app.put('/api/terms/english/:id/add-definition', (req, res) => {
  m.termAddDefinitionEdit(req.params.id, req.body)
  .then((data) => {
    res.json(data)
  })
  .catch(() => {
    res.status(404).json({ "message": "Resource not found"});
  })
})

//links.push({ "rel": "collection", "href": "/api/terms/english/helpYes/:id", "methods": "PUT" });
app.put('/api/terms/english/helpYes/:id', (req, res) => {
  m.termIncrementHelpYes(req.params.id, req.body)
  .then((data) => {
    res.json(data)
  })
  .catch(() => {
    res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/english/helpNo/:id", "methods": "PUT" });
app.put('/api/terms/english/helpNo/:id', (req, res) => {
  console.log("hi");
  m.termIncrementHelpNo(req.params.id, req.body)
  .then((data) => {
    res.json(data)
  })
  .catch(() => {
    res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/english/definition-like/:id", "methods": "PUT" });
app.put('/api/terms/english/definition-like/:id', (req, res) => {
  console.log(req.params, req.body)
  m.termIncrementLikes(req.params.id, req.body)
  .then((data) => {
    res.json(data)
  })
  .catch(() => {
    res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/english/download", "methods": "GET" });
app.get('/api/terms/english/download', (req, res) => {
  m.otherGetAll()
  .then((data) => {
    try {
      fs.writeFileSync('./json/english.json', JSON.stringify(data))
      let filePath = './json/english.json';
      res.download(filePath);
    }
    catch(err) { console.log(err)}
  })
  .catch((error) => {
    res.status(500).json({ 'message': error });
  })
});


// ######################################-        OTHER           -##########################################

//links.push({ "rel": "collection", "href": "/api/terms/other", "methods": "GET,POST" });
app.get('/api/terms/other', (req, res) => {
  m.otherGetAll()
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    res.status(500).json({ 'message': error });
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/other/:id", "methods": "GET" });
app.get('/api/terms/other/:id', (req, res) => {
  m.otherGetById(req.params.id)
  .then((data) => {
      res.json(data);
  })
  .catch(() => {
      res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/other/name/:word", "methods": "GET" });
app.get('/api/terms/other/name/:word', (req, res) => {
  m.otherGetByWord(req.params.word)
  .then((data) => {
      res.json(data);
  })
  .catch(() => {
      res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/other/definition-like/:idn", "methods": "POST" });
// pass id for term and id for definition
app.put('/api/terms/other/definition-like/:id', (req, res) => {
  console.log(req.params)
  m.otherIncrementLikes(req.params.id, req.body)
  .then((data) => {
    res.json(data)
  })
  .catch(() => {
    res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/other/helpYes/:id", "methods": "PUT" });
app.put('/api/terms/other/helpYes/:id', (req, res) => {
  m.otherIncrementHelpYes(req.params.id, req.body)
  .then((data) => {
    res.json(data)
  })
  .catch(() => {
    res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/other/helpNo/:id", "methods": "PUT" });
app.put('/api/terms/other/helpNo/:id', (req, res) => {
  m.otherIncrementHelpNo(req.params.id, req.body)
  .then((data) => {
    res.json(data)
  })
  .catch(() => {
    res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/other/definition-like/:id", "methods": "PUT" });
app.put('/api/terms/other/:id/add-definition', (req, res) => {
  m.otherAddDefinitionEdit(req.params.id, req.body)
  .then((data) => {
    res.json(data)
  })
  .catch(() => {
    res.status(404).json({ "message": "Resource not found"});
  })
});

//links.push({ "rel": "collection", "href": "/api/terms/other/download", "methods": "GET" });
app.post('/api/terms/other', (req, res) => {
  // call the manager method
  console.log(req.body)
  m.otherAdd(req.body)
  .then((data) => {
      res.status(201).json(data);
  })
  .catch((error) => {
  res.status(500).json({ "message": error });
  })
});*/


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