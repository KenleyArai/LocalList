//model/todos.js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodosSchema = new Schema({
 text: String
});

module.exports = mongoose.model('Todo', TodosSchema);
