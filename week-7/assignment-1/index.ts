import mongoose from "mongoose";
import express from "express";
const app = express();
const port = 3000;
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect(
  "add the mongoDB connection string here",
  { dbName: "courses" }
);
