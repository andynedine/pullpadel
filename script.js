document.addEventListener("DOMContentLoaded", () => {
    const listaPersonas = [
        "Agu", "Alfredo", "Andy", "Antonio", "Antonio F", "Carlos", "Charly", 
        "Cuco", "Dani", "David", "Francis", "Hugo", "Javi A", "Javi G", "Javi P", 
        "Josemilio", "Juanma", "Juanma R", "Lobillo", "Pedro", "Rafael", "Raúl", 
        "Víctor", "Externo 1", "Externo 2", "Externo 3", "Externo 4"
    ];

    const personasContainer = document.getElementById("personas");
    const seleccionadosContainer = document.getElementById("seleccionados");
    const editPersonasContainer = document.getElementById("edit-personas");
    const pistasContainer = document.getElementById("pistas");
    const resultsContainer = document.getElementById("results");
    const inputNumPistas = document.getElementById("num-pistas");
    const btnGenerar = document.getElementById("generar");
    const btnEditar = document.getElementById("editar-jugadores");
    const btnGuardar = document.getElementById("guardar-jugadores");
    const contador = document.getElementById("contador");
    const selectionArea = document.getElementById("selection-area");
    const editArea = document.getElementById("edit-area");
    const toggleSelection = document.getElementById("toggle-selection");


    // ✅ Seleccionar automáticamente todo el valor al hacer clic
    inputNumPistas.addEventListener("focus", function() {
        this.select();
    });

    // ✅ También seleccionar si el usuario toca el campo en dispositivos móviles
    inputNumPistas.addEventListener("mouseup", function(event) {
        event.preventDefault(); // Evita que se deseleccione al soltar el clic
        this.select();
    });
    
    toggleSelection.addEventListener("click", () => {
        if (selectionArea.classList.contains("hidden")) {
            // Mostrar la selección de jugadores y ocultar los resultados
            selectionArea.classList.remove("hidden");
            resultsContainer.classList.add("hidden");
        } else {
            // Ocultar la selección de jugadores y mostrar los resultados
            selectionArea.classList.add("hidden");
            resultsContainer.classList.remove("hidden");
        }
    });
    
    let seleccionados = [];
    let jugadoresEditables = [...listaPersonas];

    function renderizarPersonas() {
        personasContainer.innerHTML = "";
        jugadoresEditables.forEach(persona => {
            if (!seleccionados.includes(persona)) {
                let div = document.createElement("div");
                div.textContent = persona;
                div.addEventListener("click", () => seleccionarPersona(persona, div));
                personasContainer.appendChild(div);
            }
        });
    }

    function seleccionarPersona(persona, div) {
        if (!seleccionados.includes(persona)) {
            seleccionados.push(persona);
            let seleccionadoItem = document.createElement("div");
            seleccionadoItem.textContent = persona;
            seleccionadoItem.addEventListener("click", () => deseleccionarPersona(persona, seleccionadoItem));
            seleccionadosContainer.appendChild(seleccionadoItem);
            contador.textContent = seleccionados.length;
            renderizarPersonas();
        }
    }

    function deseleccionarPersona(persona, div) {
        seleccionados = seleccionados.filter(p => p !== persona);
        div.remove();
        contador.textContent = seleccionados.length;
        renderizarPersonas();
    }

    function renderizarEdicion() {
        editPersonasContainer.innerHTML = "";
        jugadoresEditables.forEach((persona, index) => {
            let input = document.createElement("input");
            input.type = "text";
            input.value = persona;
            input.dataset.index = index;
            editPersonasContainer.appendChild(input);
        });
    }

    function guardarEdicion() {
        const inputs = editPersonasContainer.querySelectorAll("input");
        jugadoresEditables = Array.from(inputs).map(input => input.value);

        // Volver a mostrar la selección de jugadores con los nombres editados
        editArea.classList.add("hidden");
        selectionArea.classList.remove("hidden");
        btnGuardar.classList.add("hidden");
        btnEditar.classList.remove("hidden");

        // Renderizar nuevamente los jugadores editados
        renderizarPersonas();
    }

    function generarEmparejamientos() {
        pistasContainer.innerHTML = "";
        let numPistas = parseInt(inputNumPistas.value);
        let totalJugadoresNecesarios = numPistas * 4;

        // 🚨 Validación: Si no hay suficientes jugadores, mostrar alerta y salir 🚨
        if (seleccionados.length < totalJugadoresNecesarios) {
            alert(`⚠️ Debes seleccionar al menos ${totalJugadoresNecesarios} jugadores para jugar en ${numPistas} pistas.`);
            return;
        }

        // Ocultar selección y mostrar emparejamientos
        selectionArea.classList.add("hidden");
        resultsContainer.classList.remove("hidden");

        // Mezclar jugadores aleatoriamente
        let seleccionadosShuffled = [...seleccionados].sort(() => Math.random() - 0.5);
        let parejas = [];

        for (let i = 0; i < totalJugadoresNecesarios / 2; i++) {
            parejas.push([seleccionadosShuffled.pop(), seleccionadosShuffled.pop()]);
        }

        for (let i = 0; i < numPistas; i++) {
            let pistaDiv = document.createElement("div");
            pistaDiv.classList.add("pista");
            pistaDiv.innerHTML = `<h3>🏟️ Pista ${i + 1}</h3>
                <p>👥 ${parejas[i * 2][0]} & ${parejas[i * 2][1]}</p>
                <p>👥 ${parejas[i * 2 + 1][0]} & ${parejas[i * 2 + 1][1]}</p>`;
            pistasContainer.appendChild(pistaDiv);
        }
    }

    btnEditar.addEventListener("click", () => {
        selectionArea.classList.add("hidden");
        editArea.classList.remove("hidden");
        btnEditar.classList.add("hidden");
        btnGuardar.classList.remove("hidden");
        renderizarEdicion();
    });

    btnGuardar.addEventListener("click", guardarEdicion);

    btnGenerar.addEventListener("click", generarEmparejamientos);

    renderizarPersonas();
});
