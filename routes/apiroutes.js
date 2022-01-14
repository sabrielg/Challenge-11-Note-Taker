const router = require('express').Router();
const query = require('../db/query');
const fs = require('fs')

router.get('/notes', (req, res) => {
    query.getNotes().then((notes) => {
        return res.json(notes)
        });
});

router.post('/notes', (req, res) => {
    const dataBase =JSON.parse(fs.readFileSync("./db/db.json"));
    let newNote = {
        title: req.body.title,
        text: req.body.text
    }
    console.log(req.body)
    dataBase.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(dataBase));
    res.json(newNote);
});

// router.delete('/notes/:id')

// for post:
//   first we read the file
//   then we parse (becomes an array)
//   then we push new object
//   then we json.stringify
//   then writefilesync(db.json)
//   res.json(before stringify)

module.exports = router