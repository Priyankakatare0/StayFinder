// import mongoose from "mongoose";
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assumes you have a User model
        required: true
    },
    availability: [
        {
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true }
        }
    ],
    img: {
        type: String,
        default: "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg"
    }
}, {
    timestamps: true
});

const listingModel = mongoose.model("listing", listingSchema);
module.exports = listingModel;