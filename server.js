const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "RKB Caisse API fonctionne 🔥" });
});

// Exemple route operations
app.get("/operations", (req, res) => {
  res.json([
    { id: 1, type: "Entrée", montant: 5000, date: "2025-01-10" },
    { id: 2, type: "Sortie", montant: 2000, date: "2025-01-11" },
  ]);
});

// Port Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serveur démarré sur " + PORT));
