let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Kyogre", height: 4.5, types: ["water", "ice"]},
    { name: "Groudon", height: 3.5, types: ["ground", "fire"]},
    { name: "Rayquaza", height: 7, types: ["dragon", "flying"]}  
    ];

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);

      button.addEventListener("click", function() {
        showDetails(pokemon);});
    }

    function showDetails(pokemon){
      document.write(pokemon);
    }

  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
    };
  })();

  pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

