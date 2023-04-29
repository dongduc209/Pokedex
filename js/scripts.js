let pokemonList = [
  { name: "Kyogre", height: 4.5, types: ["water", "ice"]},
  { name: "Groudon", height: 3.5, types: ["ground", "fire"]},
  { name: "Rayquaza", height: 7, types: ["dragon", "flying"]}  
  ];
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 4.5) {
    document.write(pokemonList[i].name + "(" + "height:" + " "+ pokemonList[i].height+ ")" + " - " + "Wow!!! This is a big Pokemon!" + "<br>" + "<br>") 
  }else {
    document.write(pokemonList[i].name + "(" + "height:" + " "+ pokemonList[i].height+ ")" + "<br>" + "<br>")
  }
}
