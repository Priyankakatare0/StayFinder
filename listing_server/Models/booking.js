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
        type: String, // only type, no match pattern needed
        required: true
    },
    // payment_status: {
    //     type: String,
    //     enum: ['pending', 'paid', 'failed'],
    //     default: 'pending'
    // },
    // amount_paid: {
    //     type: Number,
    //     default: 0
    // },
    // payment_method: {
    //     type: String,
    //     enum: ['card', 'upi', 'cash', 'wallet'],
    //     default: 'card'
    // },
    // transaction_id: {
    //     type: String
    // }

}, { timestamps: true });

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
