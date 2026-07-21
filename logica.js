// Esperar a que el documento HTML esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // Obtener referencias a los elementos del DOM (interfaz de usuario)
    const campoContrasenaEl = document.getElementById('password-display');
    const longitudMostradaEl = document.getElementById('length-val');
    const chkIncluirSimbolos = document.getElementById('chk-symbols');
    const chkIncluirNumeros = document.getElementById('chk-numbers');
    const chkIncluirMayusculas = document.getElementById('chk-upper');

    const btnGenerar = document.getElementById('btn-generate');
    const btnDescargar = document.getElementById('btn-download');
    const btnAumentar = document.getElementById('increase');
    const btnDisminuir = document.getElementById('decrease');
    const langSelect = document.getElementById('lang-select');
    const autorImgEl = document.getElementById('autor-img');

    // Variables iniciales: longitud por defecto y el idioma predeterminado
    let longitudContrasena = 16;
    let idiomaActual = 'es';

    // Definir los conjuntos de caracteres que se pueden usar para la contraseña
    const caracteresMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const caracteresMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const caracteresNumeros = "0123456789";
    const caracteresSimbolos = "/!@#$%^&*()_+-=[]{}|;:,.<>?ñÑ";

    // Diccionario con los textos de la interfaz para cada idioma soportado
    const traducciones = {
        'es': {
            'title': 'Generador de Contraseñas - Gabriel Plusx',
            'h1': 'GENERADOR DE<br>Contraseñas',
            'btn_generate': 'GENERAR',
            'length': 'LONGITUD:',
            'symbols': 'SÍMBOLOS',
            'numbers': 'NÚMEROS',
            'upper': 'MAYÚSCULAS',
            'btn_download': 'DESCARGAR<br>ARCHIVO',
            'alerta_vacio': '¡Oops! Debes seleccionar al menos una opción.',
            'alerta_descarga': 'Por favor, primero genera una contraseña válida. ¡No olvides tus claves!',
            'texto_archivo': 'Contraseña generada: {pwd}\n\nRecuerda usar claves de mínimo 12 caracteres para evitar ataques de fuerza bruta. ¡Tu seguridad es Amigo!',
            'imagen_autor': 'autor.png'
        },
        'en': {
            'title': 'Password Generator - Gabriel Plusx',
            'h1': 'PASSWORD<br>Generator',
            'btn_generate': 'GENERATE',
            'length': 'LENGTH:',
            'symbols': 'SYMBOLS',
            'numbers': 'NUMBERS',
            'upper': 'UPPERCASE',
            'btn_download': 'DOWNLOAD<br>FILE',
            'alerta_vacio': 'Oops! You must select at least one option.',
            'alerta_descarga': 'Please generate a valid password first. Do not forget your keys!',
            'texto_archivo': 'Generated password: {pwd}\n\nRemember to use passwords of at least 12 characters to prevent brute force attacks. Your security is first, friend!',
            'imagen_autor': 'autorusa.png'
        },
        'eo': {
            'title': 'Pasvortgenerilo - Gabriel Plusx',
            'h1': 'PASVORTO-<br>Generilo',
            'btn_generate': 'GENERI',
            'length': 'LONGECO:',
            'symbols': 'SIMBOLOJ',
            'numbers': 'NUMEROJ',
            'upper': 'MAJUSKLOJ',
            'btn_download': 'ELŜUTI<br>DOSIERON',
            'alerta_vacio': 'Ho! Vi devas elekti almenaŭ unu eblon.',
            'alerta_descarga': 'Bonvolu unue generi validan pasvorton. Ne forgesu viajn ŝlosilojn!',
            'texto_archivo': 'Generita pasvorto: {pwd}\n\nMemoru uzi pasvortojn de almenaŭ 12 signoj por malhelpi krudfortajn atakojn. Via sekureco estas unua, amiko!',
            'imagen_autor': 'esperanto.png'
        },
        'pt-br': {
            'title': 'Gerador de Senhas - Gabriel Plusx',
            'h1': 'GERADOR DE<br>Senhas',
            'btn_generate': 'GERAR',
            'length': 'TAMANHO:',
            'symbols': 'SÍMBOLOS',
            'numbers': 'NÚMEROS',
            'upper': 'MAIÚSCULAS',
            'btn_download': 'BAIXAR<br>ARQUIVO',
            'alerta_vacio': 'Ops! Você deve selecionar pelo menos uma opção.',
            'alerta_descarga': 'Por favor, gere uma senha válida primeiro. Não esqueça suas chaves!',
            'texto_archivo': 'Senha gerada: {pwd}\n\nLembre-se de usar senhas com pelo menos 12 caracteres para evitar ataques de força bruta. Sua segurança em primeiro lugar, amigo!',
            'imagen_autor': 'brasilautor.png'
        },
        'pt-pt': {
            'title': 'Gerador de Palavras-passe - Gabriel Plusx',
            'h1': 'GERADOR DE<br>Palavras-passe',
            'btn_generate': 'GERAR',
            'length': 'COMPRIMENTO:',
            'symbols': 'SÍMBOLOS',
            'numbers': 'NÚMEROS',
            'upper': 'MAIÚSCULAS',
            'btn_download': 'DESCARREGAR<br>FICHEIRO',
            'alerta_vacio': 'Oops! Deves selecionar pelo menos uma opção.',
            'alerta_descarga': 'Por favor, gera uma palavra-passe válida primeiro. Não te esqueças das tuas chaves!',
            'texto_archivo': 'Palavra-passe gerada: {pwd}\n\nLembra-te de usar palavras-passe com pelo menos 12 caracteres para evitar ataques de força bruta. A tua segurança em primeiro lugar, amigo!',
            'imagen_autor': 'portugalautor.png'
        },
        // Se agregó multiples traducciones.
        'de-ch': {
            'title': 'Passwort-Generator - Gabriel Plusx',
            'h1': 'PASSWORT<br>Generator',
            'btn_generate': 'GENERIERÄ',
            'length': 'LÄNGI:',
            'symbols': 'SYMBOLE',
            'numbers': 'ZAHLÄ',
            'upper': 'GROSSBUECHSTABE',
            'btn_download': 'DATEI<br>ABELADE',
            'alerta_vacio': 'Hoppla! Du muesch mindeschtens ei Option uswähle.',
            'alerta_descarga': 'Bitte generier zerscht es gültigs Passwort. Vergiss dini Passwörter nöd!',
            'texto_archivo': 'Generierts Passwort: {pwd}\n\nDänk dra, Passwörter mit mindeschtens 12 Zeiche z bruuche, um Brute-Force-Agriff z verhindere. Dini Sicherheit chunnt zerscht, Kolleg!',
            'imagen_autor': 'suiza.png'
        }
    };

    // Función para cambiar todos los textos de la interfaz según el idioma seleccionado
    function actualizarTextosIdioma() {
        // Buscar elementos que tengan el atributo 'data-i18n' y actualizar su contenido
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const clave = el.getAttribute('data-i18n');
            if (traducciones[idiomaActual][clave]) {
                el.innerHTML = traducciones[idiomaActual][clave];
            }
        });
        
        // Actualizar el título de la pestaña y el atributo lang de la página
        document.title = traducciones[idiomaActual]['title'];
        document.documentElement.lang = idiomaActual;
        
        // Actualizar la imagen del autor correspondiente al idioma seleccionado
        if (autorImgEl && traducciones[idiomaActual]['imagen_autor']) {
            autorImgEl.src = traducciones[idiomaActual]['imagen_autor'];
        }
    }

    // Evento que se dispara al cambiar la opción en el selector de idioma[cite: 1]
    langSelect.addEventListener('change', (e) => {
        idiomaActual = e.target.value;
        actualizarTextosIdioma();
        
        // Lista de posibles mensajes de error en todos los idiomas (se incluye 'Hoppla!')
        const mensajesError = ['¡Oops!', 'Oops!', 'Ho!', 'Ops!', 'Hoppla!'];
        const esMensajeError = mensajesError.some(msg => campoContrasenaEl.value.startsWith(msg));
        
        // Si hay un mensaje de error en pantalla, traducirlo al nuevo idioma
        if (esMensajeError) {
            campoContrasenaEl.value = traducciones[idiomaActual]['alerta_vacio'];
        }
    });

    // Función para mostrar la longitud numérica actual en la pantalla[cite: 1]
    function actualizarLongitud() {
        longitudMostradaEl.innerText = longitudContrasena;
    }

    // Evento para aumentar la longitud de la contraseña hasta un máximo de 30
    btnAumentar.addEventListener('click', () => {
        if (longitudContrasena < 30) {
            longitudContrasena++;
            actualizarLongitud();
        }
    });

    // Evento para disminuir la longitud de la contraseña hasta un mínimo de 5
    btnDisminuir.addEventListener('click', () => {
        if (longitudContrasena > 5) {
            longitudContrasena--;
            actualizarLongitud();
        }
    });

    // Función principal para generar una contraseña aleatoria[cite: 1]
    function generarContrasena() {
        let caracteresDisponibles = caracteresMinusculas; 

        // Agregar caracteres a la selección según las opciones marcadas en los checkboxes
        if (chkIncluirMayusculas.checked) caracteresDisponibles += caracteresMayusculas;
        if (chkIncluirNumeros.checked) caracteresDisponibles += caracteresNumeros;
        if (chkIncluirSimbolos.checked) caracteresDisponibles += caracteresSimbolos;

        // Si el usuario desmarca todas las casillas, se muestra una alerta
        if (caracteresDisponibles.length === 0) {
            campoContrasenaEl.value = traducciones[idiomaActual]['alerta_vacio'];
            return;
        }

        // Bucle para seleccionar caracteres aleatorios y armar la contraseña
        let contrasenaGenerada = "";
        for (let i = 0; i < longitudContrasena; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteresDisponibles.length);
            contrasenaGenerada += caracteresDisponibles[indiceAleatorio];
        }

        // Mostrar la contraseña en el campo de texto
        campoContrasenaEl.value = contrasenaGenerada;

        // Reiniciar y aplicar la animación de "destello" en el campo de texto
        campoContrasenaEl.classList.remove('password-flash');
        void campoContrasenaEl.offsetWidth; // Truco para forzar el redibujado en el navegador
        campoContrasenaEl.classList.add('password-flash');

        // Quitar la clase de animación después de 500ms
        setTimeout(() => {
            campoContrasenaEl.classList.remove('password-flash');
        }, 500);

        // Agregar efecto visual de "click" en el botón de generar
        btnGenerar.classList.add('pop');
        setTimeout(() => {
            btnGenerar.classList.remove('pop');
        }, 100);
    }

    // Ejecutar la función de generar contraseña al hacer click en el botón
    btnGenerar.addEventListener('click', generarContrasena);

    // Evento para descargar la contraseña como un archivo de texto
    btnDescargar.addEventListener('click', () => {
        const contrasena = campoContrasenaEl.value;
        const alertaVacio = traducciones[idiomaActual]['alerta_vacio'];

        // Validar que se haya generado una contraseña correcta antes de descargar
        if (!contrasena || contrasena === alertaVacio) {
            alert(traducciones[idiomaActual]['alerta_descarga']);
            return;
        }

        // Crear un elemento de ancla (link) de forma invisible
        const elementoDescarga = document.createElement('a');
        // Reemplazar la etiqueta {pwd} en el texto traducido con la contraseña real
        const contenidoArchivo = traducciones[idiomaActual]['texto_archivo'].replace('{pwd}', contrasena);

        // Configurar el archivo para su descarga con los datos codificados y su nombre
        elementoDescarga.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenidoArchivo));
        elementoDescarga.setAttribute('download', 'GabrielPlusx.txt');

        // Añadir el enlace al DOM, hacer clic automáticamente y luego eliminarlo
        elementoDescarga.style.display = 'none';
        document.body.appendChild(elementoDescarga);
        elementoDescarga.click();
        document.body.removeChild(elementoDescarga);
    });

    // Inicializar la interfaz con los valores por defecto al cargar
    actualizarLongitud();
    actualizarTextosIdioma();
    generarContrasena();
});

// El gato con capucha es la mascota de Gabrielplusx y sus codigos.
// O gato encapuzado é o animal de estimação de Gabriel Plusx e seus códigos.
//La kapuĉita kato estas la dorlotbesto de Gabriel Plusx kaj liaj kodoj.
//The hooded cat is the pet of Gabriel Plusx and his codes.
//Die Kapuzenkatze ist das Haustier von Gabriel Plusx und seinen Codes.
//O gato encapudo é o animal de estimação de Gabriel Plusx e dos seus códigos.
//蓋帽貓係 Gabriel plus 同佢嘅密碼嘅寵物。
