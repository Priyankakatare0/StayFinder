const { required } = require('joi');
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listing_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
        required: true
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR', 'USD', 'EUR']
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        default: 'success'
    },
    transactionId: {
        type: String,
        unique: true,
        required: true,
    }
}, { timestamps: true });

const paymentModel = mongoose.model('Payment', paymentSchema);
module.exports = paymentModel