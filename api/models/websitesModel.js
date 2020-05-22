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
  websiteEmailPassword: {
    type: String,
    trim: true,
    //  required: true,
  },
  websiteEmailService: {
    type: String,
    trim: true,
    //   required: true
  },
  websiteURL: {
    type: String,
    trim: true,
    //   required: true,
  },
  scopeID: {
    type: Schema.Types.ObjectId,
    ref: 'Scopes'
  },
  websiteStatus: {
    type: String,
    trim: true,
    //   required: true
  },
  websiteGooglePage: {
    type: String,
    trim: true
  },
  websiteFacebookPage: {
    type: String,
    trim: true
  },
  websiteYelpPage: {
    type: String,
    trim: true
  }
});
module.exports = mongoose.model('Website', WebsiteSchema)