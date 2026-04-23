const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    team: { type: String, default: '' },
    league: { type: String, default: '' },
    description: { type: String, default: '' },
    sizes: { type: [String], default: ['S', 'M', 'L', 'XL'] },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function() {
  this.updatedAt = new Date();
});

module.exports = mongoose.model('Product', productSchema);