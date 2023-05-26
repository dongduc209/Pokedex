let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
      ) {
      pokemonList.push(pokemon);
    } else {
      document.write("pokemon is not correct");
    }
  }

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".list-group");
      let listpokemon = document.createElement("li");
      listpokemon.classList.add("list-item");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class", "btn", "btn-warning");
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#modal-container');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);

      button.addEventListener("click", function(event) {
        showDetails(pokemon);});
    }

    
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

    function showModal(item) {
      const modalContainer = document.querySelector('#modal-container');
      const modalBody = document.querySelector('#modal-container .modal-body');
      const modalTitle = document.querySelector('#modal-container .modal-title');
      
      modalBody.innerHTML = '';
  
      let modal = document.createElement('div');
      let container = document.querySelector('#image-container');

      modalTitle.innerText = item.name;

      let myImage = document.createElement('img');
      myImage.src = item.imageUrl;
      myImage.classList.add("pokemon-image");

      let pokemonHeight = document.createTextNode("height: " + item.height/10 + "m");
      
      modal.appendChild(myImage);
      modalBody.appendChild(modal);
      modalBody.appendChild(pokemonHeight);
    } 
    
    function searchPokemon() {
      let searchInput = document.getElementById("search-input");
      let searchText = searchInput.value.toLowerCase();
      let allPokemon = document.querySelectorAll(".list-item");
  
      allPokemon.forEach(function (pokemon) {
        let pokemonText = pokemon.querySelector(".button-class").innerText.toLowerCase();
        let searchList = document.querySelector(".list-group");
  
        if (pokemonText.includes(searchText)) {
          searchList.classList.add("search-list");
          pokemon.style.display = "inline-block";
        } else {
          pokemon.style.display = "none";
        }
  
        if (!searchInput.value) {
          searchList.classList.remove("search-list");
        }
      });
    }
  
    let searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function () {
      searchPokemon();
    });

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal
    };
  })();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

