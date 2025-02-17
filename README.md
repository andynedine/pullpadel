# PullPadel - Generador de Emparejamientos para Pádel 🎾

PullPadel es una aplicación web interactiva para organizar partidas de pádel. 
Permite seleccionar jugadores y generar automáticamente emparejamientos en función del número de pistas disponibles. 
La interfaz es totalmente **responsiva**, con una distribución optimizada para móviles y escritorio.

---

## 🚀 Características
✅ **Selección Dinámica de Jugadores** - Permite seleccionar y deseleccionar jugadores fácilmente.  
✅ **Emparejamiento Automático** - Asigna jugadores a parejas y los distribuye en pistas.  
✅ **Validación de Jugadores** - Si hay menos jugadores de los necesarios, muestra un mensaje de error.  
✅ **Diseño Responsivo** - La interfaz se adapta a cualquier dispositivo.  
✅ **Interfaz Moderna y Clara** - Colores atractivos y elementos bien organizados.  
✅ **Cambio Dinámico de Capas** - La selección de jugadores y la lista de emparejamientos no se muestran simultáneamente para una mayor claridad de uso.  

---

## 🎥 Demo en Vivo
🔗 [Ver en GitHub Pages](https://andynedine.github.io/pullpadel/)  

---

## 📂 Estructura del Proyecto
```
/pullpadel
│── index.html          # Página principal
│── styles.css          # Estilos CSS completos
│── script.js           # Lógica de emparejamiento
│── padel.png           # Imagen de pista de pádel
│── favicon.ico         # Favicon con escudo de los Jabatos (padel team)
│── README.md           # Documentación del proyecto
```

---

## 📜 Instalación y Uso
### 1️⃣ Clonar el Repositorio
```sh
git clone https://github.com/andynedine/pullpadel.git
cd pullpadel
```

### 2️⃣ Abrir el Proyecto
Abre el archivo `index.html` en tu navegador o usa VS Code con Live Server.

---

## 🎨 Diseño Responsivo
📱 **Móviles**  
- Imagen de pistas alineada a la izquierda.  
- Botones e inputs ajustados al tamaño de la pantalla.  

💻 **Escritorio**  
- Imagen de pistas pegada a la derecha del todo.  
- Espaciado optimizado para mejor legibilidad.  

---

## 🛠 Tecnologías Utilizadas
- **HTML5** - Estructura del sitio.  
- **CSS3** - Estilos y diseño responsivo.  
- **JavaScript** - Lógica de emparejamiento y manipulación del DOM.  

---

## 📜 Funcionamiento del Código
1️⃣ **Seleccionar jugadores** → Los jugadores se añaden desde la lista.  
2️⃣ **Definir pistas** → Se indica cuántas pistas de pádel se usarán.  
3️⃣ **Emparejar** → Se generan los equipos y se asignan a cada pista.  
4️⃣ **Ver Resultados** → Se oculta la selección y se muestran los emparejamientos.  
5️⃣ **Editar Selección** → Se puede cambiar la lista de jugadores en cualquier momento.  

---

## 🛠 Mejoras Futuras
🔹 Opción para guardar y reutilizar listas de jugadores.  
🔹 Posibilidad de generar diferentes combinaciones de parejas. 
🔹 Emparejar jugadores según la posición natural de cada uno en la pista (drive o revés).  
🔹 Soporte para diferentes formatos de torneo.  
🔹 Integración con una API para compartir resultados.  

---

## 🏆 Autor
📌 **Creado por:** [Andy Wandy / andynedine](https://github.com/andynedine)  
📧 **Contacto:** yinyan.developer@gmail.com  

---

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**. Puedes modificar y distribuir libremente el código.

---

🚀 **¡Gracias por usar PullPadel!** 🎾  
Si te gustó el proyecto, ¡dale una ⭐ en GitHub! 😃  
🔗 [Repositorio en GitHub](https://github.com/andynedine/pullpadel)  
