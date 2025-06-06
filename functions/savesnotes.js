const fs = require("fs");
const path = require("path");

// On stocke tout dans un fichier notes.json dans le dossier functions/data
const DATA_PATH = path.join(__dirname, "data");
const NOTES_FILE = path.join(DATA_PATH, "notes.json");

// S'assure que le dossier existe
if (!fs.existsSync(DATA_PATH)) fs.mkdirSync(DATA_PATH);

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Méthode non autorisée" };
  }
  try {
    const { moduleId, notes } = JSON.parse(event.body);
    let allNotes = {};
    if (fs.existsSync(NOTES_FILE)) {
      allNotes = JSON.parse(fs.readFileSync(NOTES_FILE));
    }
    allNotes[moduleId] = notes;
    fs.writeFileSync(NOTES_FILE, JSON.stringify(allNotes, null, 2));
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
