const xlsx = require('xlsx');
const path = require('path');

function getLoginDataFromExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(path.resolve(filePath));
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return jsonData; // Returns an array of objects [{email, password}, ...]
}

module.exports = { getLoginDataFromExcel };
