const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    tests: Array,
    testResult: Object
    // methods: Object
});
const User = mongoose.model('User', userSchema);

module.exports = User;