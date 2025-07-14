
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
    types: detail.types.map(t => t.type.name)
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

