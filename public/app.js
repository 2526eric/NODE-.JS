const btn = document.getElementById("btn");
const btnXMLtoJSON = document.getElementById("btnXMLtoJSON");
const btnJSONtoXML = document.getElementById("btnJSONtoXML");
const btnPokemonXML = document.getElementById("btnPokemonXML");
const btnPokemonHabilitats = document.getElementById("btnPokemonHabilitats");
const btnPokemonImatge = document.getElementById("btnPokemonImatge");

btn.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  // Fem una petició HTTP al servidor (Express)
  // fetch() envia una request al backend
  const res = await fetch("/convert", {
    // Tipus de petició
    // POST = enviem dades al servidor
    method: "POST",
    // Capçaleres HTTP
    // Indiquem que estem enviant dades en format JSON
    headers: {
      "Content-Type": "application/json"
    },

    // Cos de la petició (les dades que enviem)
    // Convertim l'objecte JS a text JSON
    body: JSON.stringify({ data: text })
  });

  // El servidor respon amb JSON
  // Convertim la resposta a objecte JavaScript
  const json = await res.json();
  
  // Mostrem el resultat a la textarea de sortida
  document.getElementById("output").value = json.result;
});

btnXMLtoJSON.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  const res = await fetch("/convertXMLtoJSON", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();
  
  document.getElementById("output").value = json.result;
});

btnJSONtoXML.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  const res = await fetch("/convertJSONtoXML", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();
  
  document.getElementById("output").value = json.result;
});

// Pokémon → XML
btnPokemonXML.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  const res = await fetch("/convertPokemon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();

  document.getElementById("output").value = json.result;
});

// Habilitats del Pokémon
btnPokemonHabilitats.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  const res = await fetch("/infoPokemon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();

  // Les habilitats estan dins de json.result.abilities
  const habilitats = json.result.abilities.map(a => a.ability.name).join(", ");
  document.getElementById("output").value = habilitats;
});

// Imatge del Pokémon
btnPokemonImatge.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  const res = await fetch("/infoPokemon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();

  // Agafem l'URL de la imatge
  const imatgeUrl = json.result.sprites.front_default;

  // Creem un element img i el fiquem al div
  const img = document.createElement("img");
  img.src = imatgeUrl;
  document.getElementById("pokemonInfo").innerHTML = "";
  document.getElementById("pokemonInfo").appendChild(img);
});