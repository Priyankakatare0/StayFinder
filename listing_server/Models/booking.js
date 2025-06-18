const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    no_of_guest: {
        type: Number,
        required: true
    },
    room_type: {
        type: String,
        required: true
    },
    listing_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    }
    ,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_no: {
        type: String, // still keep as string to support +91 or leading zeros
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
