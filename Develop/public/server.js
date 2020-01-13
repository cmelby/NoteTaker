
//Listing dependencies..................
var express = require("express");
var path = require("path");

//Instantiating exprees and port for heroku...
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [];
var index = [];

//============ HTML ROUTES ======================//

//Routes that send the user first to the AJAX page
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//============ API ROUTES ======================//
app.get("/api/notes", function(req, res) {
  return res.json(notes)
});
app.get("/api/notes", function(req, res) {
  return res.json(index)
});


//launch port...............................
app.listen(PORT, function() {
  console.log("App listening on PORT" + PORT)
});