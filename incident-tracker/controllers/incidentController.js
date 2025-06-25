const Incident = require('../models/Incident');
const { exportToCSV, exportToJSON } = require('../utils/exportLogs');

// @desc Create new incident
exports.createIncident = async (req, res) => {
  try {
    const newIncident = new Incident(req.body);
    const saved = await newIncident.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Get incidents with optional filters
exports.getIncidents = async (req, res) => {
  try {
    const { severity, ipAddress } = req.query;
    const filter = {};

    if (severity) filter.severity = severity;
    if (ipAddress) filter.ipAddress = ipAddress;

    const incidents = await Incident.find(filter).sort({ timestamp: -1 });
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Export incidents as CSV or JSON
exports.exportIncidents = async (req, res) => {
  try {
    const { type = 'json', severity, ipAddress } = req.query;
    const filter = {};

    if (severity) filter.severity = severity;
    if (ipAddress) filter.ipAddress = ipAddress;

    const incidents = await Incident.find(filter);

    if (type === 'csv') {
      const csvData = exportToCSV(incidents);
      res.header('Content-Type', 'text/csv');
      res.attachment('incidents.csv');
      return res.send(csvData);
    } else {
      res.header('Content-Type', 'application/json');
      return res.send(exportToJSON(incidents));
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


