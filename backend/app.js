const express = require("express");
const mongoose = require("mongoose");
const thing = require("./models/thing");
const Thing = require("./models/thing");

const app = express();

mongoose
  .connect(
    "mongodb+srv://abdukazoum:051688@cluster0.kwn2z1n.mongodb.net/?retryWrites=true&w=majority"
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

app.get("/api/stuff/:id", (req, res) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

//get things from Database
app.get("/api/stuff", (req, res) => {
  Thing.find()
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

// Add a thing to Database
app.post("/api/stuff", (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({ message: "successfuly saved" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

// Update thing in the Database
app.put("/api/stuff/:id", (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(200).json({ message: "successfuly updated" });
    })
    .catch((err) => {
      res.status(200).json({ error: err });
    });
});

// Delete the thing from Database
app.delete("/api/stuff/:id", (req, res) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "successfulty deleted" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

app.use("/", (req, res) => {
  res.status(200).json({ message: "server acceced successfuly" });
});

module.exports = app;
