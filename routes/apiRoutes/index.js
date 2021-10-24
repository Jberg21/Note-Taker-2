const path = require("path")
const router = require("express").Router()
const fs = require("fs")

router.get("/notes", (req, res) => {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db/db.json"), "utf8"))
    return res.json(data);
}); 

router.post("/notes", (req, res) => {
    let array = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db/db.json"), "utf8"))
    let newNote = req.body;
    array.push(newNote)
    let id = 1;
    array.forEach(note => {
        note.id = id;
        id ++;
        return array
    });

    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(array), err =>{
            if (err) throw err
        });
        return res.json(array)

});


router.delete("/notes/:id", (req, res) => {
    let noteId = req.params.id.toString()
    let array = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db/db.json"), "utf8"))
    
    const newSavedNote = array.filter(note => note.id.toString() !== noteId)

    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(newSavedNote));
     res.json(newSavedNote)

})
module.exports = router;