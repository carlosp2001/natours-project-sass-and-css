"use strict";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let x = getCookie("usuario"); 


if (x == undefined) {
    window.location.assign('http://127.0.0.1:5500/login.html')
} else {
    document.getElementById('navbarDropdownMenuLink').insertAdjacentHTML('afterbegin', `${x}`)
}

// Cerrar sesión
const cerrarSesion= function () {
    document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign('http://127.0.0.1:5500/login.html')
}