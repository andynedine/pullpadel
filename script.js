document.addEventListener("DOMContentLoaded", () => {
    const editContainer = document.getElementById("edit-tags-container");
    const editInput = document.getElementById("edit-input");
    const btnGuardar = document.getElementById("guardar-jugadores");
    const btnEditar = document.getElementById("editar-jugadores");
    const personasContainer = document.getElementById("personas");
    const seleccionadosContainer = document.getElementById("seleccionados");
    const contadorSeleccionados = document.getElementById("contador");
    const pistasContainer = document.getElementById("pistas");
    const resultsContainer = document.getElementById("results");
    const selectionArea = document.getElementById("selection-area");
    const toggleSelection = document.getElementById("toggle-selection");
    const inputNumPistas = document.getElementById("num-pistas");
    const btnGenerar = document.getElementById("generar");
    const editArea = document.getElementById("edit-area");

    let jugadoresEditables = [];
    let seleccionados = [];

    // 📌 Seleccionar automáticamente todo el valor al hacer clic
    inputNumPistas.addEventListener("focus", function() {
        this.select();
    });

    // 📌 También seleccionar si el usuario toca el campo en dispositivos móviles
    inputNumPistas.addEventListener("mouseup", function(event) {
        event.preventDefault(); // Evita que se deseleccione al soltar el clic
        this.select();
    });

    // 📌 Alternar visibilidad entre Selección de Jugadores y Resultados
    toggleSelection.addEventListener("click", () => {
        if (selectionArea.classList.contains("hidden")) {
            selectionArea.classList.remove("hidden");
            resultsContainer.classList.add("hidden");
        } else {
            selectionArea.classList.add("hidden");
            resultsContainer.classList.remove("hidden");
        }
    });

    // 📌 Función para establecer cookies (soporte para localhost)
    function setCookie(nombre, valor, dias) {
        let fecha = new Date();
        fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
        let expira = `;expires=${fecha.toUTCString()}`;
        //document.cookie = `${nombre}=${encodeURIComponent(JSON.stringify(valor))};${expira};path=/;SameSite=Lax`;
        document.cookie = nombre + "=" + (encodeURIComponent(JSON.stringify(valor)) || "") + expira + "; path=/;SameSite=Lax";
        getCookie(nombre);
    }

    // 📌 Función para obtener cookies
    function getCookie(nombre) {
        let cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            let [clave, valor] = cookies[i].split("=");
            if (clave === nombre) {
                return JSON.parse(decodeURIComponent(valor));
            }
        }
        return null;
    }

    // 📌 Verificar si hay jugadores guardados en cookies al cargar
    function verificarCookies() {
        let jugadoresGuardados = getCookie("jugadores");
        if (jugadoresGuardados && jugadoresGuardados.length > 0) {
            jugadoresEditables = jugadoresGuardados;
            btnEditar.textContent = "✝︝ Editar";
        } else {
            btnEditar.textContent = "➕ Crear";
        }
        renderTags();
        renderizarPersonas();
    }

    // 📌 Renderizar etiquetas en la edición
    function renderTags() {
        editContainer.innerHTML = "";
        jugadoresEditables.forEach((nombre, index) => {
            let tag = document.createElement("div");
            tag.classList.add("tag");
            tag.textContent = nombre;

            let removeBtn = document.createElement("button");
            removeBtn.textContent = "✖";
            removeBtn.classList.add("remove");
            removeBtn.addEventListener("click", () => eliminarTag(index));

            tag.appendChild(removeBtn);
            editContainer.appendChild(tag);
        });

        editContainer.appendChild(editInput);
        editInput.focus();
    }

    // 📌 Eliminar un jugador de la edición y la selección
    function eliminarTag(index) {
        let eliminado = jugadoresEditables[index];
        seleccionados = seleccionados.filter(jugador => jugador !== eliminado);
        actualizarSeleccionados();
        jugadoresEditables.splice(index, 1);
        renderTags();
    }

    // 📌 Manejo de entrada para crear etiquetas
    editInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            let nombre = editInput.value.trim();
            if (nombre && !jugadoresEditables.includes(nombre)) {
                jugadoresEditables.push(nombre);
                editInput.value = "";
                renderTags();
            }
        }
    });

    // 📌 Renderizar la lista de jugadores disponibles
    function renderizarPersonas() {
        personasContainer.innerHTML = "";
        jugadoresEditables.forEach(persona => {
            let div = document.createElement("div");
            div.textContent = persona;
            div.classList.add("player-item");

            if (seleccionados.includes(persona)) {
                div.classList.add("selected-highlight");
            }

            div.addEventListener("click", () => seleccionarPersona(persona, div));
            personasContainer.appendChild(div);
        });
    }

    // 📌 Seleccionar un jugador
    function seleccionarPersona(persona, div) {
        if (!seleccionados.includes(persona)) {
            seleccionados.push(persona);
            let seleccionadoItem = document.createElement("div");
            seleccionadoItem.textContent = persona;
            seleccionadoItem.classList.add("selected-player");
            seleccionadoItem.addEventListener("click", () => deseleccionarPersona(persona, seleccionadoItem));
            seleccionadosContainer.appendChild(seleccionadoItem);

            div.classList.add("selected-highlight");
            actualizarContador();
        }
    }

    // 📌 Deseleccionar un jugador
    function deseleccionarPersona(persona, div) {
        seleccionados = seleccionados.filter(p => p !== persona);
        div.remove();
        actualizarContador();

        let jugadores = personasContainer.querySelectorAll(".player-item");
        jugadores.forEach(jugador => {
            if (jugador.textContent === persona) {
                jugador.classList.remove("selected-highlight");
            }
        });
    }

    // 📌 Actualizar la lista de jugadores seleccionados
    function actualizarSeleccionados() {
        seleccionadosContainer.innerHTML = "";
        seleccionados.forEach(persona => {
            let seleccionadoItem = document.createElement("div");
            seleccionadoItem.textContent = persona;
            seleccionadoItem.classList.add("selected-player");
            seleccionadoItem.addEventListener("click", () => deseleccionarPersona(persona, seleccionadoItem));
            seleccionadosContainer.appendChild(seleccionadoItem);
        });
        actualizarContador();
    }

    // 📌 Actualizar contador de jugadores seleccionados
    function actualizarContador() {
        contadorSeleccionados.textContent = seleccionados.length;
    }

    // 📌 Guardar edición y actualizar cookies
    function guardarEdicion() {
        setCookie("jugadores", jugadoresEditables, 180);
        btnGuardar.classList.add("hidden");
        btnEditar.classList.remove("hidden");
        editArea.classList.remove("edit-area");
        editArea.classList.add("hidden");
        renderizarPersonas();
        verificarCookies();
    }

    btnEditar.addEventListener("click", () => {
        btnEditar.classList.add("hidden");
        btnGuardar.classList.remove("hidden");
        editArea.classList.add("edit-area");
        editArea.classList.remove("hidden");
    });

    btnGuardar.addEventListener("click", guardarEdicion);

    // 📌 Función para emparejar jugadores y asignar a pistas
    function generarEmparejamientos() {
        pistasContainer.innerHTML = "";
        let numPistas = parseInt(inputNumPistas.value);
        let totalJugadoresNecesarios = numPistas * 4;

        if (seleccionados.length < totalJugadoresNecesarios) {
            alert(`⚠️ Debes seleccionar al menos ${totalJugadoresNecesarios} jugadores.`);
            return;
        }

        setCookie("jugadores", jugadoresEditables, 180);
        selectionArea.classList.add("hidden");
        resultsContainer.classList.remove("hidden");

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

    btnGenerar.addEventListener("click", generarEmparejamientos);
    verificarCookies();

    btnGenerar.addEventListener("click", generarEmparejamientos);
    verificarCookies();
});




/*
    
    // 📌 Seleccionar automáticamente todo el valor al hacer clic
    inputNumPistas.addEventListener("focus", function() {
        this.select();
    });

    // 📌 También seleccionar si el usuario toca el campo en dispositivos móviles
    inputNumPistas.addEventListener("mouseup", function(event) {
        event.preventDefault(); // Evita que se deseleccione al soltar el clic
        this.select();
    });
    

    // 📌 Inicializar la lista con algunos valores de ejemplo
    jugadoresEditables = [
        "Agu", "Alfredo", "Andy", "Antonio", "Antonio F", "Carlos", "Charly", 
        "Cuco", "Dani", "David", "Francis", "Hugo", "Javi A", "Javi G", "Javi P", 
        "Josemilio", "Juanma", "Juanma R", "Lobillo", "Pedro", "Rafael", "Raúl", 
        "Víctor", "Externo 1", "Externo 2", "Externo 3", "Externo 4"
    ];
*/