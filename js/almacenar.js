// Objetivos de Aprendizaje
// Aprender el uso de JSON.stringify para convertir un array en una cadena JSON y JSON.parse para convertir la cadena JSON que representa una lista en un array. Esto es especialmente útil cuando queremos almacenar datos complejos de los usuarios, como objetos y sus propiedades o un arreglo (lista) de elementos.
// Aprender un uso avanzado de localStorage en combinación de cadenas JSON (recordar que el localStorage sólo almacena strings, por lo que no podemos almacenar arrays u objetos sin antes convertirlos a cadena JSON).
// Trabajar operaciones básicas de arreglos como añadir o quitar elementos. Esto es útil cuando trabajamos con listas que necesitamos que el usuario pueda agregar o quitar datos.
//  Pautas
// Adjunta encontrarán una página web cuyo objetivo es guardar un listado de los ítems agregados por el usuario en el almacenamiento local, y mostrarlos en una lista ya definida para ello.


// 1- Realicen las modificaciones necesarias para que, si hay contenido en el campo para añadir nuevos ítems, al pulsar el botón Agregar:

// Se agregue el nuevo ítem al listado guardado
// Se actualice la vista del listado
// Se limpie el campo para añadir nuevos ítems
// 2- Tener en cuenta que el contenido del listado (y su visualización) deben mantenerse aún cuando el navegador se cierre y se vuelva a abrir.

// 3- Realicen las modificaciones necesarias para que al pulsar el botón Limpiar:

// Se elimine el listado almacenado
// Se actualice la vista del listado (ahora vacío)


document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById('contenedor');
    const agregar = document.getElementById('agregar');
    const limpiar = document.getElementById('limpiar');
    const itemInput = document.getElementById('item');

    // Cargar el listado de ítems desde localStorage
    function cargarItems() {
        const storedItems = JSON.parse(localStorage.getItem("items")) || [];
        updateItemList(storedItems);
    }

    // Función para actualizar la lista visual
    function updateItemList(items) {
        contenedor.innerHTML = ''; // Limpiar el contenedor actual
        items.forEach(item => {
            agregarItemDOM(item); // Llamar a la función para agregar ítems al DOM
        });
    }
    
    function agregarItemDOM(item) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = item;
        contenedor.appendChild(li);
    }
    
    function agregarItem() {
        agregar.addEventListener("click", () => {
            const nuevoItem = itemInput.value.trim(); // Obtener y limpiar el valor del campo de entrada
            if (nuevoItem) {
                const storedItems = JSON.parse(localStorage.getItem("items")) || [];
                storedItems.push(nuevoItem);
                localStorage.setItem("items", JSON.stringify(storedItems));

                updateItemList(storedItems);
                itemInput.value = ''; // Limpiar el campo de entrada
            }
        });
    }
    
    function limpiarItems() {
        limpiar.addEventListener('click', () => {
            localStorage.removeItem('items'); // Eliminar el ítem correcto del localStorage
            contenedor.innerHTML = ''; // Vaciar el contenedor
        });
    }

    cargarItems();
    agregarItem();
    limpiarItems();
});
