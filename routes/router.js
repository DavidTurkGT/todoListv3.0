const express = require('express');
const router = express.Router();
const models =  require("../models");

router.get("/", function(req, res){
  res.redirect("/todo");
});

router.get("/todo", function(req, res){
  let todos = [];
  models.todos.findAll().then(function(data){
    console.log("Data received: ", data);
    data.forEach(function(datum){
      console.log("Add the value: ",datum.dataValues);
      todos.push(datum.dataValues)
    });
    console.log("Todo list: ",todos);
    res.render("todo", { todos: todos});
  });
})

module.exports = router;
