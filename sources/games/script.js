class Videojuego {

    constructor(id, img, titulo, plataforma, description,precio,calificacion) {
      this.id = id;
      this.img=img;
      this.titulo = titulo;
      this.plataforma=plataforma;
      this.description = description;
      this.precio=precio;
      this.calificacion=calificacion;
      
    }
  
  }
  
  // Creamos objetos de modelos de casas
  const juego1 = new Videojuego(1,"Juego1.jpg", "StarCraft","Play Station", 250000, );
  const juego2 = new Videojuego(2, "Juego2.jpg", "Alla Wake 2","Play Station",3, 3.5, 350000, );
  const juego3 = new Videojuego(3, "Juego3.jpg", "Alone in the Dark","Xbox", 4, 4.5, 450000);
  const juego4 = new Videojuego(3, "Juego4.jpg", "Armored Core","Play Station", 4, 4.5, 450000);
  const juego5 = new Videojuego(3, "Juego5.jpg", "Assassins creed","PC", 450000,);
  
  // Almacenamos los objetos en un array
  const VideojuegoList = [juego1, juego2, juego3,juego4,juego5];
  
  // Accedemos datos por indices
  console.log('Impresion en consola de elementos accesados por indices: ');
  console.log(VideojuegoList[0]);
  console.log(VideojuegoList[1]);
  console.log(VideojuegoList[2]);
  
  // Accedemos datos con funcion forEach() de array
  console.log('Impresion en consola de elementos accesados con forEach(): ');
  VideojuegoList.forEach(item => {console.log(item)});
  
  //#endregion
  
  
  //#region VISTA DE LOS MODELOS EN HTML (VIEW)
  function displayTable(games) {
  
    clearTable();
  
    showLoadingMessage();
  
    setTimeout(() => {
  
      if (games.length === 0) {
  
        showNotFoundMessage();
  
      } else {
  
          hideMessage();
  
          const tablaBody = document.getElementById('data-table-body');
  
          const imagePath = `../file/img/videojuegos/`;
  
          games.forEach(game => {
  
            const row = document.createElement('tr');
  
            row.innerHTML = `
              <td> ${game.id} </td>
              <td> <img src="${imagePath + game.img}" alt="${game.titulo}"> </td>
              <td>${game.titulo}</td>
              <td>${game.plataforma}</td>
              <td>${game.description}</td>
              <td>${game.precio}</td>
              <td>${game.price}</td>
            `;
  
            tablaBody.appendChild(row);
  
          });
  
      }
  
    }, 2000);
  
  }
  
  
  function clearTable() {
    const tableBody = document.getElementById('data-table-body');
  
    tableBody.innerHTML = '';
  }
  
  
  function showLoadingMessage() {
    const messageNotFound = document.getElementById('message-not-found');
  
    messageNotFound.innerHTML = 'Cargando...';
  
    messageNotFound.style.display = 'block';
  }
  
  
  function showNotFoundMessage() {
    const messageNotFound = document.getElementById('message-not-found');
  
    messageNotFound.innerHTML = 'No se encontraron casas con el filtro proporcionado.';
  
    messageNotFound.style.display = 'block';
  }
  
  
  function hideMessage() {
    const messageNotFound = document.getElementById('message-not-found');
  
    messageNotFound.style.display = 'none';
  }
  
  //#endregion
  
  
  //#region INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)
  
  displayTable(VideojuegoList);