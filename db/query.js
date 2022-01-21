const fs = require('fs');
const util = require('util');


const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Query { 
    read () {
        return readFileAsync("db/db.json", "utf8")
    }
    write (notes) {
        return writeFileAsync("db/db.json", JSON.stringify(notes))
    }
    getNotes () {
         return this.read() .then((notes) => {
            let parsedNotes;
            
            try {
                parsedNotes = [].concat(JSON.parse(notes));
              } catch (err) {
                parsedNotes = [];
              }
            return parsedNotes
        })
    }
//     async addNote (note) {
//        let parsedNotes = await this.getNotes()
//        console.log(parsedNotes)
//        parsedNotes.push(note);
//        write(parsedNotes)
//     }
//     // deleteNotes (id) {}
}

module.exports = new Query()
