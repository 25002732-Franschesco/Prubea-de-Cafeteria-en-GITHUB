class User {
    constructor(nombre, usuario, contraseña, rol, correo = "", telefono = "") {
        this.nombre = nombre;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        this.correo = correo;
        this.telefono = telefono;
    }
}

const usuariosIniciales = [
    new User("Carlos Ramírez", "admin", "admin123", "admin"),
    new User("Mariana Torres", "gerente", "gerente123", "gerente"),
    new User("Luis Hernández", "empleado", "empleado123", "empleado")
];

function obtenerRutaBase() {
    return window.location.pathname.includes("/html/") ? "../" : "./";
}

function irAInicio() {
    if (window.location.pathname.includes("/html/")) {
        window.location.href = "inicio.html";
    } else {
        window.location.href = "html/inicio.html";
    }
}

function inicializarUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (!usuarios) {
        usuarios = usuariosIniciales;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

function crearUsuario(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const contraseña = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(
        u => u.usuario.toLowerCase() === usuario.toLowerCase()
    );

    if (existe) {
        alert("Este nombre de usuario ya está registrado.");
        return;
    }

    const nuevoUsuario = new User(
        nombre,
        usuario,
        contraseña,
        "usuario",
        correo,
        telefono
    );

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente.");
    window.location.href = `${obtenerRutaBase()}index.html`;
}

function iniciarSesion(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
        u => u.usuario.toLowerCase() === usuario.toLowerCase()
        && u.contraseña === contraseña
    );

    if (usuarioEncontrado) {
        if (errorMsg) errorMsg.hidden = true;
        sessionStorage.setItem("sesionActiva", JSON.stringify(usuarioEncontrado));
        irAInicio();
    } else if (errorMsg) {
        errorMsg.hidden = false;
    }
}

function obtenerRol() {
    const sesion = JSON.parse(sessionStorage.getItem("sesionActiva"));
    return sesion ? sesion.rol : null;
}

function obtenerUsuarioSesion() {
    return JSON.parse(sessionStorage.getItem("sesionActiva"));
}

function saltarLoginSiAutenticado() {
    const sesion = sessionStorage.getItem("sesionActiva");
    if (sesion) {
        irAInicio();
    }
}

function cerrarSesion() {
    sessionStorage.removeItem("sesionActiva");
    window.location.href = `${obtenerRutaBase()}index.html`;
}

inicializarUsuarios();