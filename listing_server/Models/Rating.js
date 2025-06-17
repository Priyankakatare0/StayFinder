const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    listing_id: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "listing"
    }, 
    comment: {
        type: String,
        default: ''
    }

});

const ratingModel = mongoose.model('Rating', ratingSchema);
module.exports = ratingModel; 