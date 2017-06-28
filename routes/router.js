const express = require('express');
const router = express.Router();
const todo = require('./todo');


router.get("/", function(req, res){
  res.redirect("/todo");
});

router.use("/todo",todo);

module.exports = router;
