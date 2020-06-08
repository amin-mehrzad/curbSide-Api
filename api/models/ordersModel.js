const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const OrderSchema = new Schema({

    orderID: { type: String },
    orderNumber: { type: String, },
    orderItems: [{
        productId: { type: String },
        qty: {
            ordered: { type: Number },
            shipped: { type: Number },
            cancelled: { type: Number }
        },
        soldPrice: { type: Number },
        price: { type: Number }
    }],
    orderStatusHistory: [{
        state: { type: String },
        timeStmap: { type: Date }
    }],
    orderState: { type: String },
    orderSubTotal: { type: Number },
    orderTax: { type: Number },
    orderDeliveryFee: { type: Number },
    orderTip: { type: Number },
    orderType: { type: String },
    orderPaymentType: { type: String },
    orderPaymentDetails: { type: String },
    orderDiscount: { type: Number },
    orderDiscountDetails: { type: String },
    customerID: { type: String },
    customerFirstName: { type: String },
    customerLastName: { type: String },
    customerPhoneNumber: { type: Number },
    customerEmail: { type: String },
    orderInstructions: { type: String },
    orderPaymentInstructions: { type: String },
    orderCreatedTime: { type: Date },
    websiteID: {
        type: Schema.Types.ObjectId,
        ref: 'Website'
    },

}, { strict: false });
module.exports = mongoose.model('Order', OrderSchema)