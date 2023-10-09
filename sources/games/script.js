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
  const juego1 = new Videojuego(1,"Juego1.jpg", "StarCraft","Play Station","StarCraft II ofrece la mejor experiencia en juegos de estrategia en tiempo real.",200,"4 estrellas" );
  const juego2 = new Videojuego(2, "Juego2.jpg", "Alla Wake 2","Play Station","videojuego de horror de supervivencia desarrollado por Remedy Entertainment ",300,"5 estrellas");
  const juego3 = new Videojuego(3, "Juego3.jpg", "Alone in the Dark","Xbox","El jugador debe explorar la mansión para encontrar una salida, mientras se enfrenta a enemigos sobrenaturales",200,"3 estrellas");
  const juego4 = new Videojuego(3, "Juego4.jpg", "Armored Core","Play Station","Los jugadores ensamblarán y pilotarán su propio robot con maniobrabilidad 3D para moverse libremente",400,"4 estrellas");
  const juego5 = new Videojuego(3, "Juego5.jpg", "Assassins creed","PC","es un videojuego de aventura de acción y de sigilo en la que el jugador sobre todo asume el papel de Altaïr",500,"5 estrellas");
  
  // Almacenamos los objetos en un array
  const VideojuegoList = [juego1, juego2, juego3,juego4,juego5];
  
  
  
  
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
              <td>${game.calificacion}</td>
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

  // Obtener los elementos del formulario
const form = document.querySelector('form');
const precioInput = document.getElementById('Precio');
const nombreInput = document.getElementById('nombre');
const calificacionInput = document.getElementById('calificacion');

// Manejar el evento de envío del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que se recargue la página al enviar el formulario
  
  // Obtener los valores de entrada del usuario
  const precioFiltro = parseFloat(precioInput.value);
  const nombreFiltro = nombreInput.value.toLowerCase();
  const calificacionFiltro = parseInt(calificacionInput.value);

  // Filtrar los videojuegos basados en los criterios
    const videojuegosFiltrados = VideojuegoList.filter(function (videojuego) {
    const cumplePrecio = isNaN(precioFiltro) || videojuego.precio <= precioFiltro;
    const cumpleNombre = videojuego.titulo.toLowerCase().includes(nombreFiltro);
    const cumpleCalificacion = isNaN(calificacionFiltro) || videojuego.calificacion.toLowerCase().includes(calificacionFiltro.toString());
    
    return cumplePrecio && cumpleNombre && cumpleCalificacion;
  });

  // Mostrar los videojuegos filtrados en la tabla
  displayTable(videojuegosFiltrados);
});

// Manejar el evento de restablecimiento del formulario
document.getElementById('restablecer').addEventListener('click', function () {
  form.reset(); // Restablecer el formulario
  displayTable(VideojuegoList); // Mostrar todos los videojuegos nuevamente
});