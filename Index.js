import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BRAWL_TOKEN;
const BRAWL_BASE = "https://api.brawlstars.com/v1";

const api = axios.create({
  baseURL: BRAWL_BASE,
  headers: { Authorization: `Bearer ${TOKEN}` }
});

function normTag(tag) {
  return encodeURIComponent(tag.replace("#", "").toUpperCase());
}

app.get("/", (req, res) => {
  res.send("✅ API de Brawl Stars está funcionando!");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));