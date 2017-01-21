//server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Todo = require('./model/todos');

// Create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

mongoose.connect(process.env.DATABASE_URL);

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent todos
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({ message: 'API Initialized!' });
});

router.route('/todos')
.get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err)
            res.send(err);
        res.json(todos)
    });
})
.post(function (req, res) {
    var todo = new Todo();

    todo.text = req.body.text;
    todo.save(function (err) {
        if (err)
            res.send(err);
        res.json({
            message: 'Todo successfully added!'
        });
    });
});

router.route('/todos/:todo_id')
.put(function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
    if (err)
        res.send(err);

    (req.body.text) ? todo.text = req.body.text: null;

    todo.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Todo has been updated' });
    });
    });
})
.delete(function (req, res) {
    Todo.remove({ _id: req.params.todo_id }, function (err, todo) {
        if (err)
            res.send(err);
        res.json({ message: 'Todo has been deleted' })
    })
});

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function () {
    console.log(`api running on port ${port}`);
});