

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
    console.error("error loading Pokemon:", error);
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
}

