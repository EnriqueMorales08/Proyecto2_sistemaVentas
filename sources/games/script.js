class Videojuego {
  constructor(id, img, titulo, plataforma, description, precio, calificacion) {
    this.id = id;
    this.img = img;
    this.titulo = titulo;
    this.plataforma = plataforma;
    this.description = description;
    this.precio = precio;
    this.calificacion = calificacion;
  }
}

let VideojuegoList = [];

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
          <td>${game.calificacion}
          <div class="star-rating">
          ${getStarRatingHtml(game.calificacion)}
          </div>
          </td>
        `;

        tablaBody.appendChild(row);
      });
    }
  }, 2000);
}

function getStarRatingHtml(calificacion) {
  const starCount = parseInt(calificacion);
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= starCount) {
      starsHtml += '<span class="star">&#9733;</span>';
    } else {
      starsHtml += '<span class="star">&#9734;</span>';
    }
  }
  return starsHtml;
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
  messageNotFound.innerHTML = 'No se encontraron juegos con el filtro proporcionado.';
  messageNotFound.style.display = 'block';
}

function hideMessage() {
  const messageNotFound = document.getElementById('message-not-found');
  messageNotFound.style.display = 'none';
}

function searchData() {
  const OPTIONS = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };

  fetch('https://652e341df9afa8ef4b2832bb.mockapi.io/api/v1/Juegos', OPTIONS)
    .then(response => response.json())
    .then(data => {
      VideojuegoList = data.map(item => {
        return new Videojuego(
          item.id,
          item.img,
          item.titulo,
          item.plataforma,
          item.description,
          item.precio,
          item.calificacion
        );
      });
      displayTable(VideojuegoList);
    })
    .catch(error => console.log(error));
}

searchData();

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