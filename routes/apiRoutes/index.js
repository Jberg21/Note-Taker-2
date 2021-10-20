const path = require("path")
const router = require("express").Router()
const fs = require("fs")

router.get("/notes", (req, res) => {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db/db.json"), "utf8"))
    return res.json(data);
}); 

router.post("/notes", (req, res) => {
    let notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db/db.json"), "utf8"))
    let newNote = req.body;
    notesArray.push(newNote)
    let id = 1;
    notesArray.forEach(note => {
        note.id = id;
        id ++;
        return notesArray
    });

    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notesArray), err =>{
            if (err) throw err
        });
        return res.json(notesArray)

});


router.delete("/notes/:id", (req, res) => {
    let noteId = req.params.id.toString()
    let notesArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db/db.json"), "utf8"))
    
    const newSavedNote = notesArray.filter(note => note.id.toString() !== noteId)

    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(newSavedNote));
     res.json(newSavedNote)

})
module.exports = router;