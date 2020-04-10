# Words-From-HoneyComb
Api that holds the values for the HoneyBee to take in

Local host: http://localhost:8080
(Local host will forever work)

Heroku website: https://polar-stream-23993.herokuapp.com/api/terms/english 
(Heroku website will probably not work because heroku only takes in 5 application at a time, and I will upload more codes in there)

  /* ------------        ENGLISH           ------------- */
links.push({ "rel": "collection", "href": "/api/terms/english", "methods": "GET,POST" });
  links.push({ "rel": "collection", "href": "/api/terms/english/:id", "methods": "GET" });
links.push({ "rel": "collection", "href": "/api/terms/english/name/:word", "methods": "GET" });
  links.push({ "rel": "collection", "href": "/api/terms/english/:id/add-definition", "methods": "POST" });
  links.push({ "rel": "collection", "href": "/api/terms/english/helpyes/:id", "methods": "PUT" });
  links.push({ "rel": "collection", "href": "/api/terms/english/helpno/:id", "methods": "PUT" });
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



