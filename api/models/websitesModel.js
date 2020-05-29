const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const WebsiteSchema = new Schema({
  websiteID: {
    type: String,
    trim: true,
    // required: true,
  },
  websiteName: {
    type: String,
    trim: true,
    //   required: true,
  },
  logoURL: {
    type: String,
    trim: true,
    //  required: true,
  },
  websitePlatform: {
    type: String,
    trim: true,
    //  required: true,
  },
  websiteEmail: {
    type: String,
    trim: true,
    //  required: true,
  },
  websiteFromEmail: {
    type: String,
    trim: true,
    //  required: true,
  },
  phone: {
    type: Number,
   // trim: true,
    //  required: true,
  },
  state: {
    type: String,
   // trim: true,
    //   required: true
  },
  country: {
    type: String,
    trim: true,
    //   required: true,
  },
  scopeID: {
    type: Schema.Types.ObjectId,
    ref: 'Scopes'
  },
  businessEmail: {
    type: String,
    trim: true,
    //   required: true
  },
  businessAddress: {
    type: String,
   // trim: true
  },
  businessPhone: {
    type: Number,
    trim: true
  },
  businessName: {
    type: String,
    //trim: true
  }
});
module.exports = mongoose.model('Website', WebsiteSchema)