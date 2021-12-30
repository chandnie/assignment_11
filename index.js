const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let Login = require("./schema/login");



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/register", (req, res) => {
  Login.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  }).then(function (data) {
    if (data) {
      console.log("register successfully");
      return res.status(200).send(data);
    }
  });
});


app.post("/login", (req, res) => {
  Login.findOne({
    email: req.body.email,
  }).then(function (login) {
    if (!login) {
      console.log("not found");
      res.status(404).send("user not found");
    } else {
      if (req.body.password == login.password) {
        console.log("success");
        res.status(200).send(login);
      } else {
        console.log("Incorrect password");
        res.status(500).send("Incorrect password");
      }
    }
  });
});



app.get("/getUsers", (req, res) => {
  Login.find(function (err, response) {
    if (err) {
      res.status(200).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});



app.post("/update/:id", (req, res) => {
  Login.findById(req.params.id, function (err, user) {
    if (!user) res.status(404).send("user is not found");
    else
      user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
    user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;
    user
      .save()
      .then((user1) => {
        res.status(200).send(user1);
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});




app.delete("/delete/:id", (req, res) => {
  Login.findByIdAndRemove(req.params.id, function (err, todo) {
    if (!err) {
      res.status(200).send("user deleted");
    } else res.status(200).send(err);
  });
});




const PORT = 4000;
mongoose.connect("mongodb+srv://chandni:chandni123@@@cluster0.fwd1g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});



