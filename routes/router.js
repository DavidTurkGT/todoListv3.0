const express = require('express');
const router = express.Router();
const models =  require("../models");

let todos = [];
let errors = {};

//Middle-ware
const requestMade = function(req, res, next){
  todos = [];
  errors = {};
  next();
};

router.get("/", function(req, res){
  res.redirect("/todo");
});

router.get("/todo", function(req, res){
  models.todos.findAll({order: [["createdAt" ,"DESC"]]}).then((data) => {
    data.forEach((datum) => {
      todos.push(datum.dataValues)
    });
    res.render("todo", { todoList: todos, error: errors});
  });
});

router.post("/todo/add", requestMade, function(req,res){
  req.checkBody("todo", "No text inputted for task").notEmpty();

  req.getValidationResult().then((result) => {
    if(result.isEmpty()){
      let newTodo = {
        task: req.body.todo,
        complete: false
      };
      models.todos.create(newTodo).then(() => { res.redirect("/todo") });
    }
    else{
      errors = result.mapped();
      res.redirect("/todo");
    }
  })

});

router.post("/todo/:itemID/complete", requestMade, function(req, res){
  models.todos.findById(req.params.itemID).then((task) => {
    task.update({complete: true}).then(() => {res.redirect("/todo");})
  });
});

router.post("/todo/completed/delete", requestMade, function(req,res){
  models.todos.destroy({ where:{complete:true } }).then(() => {res.redirect("/todo");});
});

module.exports = router;
