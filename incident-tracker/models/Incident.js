const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  ipAddress: String,
  alertType: String,
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'] },
  description: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', incidentSchema);
