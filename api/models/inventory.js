const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    login: String,
    password: String,
    name: String
    // methods: Object
});
const Test = mongoose.model('inventory', testSchema);

module.exports = Test;