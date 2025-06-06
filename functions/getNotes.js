const fs = require("fs");
const path = require("path");
const DATA_PATH = path.join(__dirname, "data");
const NOTES_FILE = path.join(DATA_PATH, "notes.json");

exports.handler = async function(event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }
  const moduleId = event.queryStringParameters.moduleId;
  if (!moduleId) return { statusCode: 400, body: "moduleId requis" };
  let allNotes = {};
  if (fs.existsSync(NOTES_FILE)) {
    allNotes = JSON.parse(fs.readFileSync(NOTES_FILE));
  }
  const notes = allNotes[moduleId] || [];
  return { statusCode: 200, body: JSON.stringify({ notes }) };
};
