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

    return {
      add: add,
      getAll: getAll
    };
  })();

  pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon)
  });