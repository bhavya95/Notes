const chalk = require("chalk");
const fs = require("fs");
function getNotes() {
  return "Your notes...";
}
function addNote(title, body) {
  const notes = loadNotes();
  const isNoteDuplicate = notes.find((note) => note.title === title);
  if (isNoteDuplicate) {
    console.log(
      chalk.redBright.inverse(
        `A note already exist with this '${title}' title. Please choose some other title`
      )
    );
  } else {
    notes.push({ title, body });
    fs.writeFileSync("notes.json", JSON.stringify(notes));
    console.log(chalk.greenBright.inverse("Note successfully added"));
  }
}
function removeNote(title) {
  const notes = loadNotes();
  const findNote = notes.filter((note) => note.title !== title);
  if (findNote.length !== notes.length) {
    fs.writeFileSync("notes.json", JSON.stringify(findNote));
    console.log(chalk.greenBright.inverse("Note successfully removed"));
  } else {
    console.log(
      chalk.redBright.inverse(
        `Error : No note found with this '${title}' title`
      )
    );
  }
}
function listNotes() {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log(chalk.redBright.inverse("No notes found"));
  }
  notes.forEach((note, index) => {
    console.log(`${index + 1}-${note.title}`);
  });
}
function readNote(title) {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.redBright.inverse("Error : No Note found"));
  }
}
function loadNotes() {
  try {
    const notesBuffer = fs.readFileSync("./notes.json");
    const notes = notesBuffer.toString();
    return JSON.parse(notes);
  } catch (error) {
    return [];
  }
}
module.exports = {
  getNotes,
  loadNotes,
  addNote,
  removeNote,
  listNotes,
  readNote,
};
