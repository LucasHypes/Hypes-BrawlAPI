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

// Rota principal
app.get("/", (req, res) => {
  res.send("API de Brawl Stars funcionando!");
});

// Rota original: battlelog filtrando amistosas e torneios
app.get("/player/:tag/battlelog", async (req, res) => {
  try {
    const tag = normTag(req.params.tag);
    const { data } = await api.get(`/players/%23${tag}/battlelog`);

    if (!data.items || data.items.length === 0) {
      return res.json({ message: "Nenhuma partida recente encontrada" });
    }

    const filtered = data.items.filter(
      match => match.event && (match.event.type === "friendly" || match.event.type === "tournament")
    );

    res.json(filtered);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Falha ao buscar battlelog" });
  }
});

// Rota temporária para testar acesso direto à API da Supercell
app.get("/test-supercell", async (req, res) => {
  try {
    const { data } = await api.get("/players/%238VPG0PCPJ/battlelog");
    res.json({ success: true, partidas: data.items });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));