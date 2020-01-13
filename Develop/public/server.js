
//Listing dependencies..................
const express = require("express");
const path = require("path");

var noteArr = [];
//Instantiating exprees and port for heroku...
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//============ HTML ROUTES ======================//

//Routes that send the user first to the AJAX page
app.get('../notes', function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//============ API ROUTES======================//

//Reading files from the db.json file and return all saved notes as JSON....
app.get("/api/notes", function(req, res) {
  fs.readFile("../db/db.json", function(err, data) {
    if (err) throw err
    return res.json(JSON.json(data))
  });
  
});

//POST /api/notes - Should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client....
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  
  if (noteArr.length < 5 ) {
      noteArr.push(newNote);
  } else {
      noteArr.push(newNote);
  }
  res.json(newNote);
});


//============ Write to file using the fs module ======//


//launch port...............................
app.listen(PORT, function() {
  console.log("App listening on PORT" + PORT)
});