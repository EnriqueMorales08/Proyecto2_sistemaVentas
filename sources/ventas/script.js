class Venta {
    constructor(id, cliente, telefono, juego, vendedor, fechaVenta, precioVenta) {
        this.id = id;
        this.cliente = cliente;
        this.telefono = telefono;
        this.juego = juego;
        this.vendedor = vendedor;
        this.fechaVenta = fechaVenta;
        this.precioVenta = precioVenta;
    }
}

let ventas = []; // Variable para almacenar las ventas

function displayVentasTable(ventas) {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';

    if (ventas.length === 0) {
        const messageNotFound = document.getElementById('message-not-found');
        messageNotFound.style.display = 'block';
    } else {
        const messageNotFound = document.getElementById('message-not-found');
        messageNotFound.style.display = 'none';

        ventas.forEach(venta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${venta.id}</td>
                <td>${venta.cliente}</td>
                <td>${venta.telefono}</td>
                <td>${venta.juego}</td>
                <td>${venta.vendedor}</td>
                <td>${venta.fechaVenta}</td>
                <td>${formatPrice(venta.precioVenta)}</td>
                <td><button class="delete-button" data-id="${venta.id}">Eliminar</button></td>
            `;

            tableBody.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteVenta);
        });
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

function deleteVenta(event) {
    const ventaId = event.target.getAttribute('data-id');

    const confirmarEliminar = confirm('¿Estás seguro de que deseas eliminar esta venta?');

    if (!confirmarEliminar) {
        return;
    }

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(`https://652e341df9afa8ef4b2832bb.mockapi.io/api/v1/Ventas/${ventaId}`, requestOptions)
        .then(response => {
            if (response.ok) {
                console.log('Venta eliminada con éxito.');
                searchData();
            } else {
                console.error('Error al eliminar la venta.');
                alert('Ocurrió un error al eliminar la venta. Por favor, inténtalo de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error al eliminar la venta:', error);
            alert('Ocurrió un error al eliminar la venta. Por favor, inténtalo de nuevo.');
        });
}

function searchData() {
    const OPTIONS = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    fetch('https://652e341df9afa8ef4b2832bb.mockapi.io/api/v1/Ventas', OPTIONS)
        .then(response => response.json())
        .then(data => {
            ventas = data.map(item => {
                return new Venta(
                    item.id,
                    item.Cliente,
                    item.Telefono,
                    item.Juego,
                    item.Vendedor,
                    item.FechaVenta,
                    parseFloat(item.PrecioVenta)
                );
            });
            displayVentasTable(ventas);
        })
        .catch(error => {
            console.log(error);
        });
}

searchData();
document.addEventListener('DOMContentLoaded', function () {
    const btnAgregarVenta = document.getElementById('nueva_venta');
    const formularioAgregarVenta = document.getElementById('formulario-agregar-venta');
    const btnCancelarVenta = document.getElementById('cancelar-venta');
    // Manejar el evento clic en el botón "Agregar nueva venta"
    btnAgregarVenta.addEventListener('click', function () {
        formularioAgregarVenta.style.display = 'flex';
    });
    btnCancelarVenta.addEventListener('click', function () {
        formularioAgregarVenta.style.display = 'none';
        document.getElementById('formulario-venta').reset();
    });

    // Manejar el evento clic en el botón "Guardar Venta"
    const btnGuardarVenta = document.getElementById('guardar-venta');
    btnGuardarVenta.addEventListener('click', function () {
        // Obtener los valores del formulario
        const clienteInput = document.getElementById('cliente');
        const telefonoInput = document.getElementById('telefono');
        const juegoInput = document.getElementById('juego');
        const vendedorInput = document.getElementById('vendedor');
        const fechaVentaInput = document.getElementById('fecha-venta');
        const precioVentaInput = document.getElementById('precio-venta');

        const cliente = clienteInput.value;
        const telefono = telefonoInput.value;
        const juego = juegoInput.value;
        const vendedor = vendedorInput.value;
        const fechaVenta = fechaVentaInput.value;
        const precioVenta = parseFloat(precioVentaInput.value);

        // Validar que se hayan ingresado los datos
        if (!cliente || !telefono || !juego || !vendedor || !fechaVenta || isNaN(precioVenta)) {
            alert('Por favor, complete todos los campos del formulario y asegúrese de que el precio sea un número válido.');
            return;
        }

        // Crear un objeto con los datos de la venta
        const nuevaVenta = new Venta(
            null, // El ID se asignará automáticamente por la API
            cliente,
            telefono,
            juego,
            vendedor,
            fechaVenta,
            precioVenta
        );

        // Realizar una solicitud POST a la API
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaVenta),
        };

        fetch('https://652e341df9afa8ef4b2832bb.mockapi.io/api/v1/Ventas', requestOptions)
            .then(response => response.json())
            .then(data => {
                // Aquí podrías manejar la respuesta de la API o realizar acciones adicionales si es necesario
                console.log('Venta agregada:', data);

                // Insertar los datos de la venta en la tabla
                insertarVentaEnTabla(data);

                // Restablecer el formulario
                formularioAgregarVenta.style.display = 'none';
                document.getElementById('formulario-venta').reset();
            })
            .catch(error => {
                console.error('Error al agregar la venta:', error);
                alert('Ocurrió un error al agregar la venta. Por favor, inténtalo de nuevo.');
            });
    });

    // Función para insertar los datos de la venta en la tabla
    function insertarVentaEnTabla(venta) {
        // Crear una instancia de Venta con los datos de la API
        const nuevaVenta = new Venta(
            venta.id,
            venta.cliente,
            venta.telefono,
            venta.juego,
            venta.vendedor,
            venta.fechaVenta,
            parseFloat(venta.precioVenta)
        );

        // Agregar la venta a la lista actual de ventas
        ventas.push(nuevaVenta);

        // Mostrar la venta en la tabla
        const tablaBody = document.getElementById('data-table-body');
        const newRow = tablaBody.insertRow();

        newRow.innerHTML = `
            <td>${nuevaVenta.id}</td>
            <td>${nuevaVenta.cliente}</td>
            <td>${nuevaVenta.telefono}</td>
            <td>${nuevaVenta.juego}</td>
            <td>${nuevaVenta.vendedor}</td>
            <td>${nuevaVenta.fechaVenta}</td>
            <td>${formatPrice(nuevaVenta.precioVenta)}</td>
            <td><button class="delete-button" data-id="${nuevaVenta.id}">Eliminar</button></td>
        `;

        // Agregar manejador de eventos para el botón de eliminar
        newRow.querySelector('.delete-button').addEventListener('click', deleteVenta);
    }
});


// Obtener los elementos del formulario de filtro
const filtrarButton = document.getElementById('filtrar_ventas');
const restablecerButton = document.getElementById('restablecer_ventas');

filtrarButton.addEventListener('click', function () {
    // Obtener los valores de los campos de filtro
    const precioFiltro = parseFloat(document.getElementById('Precio').value);
    const nombreJuegoFiltro = document.getElementById('nombre').value.toLowerCase();
    const nombreVendedorFiltro = document.getElementById('nombre_vendedor').value.toLowerCase();
    const fechaVentaFiltro = document.getElementById('fecha_venta').value;

    // Filtrar las ventas según los criterios
    const ventasFiltradas = ventas.filter(venta => {
        const cumplePrecio = isNaN(precioFiltro) || parseFloat(venta.precioVenta) === precioFiltro;
        const cumpleNombreJuego = nombreJuegoFiltro === '' || venta.juego.toLowerCase().includes(nombreJuegoFiltro);
        const cumpleNombreVendedor = nombreVendedorFiltro === '' || venta.vendedor.toLowerCase().includes(nombreVendedorFiltro);
        const cumpleFechaVenta = fechaVentaFiltro === '' || venta.fechaVenta === fechaVentaFiltro;

        return cumplePrecio && cumpleNombreJuego && cumpleNombreVendedor && cumpleFechaVenta;
    });

    // Mostrar las ventas filtradas en la tabla
    displayVentasTable(ventasFiltradas);
});

restablecerButton.addEventListener('click', function () {
    // Restablecer el formulario
    document.querySelector('form').reset();

    // Mostrar todas las ventas nuevamente
    displayVentasTable(ventas);
});