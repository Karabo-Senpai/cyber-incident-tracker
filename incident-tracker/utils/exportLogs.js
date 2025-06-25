const { Parser } = require('json2csv');

function exportToCSV(data) {
  const fields = ['ipAddress', 'alertType', 'severity', 'description', 'timestamp'];
  const opts = { fields };
  const parser = new Parser(opts);
  return parser.parse(data);
}

function exportToJSON(data) {
  return JSON.stringify(data, null, 2);
}

module.exports = { exportToCSV, exportToJSON };
