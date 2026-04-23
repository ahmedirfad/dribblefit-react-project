const mongoose = require('mongoose');

const homeSectionSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    unique: true,
    enum: ['sale-banner', 'hero-banner', 'kits', 'bestsellers', 'passion', 'promo', 'video']
  },
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  settings: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HomeSection', homeSectionSchema);