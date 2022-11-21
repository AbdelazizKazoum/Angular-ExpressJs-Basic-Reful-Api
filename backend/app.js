const express = require("express");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb://abdukazoum:051688@ac-nusk705-shard-00-00.ohuft7z.mongodb.net:27017,ac-nusk705-shard-00-01.ohuft7z.mongodb.net:27017,ac-nusk705-shard-00-02.ohuft7z.mongodb.net:27017/?ssl=true&replicaSet=atlas-pidfaz-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected  to mongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(err);
  });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/stuff", stuffRoutes);

// Auth
app.use("/api/auth", userRoutes);

module.exports = app;
