
//Listing dependencies..................
const express = require("express");
const path = require("path");
const fs = require("fs");

//Instantiating exprees and port for heroku...
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//============ HTML ROUTES ======================//

//GET /notes - returns the notes.html file
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
})


//============ API ROUTES======================//

//Reading files from the db.json file and return all saved notes as JSON....
app.get("/api/notes", function(req, res) {
  fs.readFile("db/db.json", 'utf8', function(err, data) {
    if (err) throw err
    var newNote = JSON.parse(data);
    res.json(newNote);
    })
    
  })
  

//GET * - Return the index.html file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
})


//============ Write to file using the fs module ======//
//POST /api/notes - Should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client....
app.post("/api/notes", function(req, res){
  var newNote = req.body
  console.log(newNote)
  fs.readFile("db/db.json", "utf8", function(err, data){
    console.log('done1')
    
    if (err) throw err
     var note = JSON.parse(data)
     console.log(note)
     note.push(newNote)

         fs.writeFile('db/db.json', JSON.stringify(note), 'utf8', function(err){
         if(err) throw err
         console.log('done')
     })
  })
  res.json(newNote)
})


//launch port...............................
app.listen(PORT, function() {
  console.log("App listening on PORT" + PORT)
});