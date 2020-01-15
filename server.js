
//Listing dependencies..................
const express = require("./node_modules/express");
const path = require("path");
const fs = require("fs");

//Instantiating exprees and port for heroku enviroment...
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
//Setup express.static to access 'public' files....
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//============ HTML ROUTE =================================//

//GET /notes - returns the notes.html file
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});


//============ API ROUTES=============================================//
//Reading files from the db.json file and return all saved notes as JSON....
app.get("/api/notes", function(req, res) {
  fs.readFile("db/db.json", 'utf8', function(err, data) {
    if (err) throw err
      var newNote = JSON.parse(data);
      res.json(newNote);
    })
    
  });

// GET * - Returns the index.html file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//===========================DELETE====================================================//
// DELETE /api/notes/:id - Recives a query paramter containing the id of a note to delete.
// and then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', function (req, res) {
  
  var emptyNote = req.params.id
  console.log(emptyNote)

  fs.readFile("db/db.json", "utf8", function (err, data) {
      console.log('delet1')
      if (err) throw err

      var noteDelete = JSON.parse(data)
      var index = parseInt(emptyNote) - 1
        noteDelete.splice(index, 1);

        fs.writeFile('db/db.json', JSON.stringify(noteDelete), 'utf8', function (err) {
        if (err) throw err
        console.log('deletedone2')
      })
  })
  res.send(emptyNote)
});

//============ Write to file using the fs module ==============================================//
//POST /api/notes - Recieves a new note to save on the request body, adds it to the db.json file, 
// and then returns the new note to the client....
app.post("/api/notes", function(req, res){
  var newNote = req.body
  console.log(newNote)
  fs.readFile("db/db.json", "utf8", function(err, data){
    console.log('done1')
        if (err) throw err
        var noteInfo = JSON.parse(data)

        noteInfo.push(newNote)
        noteInfo.forEach((item, i) => item.id = i + 1);
        console.log(noteInfo)

         fs.writeFile('db/db.json', JSON.stringify(noteInfo), 'utf8', function(err){
         if(err) throw err
         console.log('done2')
     })
  })
  res.json(newNote)
});


//launch port...............................
app.listen(PORT, function() {
  console.log("App listening on PORT" + PORT)
});