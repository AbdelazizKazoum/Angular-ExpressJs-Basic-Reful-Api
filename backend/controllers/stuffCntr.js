const express = require("express");
const Thing = require("../models/thing");

// get All stuff
exports.getAllStuff = (req, res) => {
  Thing.find()
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

//Create new thing
exports.createNew = (req, res, next) => {
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
};

//update Thing
exports.updateStuff = (req, res, next) => {
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
};

//Search For stuff
exports.searchForStuff = (req, res) => {
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
};

// Delete Stuff
exports.deleteStuff = (req, res) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "successfulty deleted" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};
