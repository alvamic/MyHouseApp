// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models

var db = require("../models");
var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AVlnzDFtEjN4Hj9ezoOT_c55ZZ9F15_MYneWzIR6gH_220G22v-vgpj8kQ8YqhZR0_-T-bp_ax4H3UhL',
  'client_secret': 'EOnn5RCe3EmVar_P_WTxxrah2UH5H1lN_azLIZS9YH6cgQxgWxMCJzX1iz954fw8TPJP3uCeb-MRXoH2'
});


// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    db.Todo.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
    res.json(dbTodo);
  });
});

  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/todos", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Todo.create({
      title: req.body.title,
      date: req.body.date
    }).then(function(dbTodo) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  // DELETE route for deleting todos. You can access the todo's id in req.params.id
  app.delete("/api/todos/:id", function(req, res) {
        // We just have to specify which todo we want to destroy with "where"
        db.Todo.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbTodo) {
          res.json(dbTodo);
        });

  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/todos", function(req, res) {
     // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Todo.update({
      title: req.body.text,
      date: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });

  //ROUTES FOR EVENTS SECTION//

    // GET route for getting all of the events
    app.get("/api/events", function(req, res) {
      db.Events.findAll({}).then(function(dbEvents) {
        // We have access to the todos as an argument inside of the callback function
      res.json(dbEvents);
      });
    });

  // POST route for saving a new event. You can create a event using the data on req.body
  app.post("/api/events", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Events.create({
      name: req.body.name,
      location: req.body.location,
      date: req.body.date
    }).then(function(dbTodo) {
      // We have access to the new events as an argument inside of the callback function
      res.json(dbEvents);
    });
  });

    // DELETE route for deleting events. We can get the id of the event to be deleted from
  // req.params.id
  app.delete("/api/events/:id", function(req, res) {
    // We just have to specify which event we want to destroy with "where"
    db.Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvents) {
      res.json(dbEvents);
    });

  });


  // PUT route for updating events. We can get the updated event data from req.body
  app.put("/api/events", function(req, res) {
   // Update takes in an object describing the properties we want to update, and
   // we use where to describe which objects we want to update
   db.Events.update({
        name: req.body.name,
        location: req.body.location,
        date: req.body.date
      }, {
        where: {
          id: req.body.id
        }
      }).then(function(dbEvents) {
        res.json(dbEvents);
      });
    });

    app.get('/payments', (req , res) => res.render('index'));

    app.post('/pay', (req, res)=>{
    
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8080/success",
                "cancel_url": "http://localhost:8080/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Utilities",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "Utilities."
            }]
        };
    
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i=0; i< payment.links.length; i++){
                    if(payment.links[i].rel === 'approval_url'){
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    
    });
    
    app.get('/success', (req, res)=> {
        var payerID = req.query.PayerID;
        var paymentId = req.query.paymentId; 
    
        var execute_payment_json = {
            "payer_id": payerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };
    
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment){
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
          res.send('Success');
          
      }
    });
    
      
    });
    
    app.get('/cancel', (req,res)=> res.send('Cancelled'));



};
