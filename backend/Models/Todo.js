const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default:false
    }
})

const TodoModel = mongoose.model('todos', TodoSchema) 
// here the first parameter is the
//first parameter is the name of our database
//second is the Schema we defined

module.exports = TodoModel;