document.addEventListener("DOMContentLoaded", () => {
    const listaPersonas = [
        "Agu", "Alfredo", "Andy", "Antonio", "Antonio F", "Carlos", "Charly", 
        "Cuco", "Dani", "David", "Francis", "Hugo", "Javi A", "Javi G", "Javi P", 
        "Josemilio", "Juanma", "Juanma R", "Lobillo", "Pedro", "Rafael", "Raúl", 
        "Víctor", "Externo 1", "Externo 2", "Externo 3", "Externo 4"
    ];

    const personasContainer = document.getElementById("personas");
    const seleccionadosContainer = document.getElementById("seleccionados");
    const pistasContainer = document.getElementById("pistas");
    const resultsContainer = document.getElementById("results");
    const inputNumPistas = document.getElementById("num-pistas");
    const btnGenerar = document.getElementById("generar");
    const contador = document.getElementById("contador");
    const selectionArea = document.getElementById("selection-area");
    const toggleSelection = document.getElementById("toggle-selection");

    let seleccionados = [];

    // 📌 Función para establecer cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
    }

    // 📌 Función para obtener cookies
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    // 📌 Cargar jugadores desde cookies si existen
    function cargarJugadoresDesdeCookies() {
        let jugadoresGuardados = getCookie("jugadores_padel");
        if (jugadoresGuardados) {
            seleccionados = jugadoresGuardados;
        }
        actualizarUI();
    }

    function renderizarPersonas() {
        personasContainer.innerHTML = "";
        listaPersonas.forEach(persona => {
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
            actualizarUI();
        }
    }

    function deseleccionarPersona(persona, div) {
        seleccionados = seleccionados.filter(p => p !== persona);
        div.remove();
        actualizarUI();
    }

    function actualizarUI() {
        contador.textContent = seleccionados.length;
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

        // 📌 Guardar jugadores en cookies (Expiración: 6 meses)
        setCookie("jugadores_padel", seleccionados, 180);

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

    // Mostrar las pistas al hacer click en "Emparejar"
    btnGenerar.addEventListener("click", generarEmparejamientos);

    // Alternar visibilidad entre Selección de Jugadores y Resultados
    toggleSelection.addEventListener("click", () => {
        if (selectionArea.classList.contains("hidden")) {
            selectionArea.classList.remove("hidden");
            resultsContainer.classList.add("hidden");
        } else {
            selectionArea.classList.add("hidden");
            resultsContainer.classList.remove("hidden");
        }
    });

    // Cargar jugadores al inicio desde cookies si existen
    cargarJugadoresDesdeCookies();
});
