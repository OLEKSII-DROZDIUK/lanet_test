const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    _id: ObjectId,
    password: {
        type:String,
        required: true
    },
    login: {
        type:String,
        required: true
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
})

module.exports = User = mongoose.model('users', userSchema);
