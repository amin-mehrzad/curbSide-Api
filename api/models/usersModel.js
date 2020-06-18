const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
//const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        // required: true,
    },
    lastName: {
        type: String,
        trim: true,
        // required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    websiteID: {
        type: Schema.Types.ObjectId,
        ref: 'Website'
    },
    scopeID: {
        type: Schema.Types.ObjectId,
        ref: 'Scope'
    }
});

module.exports = mongoose.model('User', UserSchema);