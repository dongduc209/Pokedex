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
      
      modalContainer.classList.add('is-visible');
      
      $('#modal-container').modal('show')
      // Clear all existing modal content
      // modalContainer.innerHTML = '';
      modalBody.innerHTML = '';
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
  
      let modal = document.createElement('div');
      let container = document.querySelector('#image-container');

      modalTitle.innerText = item.name + (':    ') + ('height =  ') + item.height;

      let myImage = document.createElement('img');
      myImage.src = item.imageUrl;
      myImage.classList.add("pokemon-image");
      
      modal.appendChild(myImage);
      modalBody.appendChild(modal);

    }
  
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
  
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
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

