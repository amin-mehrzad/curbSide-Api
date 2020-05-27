const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    imageUrl: {
        type: String,
        trim: true,
      //  required: true,
    },
    name: {
        type: String,
       // trim: true,
      //  required: true,
    },
    price: {
        type: Number,
      //  required: true,
       // lowercase: true
    },
    qty: {
        type: Number,
        trim: true,
      //  required: true,
    },
    tax: {
        type: String,
        trim: true,
       // required: true,
    },
    featured: {
        type: String,
        trim: true,
      //  required: true,
    },
    category: {
        type: String,
        trim: true,
       // required: true,
    },
    barcode: {
        type: String,
        trim: true,
      //  required: true,
    },
    active: {
        type: String,
        trim: true,
      //  required: true,
    },
    websiteID: {
        type: Schema.Types.ObjectId,
        ref: 'Website'
    },
    // productImage: {
    //    type: String,
    //    // required: true 
    //   }
},{strict:false});
module.exports = mongoose.model('Product', ProductSchema)