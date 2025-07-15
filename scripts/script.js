
let allPokemonList = [];
let currentPokemonIndex = 0;



// colorcodes for Pokemon types
let typeColors = {
  grass: '#8bfd52ff',
  fire: '#fc4f46ff',
  water: '#4a80ffff',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  normal: '#A8A878',
  fighting: '#F08030',
  flying: '#A890F0',
  poison: '#c22dc2ff',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0'
};


let currentOffset = 0;
let pokemonLimit = 40;


function init() {
  fetchPkm(currentOffset, pokemonLimit);
  currentOffset += pokemonLimit;
}


// main fetch
async function fetchPkm(offset = 0, limit = pokemonLimit) {
  try {
    if (offset >= 151) return;
    limit = Math.min(limit, 151 - offset);
    let data = await fetchBaseData(offset, limit);
    let detailedList = await fetchDetails(data.results);
    renderCards(detailedList);
  } catch (error) {
    console.log("error load Pkm:", error);
  }
}


// load Base data
async function fetchBaseData(offset, limit) {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  return await response.json();
}


// load details of Pokemon
async function fetchDetails(basicList) {
  allPokemonList.push(...basicList);
  return await Promise.all(
    basicList.map(async (pkm) => {
      let res = await fetch(pkm.url);
      let detail = await res.json();
      return parseDetail(detail);
    })
  );
}


// read base data of pokemon
function parseDetail(detail) {
  return {
    id: detail.id,
    name: detail.name,
    image: detail.sprites.front_default,
    types: detail.types.map(t => t.type.name),
    height: detail.height / 10 + " m",
    weight: detail.weight / 10 + " kg",
    abilities: detail.abilities.map(a => a.ability.name).join(", ")
  };
}



// render Pokemon card
function renderCards(pokemonList) {
  let prevCard = document.getElementById("pkmCards");
  let html = getPkmPrevCard(pokemonList);
  prevCard.innerHTML += html;
  console.log(pokemonList);
}


// loadingspiner
function showLoadingSpinner() {
  document.getElementById("loadingScreen").style.display = "block";
  document.querySelector("main").classList.add("blur");
  document.getElementById("morePkm").disabled = true;
}


function hideLoading() {
  document.getElementById("loadingScreen").style.display = "none";
  document.querySelector("main").classList.remove("blur");
  document.getElementById("morePkm").disabled = false;
}


function loadPokemonBatch() {
  let remaining = 151 - currentOffset;
  let loadAmount = Math.min(pokemonLimit, remaining);

  fetchPkm(currentOffset, loadAmount);
  currentOffset += loadAmount;

  if (currentOffset >= 151) {
    document.getElementById("morePkm").style.display = "none";
  }
}


function morePkm() {
  showLoadingSpinner();
    setTimeout(() => {
    loadPokemonBatch();
    hideLoading(); 
  }, 1500);
}


// load big PokeCard
async function fetchSinglePokemon(pokemonName) {
  currentPokemonIndex = allPokemonList.findIndex(p => p.name === pokemonName);
  try {
    let base = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    let baseData = await base.json();
    let species = await fetch(baseData.species.url);
    let speciesData = await species.json();
    let pokemon = parseFullPokemon(baseData, speciesData);
    openBigCard(pokemon);
  } catch (error) {
    console.log("error load Pkm:", error);
  }
}


function parseFullPokemon(base, species) {
  return {
    id: base.id,
    name: base.name,
    image: base.sprites.front_default,
    types: base.types.map(t => t.type.name),
    height: base.height / 10 + " m",
    weight: base.weight / 10 + " kg",
    abilities: base.abilities.map(a => a.ability.name).join(", "),
    species: species.genera.find(g => g.language.name === "en")?.genus || "-",
    breeding: {
      genderRatio: species.gender_rate,
      eggGroups: species.egg_groups.map(g => g.name).join(", ")
    },
    stats: base.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
  };
}



function openBigCard(pokemon) {
  let bigerPokeCard = document.getElementById("bigCard");
  bigerPokeCard.classList.remove("hidden");
  bigerPokeCard.innerHTML = bigPokeCard();
  fillBigCard(pokemon);
  document.getElementById("blurOverlay").classList.remove("hidden");
  showBaseData();
}


function fillBigCard(pokemon) {
  setText("pokemonName", capitalize(pokemon.name));
  setText("pokemonId", `#${pokemon.id}`);
  setImage("modalSprite", pokemon.image);
  let mainType = pokemon.types[0];
  let bgColor = typeColors[mainType] || "#777";
  document.querySelector(".pokemon_img").style.backgroundColor = bgColor;

  setTypes("pokemonTypes", pokemon.types);
  setText("pokemonSpecies", capitalize(pokemon.species || "-"));
  setText("pokemonHeight", pokemon.height || "-");
  setText("pokemonWeight", pokemon.weight || "-");
  setText("pokemonAbilities", pokemon.abilities || "-");
  fillBreedingInfo(pokemon.breeding);
  fillStatSection(pokemon.stats);
}


function fillStatSection(stats) {
  if (!stats || stats.length === 0) return;

  stats.forEach(s => {
    setText(`stat_${s.name}`, capitalize(s.name));
    setText(`stat_${s.name}_value`, s.value);
  });
}


function fillBreedingInfo(breeding) {
  let breedContainer = document.getElementById("pokemonBreeding");
  if (!breeding) return breedContainer.textContent = "No breedin informations availeble.";
  let male = 100 - (breeding.genderRatio / 8 * 100);
  let female = 100 - male;
  breedContainer.innerHTML = `
    <div>♂ ${male.toFixed(1)}%, ♀ ${female.toFixed(1)}%</div>
    <div><strong>Egg Groups:</strong> ${breeding.eggGroups}</div>
  `;
}


function closePokeCard() {
  let bigerPokeCard = document.getElementById("bigCard");
  bigerPokeCard.classList.add("hidden");
  bigerPokeCard.innerHTML = "";
  document.getElementById("blurOverlay").classList.add("hidden");
}


function setText(id, value) {
  document.getElementById(id).textContent = value;
}


function setImage(id, src) {
  document.getElementById(id).src = src;
}


function setTypes(id, types) {
  const html = types.map(t =>
    `<img src="./assets/icons/type_icons/${t}.svg" alt="${t}">`
  ).join('');
  document.getElementById(id).innerHTML = html;
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


function showNextPokemon() {
  if (allPokemonList.length === 0) return;
  currentPokemonIndex++;
  if (currentPokemonIndex >= allPokemonList.length) {
    currentPokemonIndex = 0; // ⏪ Zurück zum ersten Pokémon
  }
  fetchSinglePokemon(allPokemonList[currentPokemonIndex].name);
}



function showPrevPokemon() {
  if (allPokemonList.length === 0) return;
  currentPokemonIndex--;
  if (currentPokemonIndex < 0) {
    currentPokemonIndex = allPokemonList.length - 1; // ⏩ Zum letzten Pokémon
  }
  fetchSinglePokemon(allPokemonList[currentPokemonIndex].name);
}



function showBaseData() {
  document.getElementById("species").style.display = "block";
  document.getElementById("bodyStats").style.display = "block";
  document.getElementById("abilities").style.display = "block";
  document.getElementById("breeding").style.display = "block";
  document.getElementById("baseStats").style.display = "none";
}


function showStatsData() {
  document.getElementById("species").style.display = "none";
  document.getElementById("bodyStats").style.display = "none";
  document.getElementById("abilities").style.display = "none";
  document.getElementById("breeding").style.display = "none";
  document.getElementById("baseStats").style.display = "block";
}

