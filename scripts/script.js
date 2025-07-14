let typeColors = {
  grass: '#78C850',
  fire: '#C03028',
  water: '#6890F0',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  normal: '#A8A878',
  fighting: '#F08030',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0'
};


function init() {
    fetchPkm();
}


// main fetch
async function fetchPkm() {
  try {
    let data = await fetchBaseData();
    let detailedList = await fetchDetails(data.results);
    renderCards(detailedList);
  } catch (error) {
    console.log("error loading Pokemon:", error);
  }
}


// load Base data
async function fetchBaseData() {
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
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
  prevCard.innerHTML = html;
  console.log(pokemonList);
}

