

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
      <div class="pkm_cad_prev" onclick="fetchSinglePokemon('${pokemon.name}')">
        <div class="pkm_header">
          <div>
            <span>#${pokemon.id}</span>
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


// big Pokemoncard Template
function bigPokeCard() {
  return `
    <div class="poke_nav_left" onclick="showPrevPokemon()">
      <img src="./assets/icons/last.png" alt="Previous">
    </div>
    <div class="poke_content">
      <div id="close">
        <span class="closeBtn" onclick="closePokeCard()">close</span>
      </div>
      <div class="pokemonHeader">
        <h2 id="pokemonName"></h2>
        <span id="pokemonId"></span>
      </div>
      
      <div class="pokemon_img">
        <img id="modalSprite" src="" alt="Pokemon_image">
      </div>

      <div class="data_buttons" id="dataButtons">
        <button id="base_button" onclick="showBaseData()">Base Data</button>
        <button id="stats_button" onclick="showStatsData()">Stats</button>
      </div>

      <div class="stats">
        <div id="pokemonTypes" class="pokemon_types"></div>
        
        <div class="modalSection" id="species">
          <strong>Species:</strong> <span id="pokemonSpecies"></span>
        </div>
        <div class="modalSection" id="bodyStats">
          <strong>Height:</strong> <span id="pokemonHeight"></span> &nbsp;
          <strong>Weight:</strong> <span id="pokemonWeight"></span>
        </div>
        <div class="modalSection" id="abilities">
          <strong>Abilities:</strong> <span id="pokemonAbilities"></span>
        </div>
        
        <div class="modalSection" id="breeding">
          <strong>Breeding:</strong>
          <div id="pokemonBreeding"></div>
        </div>
        
        <div class="modalSection" id="baseStats">
          <strong>Base Stats:</strong>
          <div id="pokemonStats">
            <div class="stat_row">
              <span id="stat_hp" class="stat_name"></span>
              <span id="stat_hp_value" class="stat_value"></span>
            </div>
            <div class="stat_row">
              <span id="stat_attack" class="stat_name"></span>
              <span id="stat_attack_value" class="stat_value"></span>
            </div>
            <div class="stat_row">
              <span id="stat_defense" class="stat_name"></span>
              <span id="stat_defense_value" class="stat_value"></span>
            </div>
            <div class="stat_row">
              <span id="stat_special-attack" class="stat_name"></span>
              <span id="stat_special-attack_value" class="stat_value"></span>
            </div>
            <div class="stat_row">
              <span id="stat_special-defense" class="stat_name"></span>
              <span id="stat_special-defense_value" class="stat_value"></span>
            </div>
            <div class="stat_row">
              <span id="stat_speed" class="stat_name"></span>
              <span id="stat_speed_value" class="stat_value"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="poke_nav_right" onclick="showNextPokemon()">
      <img src="./assets/icons/next.png" alt="Next">
    </div>

  `;
}
