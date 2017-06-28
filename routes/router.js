const express = require('express');
const router = express.Router();
const models =  require("../models");

let todos = [];
let errors = {};

router.get("/", function(req, res){
  res.redirect("/todo");
});

router.get("/todo", function(req, res){
  models.todos.findAll().then(function(data){
    data.forEach(function(datum){
      todos.push(datum.dataValues)
    });
    res.render("todo", { todoList: todos, error: errors});
  });
});

router.post("/todo/add", function(req,res){
  todos = [];
  errors = {};
  req.checkBody("todo", "No text inputted for task").notEmpty();

  req.getValidationResult().then(function(result){
    if(result.isEmpty()){
      let newTodo = {
        task: req.body.todo,
        complete: false
      };
      console.log("New task to add to DB: ", newTodo);
      models.todos.create(newTodo).then(function(){
        res.redirect("/todo");
      });
    }
    else{
      errors = result.mapped();
      res.redirect("/todo");
    }
  })

});

router.post("todo/:itemID/complete", function(req, res){
  console.log("Marking todo item complete...");
  res.redirect("/todo");
})

module.exports = router;
