const express = require("express");
const convert = require("xml-js");

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));


// endpoint d'exemple
app.post("/convert", (req, res) => {
  const { data } = req.body;

  const result = data.toUpperCase(); // prova simple

  res.json({ result });
});

app.post("/convertXMLtoJSON", (req, res) => {
  const { data } = req.body;

  let result1 = convert.xml2json(data, { compact: true, spaces: 2 });
  const result = result1;

  res.json({ result });
});

app.post("/convertJSONtoXML", (req, res) => {
  const { data } = req.body;

  let result1 = convert.json2xml(data, { compact: true, spaces: 2 });
  const result = result1;

  res.json({ result });
});

// Pokémon → XML
app.post("/convertPokemon", async (req, res) => {
  const name = req.body.data;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonJson = await response.json();

  const result = convert.json2xml(JSON.stringify(pokemonJson), { compact: true, spaces: 2 });

  res.json({ result });
});

// Pokémon → JSON (per mostrar habilitats i imatge)
app.post("/infoPokemon", async (req, res) => {
  const name = req.body.data;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const result = await response.json();

  res.json({ result });
});


app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});