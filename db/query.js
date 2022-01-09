const fs = require('fs');
const util = require('util');

const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Query { 
    read () {
        return readFileAsync("db/db.json", "utf8")
    }
    write (note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes () {
        return this.read() .then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
              } catch (err) {
                parsedNotes = [];
              }
            // if(JSON.parse(note).isArray()){
            //     parsedNotes = [].concat(JSON.parse(note))
            // }
            // else {
            //     parsedNotes = []
            // }
            return parsedNotes
        })
    }
    // addNotes (note) {}
    // deleteNotes (id) {}
}

module.exports = new Query()