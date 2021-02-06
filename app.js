const { addNote, removeNote, listNotes, readNote } = require("./notes");
const yargs = require("yargs");
const chalk = require("chalk");

yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: { describe: "Note Title", demandOption: true, type: "string" },
    body: { describe: "Note Body", demandOption: true, type: "string" },
  },
  handler: (argv) => {
    addNote(argv.title, argv.body);
  },
});
yargs.command({
  command: "remove",
  describe: "Remove note",
  builder: {
    title: { describe: "Note Title", demandOption: true, type: "string" },
  },
  handler: (argv) => {
    removeNote(argv.title);
  },
});
yargs.command({
  command: "list",
  describe: "List all notes",
  handler: (argv) => {
    listNotes();
  },
});
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: { describe: "Note Title", demandOption: true, type: "string" },
  },
  handler: (argv) => {
    readNote(argv.title);
  },
});

yargs.parse();
