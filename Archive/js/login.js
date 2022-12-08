function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
  
let x = getCookie("usuario"); 
console.log(x);

document.getElementById('inicio-sesion').addEventListener('click', () => {
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    fetch("http://192.168.1.102:3002/rentaautos/usuarios/login", {
        // Adding method type
        method: "POST", // Adding body or contents to send
        body: JSON.stringify({
            usuario,
            password
        }), // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => { 
            console.log(data);
            if (data['estado'] == "correcto") {
                document.cookie = `usuario=${data['datos']['usuario']}; path=/; SameSite=None`;
                window.location.assign('http://127.0.0.1:5500/autosregistro.html')
            } else {
                alert("Ingresa datos válidos");
            }
        })
})


document.getElementById('registro').addEventListener('click', () => {
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    fetch("http://192.168.1.102:3002/rentaautos/usuarios/guardar", {
        // Adding method type
        method: "POST", // Adding body or contents to send
        body: JSON.stringify({
            usuario,
            password
        }), // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => { 
            console.log(data);
            if (data['estado'] == "correcto") {
                document.cookie = `usuario=${data['datos']['usuario']}; path=/; SameSite=None`;
                window.location.assign('http://127.0.0.1:5500/autosregistro.html')
            } else {
                alert("Ya existe ese usuario");
            }
        })
})

