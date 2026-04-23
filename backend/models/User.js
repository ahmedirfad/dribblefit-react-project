const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
    addresses: { type: Array, default: []},
    phone: {type: String, default: ''},
    fullName: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    isEmailVerified: { type: Boolean, default: false },
    createdAt: {type: Date, default: Date.now },
    blockedAt: {type: Date, default: null},
    blockedBy: { type: String, default: null}
});

userSchema.pre('save', async function() {
  if (!this.id) {
    this.id = Date.now().toString();
  }
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);