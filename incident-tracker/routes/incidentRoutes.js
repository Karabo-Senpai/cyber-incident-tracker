//const { exportIncidents } = require('../controllers/incidentController');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const {
  createIncident,
  getIncidents,
  exportIncidents  // 🔥 make sure this is defined in your controller
} = require('../controllers/incidentController');

// Public routes
router.post('/', createIncident);
router.get('/', getIncidents);

console.log("exportIncidents is:", exportIncidents);

// Protected export route (JWT required)
router.get('/export', verifyToken, requireAdmin, exportIncidents);

// 🔐 Admin-only test route
router.get('/admin-only-stuff', verifyToken, (req, res) => {
  res.send("✅ Welcome, admin! JWT verified.");
});

module.exports = router;
