var express = require("express");
var app = express();

var blog = require("./blog");

app.use("/blog",blog)

module.exports = app;