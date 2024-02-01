const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "IND"
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'], 
        default: 'pending'
    },
    transactionId: {
        type: String
    },
    
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
