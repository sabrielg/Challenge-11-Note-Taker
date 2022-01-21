const router = require('express').Router();
const query = require('../db/query');
const fs = require('fs')
const uuid = require('../db/uuid.js');

router.get('/notes', (req, res) => {
    query.getNotes().then((notes) => {
        return res.json(notes)
        });
});

router.post('/notes', (req, res) => {
    const dataBase =JSON.parse(fs.readFileSync("./db/db.json"));
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    }
    console.log(req.body)
    dataBase.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(dataBase));
    res.json(newNote);
});


router.delete('/notes/:id', (req, res) => {
    let deleteID = req.params.id;
    let db = fs.readFileSync('./db/db.json');
    let dataBase = JSON.parse(db);

    let deleteNote = (element) => element.id === deleteID;

    let deleteNoteIndex = dataBase.findIndex(deleteNote);

    dataBase.splice(deleteNoteIndex, 1);

    fs.writeFileSync('./db/db.json', JSON.stringify(dataBase));

    res.json(dataBase);
});



module.exports = router