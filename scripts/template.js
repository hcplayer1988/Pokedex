// Pokemon preview card template

function getPkmPrevCard(pokemonList) {
  let html = "";

  pokemonList.forEach((pokemon, index) => {
    let typeColor = typeColors[pokemon.types[0]] || '#777';
    let typeIcons = pokemon.types.map(type => `
      <div>
        <img src="./assets/icons/type_icons/${type}.svg" alt="${type}">
      </div>
    `).join('');

    html += `
      <div class="pkm_cad_prev">
        <div class="pkm_header">
          <div>
            <span>#${index + 1 + currentOffset}</span>
          </div>
          <div>
            <span>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
          </div>
        </div>
        <div class="seperator"></div>
        <div class="pkm_pic" style="background-color: ${typeColor};">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
        </div>
        <div class="seperator"></div>
        <div class="pkm_footer">
          ${typeIcons}
        </div>
      </div>
    `;
  });

  return html;
}
