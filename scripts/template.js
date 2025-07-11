function getPkmPrevCard(pokemonList) {
  let html = "";

  pokemonList.forEach((pokemon, index) => {
    html += `
      <div class="pkm_cad_prev">
        <div class="pkm_header">
          <div>
            <span>#${index + 1}</span>
          </div>
          <div>
            <span>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
          </div>
        </div>
        <div class="seperator"></div>
        <div class="pkm_pic">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="${pokemon.name}">
        </div>
        <div class="seperator"></div>
        <div class="pkm_footer">
          <div>
            <img id="typeOne" src="./assets/icons/type_icons/grass.svg" alt="type_icons">
          </div>
          <div>
            <img id="typeTwo" src="./assets/icons/type_icons/poison.svg" alt="">
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

