const mongoose = require('mongoose');

const iocSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['ip', 'domain', 'url', 'hash-md5', 'hash-sha1', 'hash-sha256', 'email', 'cidr', 'asn']
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  threatLevel: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical']
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  description: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  firstSeen: {
    type: Date
  },
  lastSeen: {
    type: Date
  },
  submitter: {
    type: String,
    default: 'Anonymous'
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  blockchainTxHash: {
    type: String,
    sparse: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  },
  verificationCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
iocSchema.index({ type: 1, value: 1 }, { unique: true });
iocSchema.index({ threatLevel: 1 });
iocSchema.index({ createdAt: -1 });
iocSchema.index({ tags: 1 });

module.exports = mongoose.model('IOC', iocSchema);