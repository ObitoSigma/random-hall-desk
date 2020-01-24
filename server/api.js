/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Parcel = require("./models/parcel");
const Item = require("./models/item");
const Resident = require("./models/resident");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user);
  });
});

router.put("/user", auth.ensureLoggedIn, (req, res) => {
  console.log('hello');
  User.findById(req.query.userId).then((user) => {
    console.log(req.query.userId);
    console.log(req.body.tracking);
    console.log(user.parcelHistory);
    user.parcelHistory.push(req.body.tracking);
  })
})

router.get("/parcels", (req, res) => {
  // empty selector means get all documents
  Parcel.find({}).then((parcels) => res.send(parcels));
});

router.post("/parcel", auth.ensureLoggedIn, (req, res) => {
  const newParcel = new Parcel({
    tracking: req.body.tracking,
    carrier: req.body.carrier,
    resident: req.body.resident,
    worker_name: req.user.name,
    worker_id: req.user._id,
  });

  newParcel.save().then((parcel) => res.send(parcel));
});

router.post("/delete", auth.ensureLoggedIn, (req, res) => {
  Parcel.deleteOne( { _id: req.body._id} )
  .catch((error) => console.log(error));
})

router.post("/update", auth.ensureLoggedIn, (req, res) => {
  User.updateOne( { _id: req.body._id}, { property: req.body.property})
  .catch((error) => console.log(error));
})

router.post("/pushParcel", auth.ensureLoggedIn, (req, res) => {
  User.updateOne( { _id: req.body._id}, { $push: {parcelHistory: req.body.tracking} } )
  .catch((error) => console.log(error));;
})

router.get("/items", (req, res) => {
  // empty selector means get all documents
  Item.find({}).then((items) => res.send(items));
});

router.post("/item", auth.ensureLoggedIn, (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    type: req.body.type,
    resident: req.body.resident,
    worker_name: req.user.name,
    worker_id: req.user._id,
  });

  newItem.save().then((item) => res.send(item));
});

router.get("/residents", (req, res) => {
  // empty selector means get all documents
  Resident.find({}).then((residents) => res.send(residents));
});

router.post("/resident", auth.ensureLoggedIn, (req, res) => {
  const newResident = new Resident({
    name: req.body.name,
  });

  newResident.save().then((resident) => res.send(resident));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
