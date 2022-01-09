const router = require('express').Router();
const query = require('../db/query');

router.get('/notes', (req, res) => {
    query.getNotes().then((notes) => {
        return res.json(notes)
        });
});

// router.post('/notes')

// router.delete('/notes/:id')

module.exports = router