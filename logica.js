document.addEventListener('DOMContentLoaded', () => {

    //Hola amigo esta parte del codigo toma Referencias a los elementos del DOM 
    const campoContrasenaEl = document.getElementById('password-display');
    const longitudMostradaEl = document.getElementById('length-val');
    const chkIncluirSimbolos = document.getElementById('chk-symbols');
    const chkIncluirNumeros = document.getElementById('chk-numbers');
    const chkIncluirMayusculas = document.getElementById('chk-upper');

    const btnGenerar = document.getElementById('btn-generate');
    const btnDescargar = document.getElementById('btn-download');
    const btnAumentar = document.getElementById('increase');
    const btnDisminuir = document.getElementById('decrease');

    // Oye Amigo esto son los carracteres iniciales
    let longitudContrasena = 16;

    // Diccionarios de caracteres disponibles (¡si quieres agregar otro simbolo  modificalo!)
    const caracteresMinusculas = "abcdefghijklmnopqrstuvwxyz"; // Siempre activos por seguridad
    const caracteresMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const caracteresNumeros = "0123456789";
    const caracteresSimbolos = "/!@#$%^&*()_+-=[]{}|;:,.<>?ñÑ";

    // 1. Función para actualizar la longitud en pantalla amigo
    function actualizarLongitud() {
        longitudMostradaEl.innerText = longitudContrasena;
    }

    // Evento para subir la longitud: ¡más caracteres, más segura y confiable es!
    btnAumentar.addEventListener('click', () => {
        // Oye El límite máximo es 30 (no queremos una contraseña que sea mega infinita)
        if (longitudContrasena < 30) {
            longitudContrasena++;
            actualizarLongitud();
        }
    });

    // Evento para bajar la longitud: ¡cuidado con los mínimos!
    btnDisminuir.addEventListener('click', () => {
        // El límite mínimo es 5 (¡por debajo de 12 es muy inseguro!)
        if (longitudContrasena > 5) {
            longitudContrasena--;
            actualizarLongitud();
        }
    });

    // 2. Función ESTRELLA: Genera una contraseña súper segura
    function generarContrasena() {
        let caracteresDisponibles = caracteresMinusculas; // oye amigo la seguridad es primero

        if (chkIncluirMayusculas.checked) caracteresDisponibles += caracteresMayusculas;
        if (chkIncluirNumeros.checked) caracteresDisponibles += caracteresNumeros;
        if (chkIncluirSimbolos.checked) caracteresDisponibles += caracteresSimbolos;

        // Esto solo pasaría si el código se modificara, pero siempre prevenidos
        if (caracteresDisponibles.length === 0) {
            campoContrasenaEl.value = "¡Oops! Debes seleccionar al menos una opción.";
            return;
        }

        let contrasenaGenerada = "";
        for (let i = 0; i < longitudContrasena; i++) {
            // Elegimos un carácter al azar de nuestro arsenal
            const indiceAleatorio = Math.floor(Math.random() * caracteresDisponibles.length);
            contrasenaGenerada += caracteresDisponibles[indiceAleatorio];
        }

        campoContrasenaEl.value = contrasenaGenerada;

        // Pequeñas animaciones para avisar.
        // 1. Animación de "Flash" en el campo
        campoContrasenaEl.classList.remove('password-flash');
        // Pequeño truco para forzar el reinicio de la animación CSS
        void campoContrasenaEl.offsetWidth;
        campoContrasenaEl.classList.add('password-flash');

        // 2. Quitamos la clase de animación después de 0.5 segundos
        setTimeout(() => {
            campoContrasenaEl.classList.remove('password-flash');
        }, 500);

        // 3. Animación de "Pop" para el botón.
        btnGenerar.classList.add('pop');
        setTimeout(() => {
            btnGenerar.classList.remove('pop');
        }, 100);
        // --- Fin de animaciones ---
    }

    // Evento al hacer clic en el botón de Generar
    btnGenerar.addEventListener('click', generarContrasena);

    // 3. Función para descargar 
    btnDescargar.addEventListener('click', () => {
        const contrasena = campoContrasenaEl.value;

        // Comprobamos que haya una contraseña válida
        if (!contrasena || contrasena.startsWith("¡Oops!")) {
            alert("Por favor, primero genera una contraseña válida. ¡No olvides tus claves!");
            return;
        }

        // Creamos un enlace temporal amigo
        const elementoDescarga = document.createElement('a');
        const contenidoArchivo = "Contraseña generada: " + contrasena + "\n\nRecuerda usar claves de mínimo 12 caracteres para evitar ataques de fuerza bruta. ¡Tu seguridad es Amigo!";

        elementoDescarga.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenidoArchivo));
        elementoDescarga.setAttribute('download', 'GabrielPlusx.txt');

        elementoDescarga.style.display = 'none';
        document.body.appendChild(elementoDescarga);

        // Hacemos clic y eliminamos el enlace Amigo
        elementoDescarga.click();
        document.body.removeChild(elementoDescarga);
    });

    // Inicializamos todo al cargar la página: mostramos la longitud y generamos la primera clave.
    actualizarLongitud();
    generarContrasena();
});


//el gato con capucha es la mascota de Gabrielplusx y sus codigos.