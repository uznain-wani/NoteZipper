const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

dotenv.config();
connectDB();

app.use(express.json()); //to accept  any data from user

app.get("/", (req, res) => {
  res.send("API is running");
});
// app.get("/api/notes", (req, res) => {
// res.json(notes);
// });
// app.get("/api/notes/:id", (req, res) => {
// const note = notes.find((n) => n._id === req.params.id);
// res.send(note);
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
//custom error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV}  mode on port ${PORT}`
  )
);
