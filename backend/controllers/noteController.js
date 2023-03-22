const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler"); //handles errors

// for   fetching all notes by user
// get request:route is /api/notes
//this is private route
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.send(notes);
});

// for   creating a new note
// post request :route is /api/create
//this is private route
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const note = new Note({
      user: req.user._id,
      title,
      content,
      category,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});
// for   fetching  particular note by id
// get req: to route is /api/notes/:id
//this is public route
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// for   updating any note by user
// put request to route is /api/notes/:id
//this is private route
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action ");
  }

  if (note) {
    (note.title = title), (note.content = content), (note.category = category);

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found ");
  }
});
// for   deleting note by user
//delete req to /api/notes/:id
//protected route
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.deleteOne();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
