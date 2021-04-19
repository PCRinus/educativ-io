const {Schema, model} = require('mongoose');

const ProfileSchema = new Schema({
    firstName: {
        type: String,
        reqired: true,
    },
    lastName: {
        type: String,
        reqired: true,
    },
    age: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
})

const Profile = model('profile', ProfileSchema);

module.exports = Profile;