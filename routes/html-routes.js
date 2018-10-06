// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../Public/index.html"));
  });

  app.get("/payments", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.ejs"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../Public/blog.html"));
  });

  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../Public/cms.html"));
  });

  app.get("/submit", function(req, res) {
    res.sendFile(path.join(__dirname, "../Public/submit.html"));
  });

};
