"use strict";

const ordenar = function (idAuto) {
    window.location.assign(`http://127.0.0.1:5500/orden.html?idAuto=${idAuto}`);
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idAuto = urlParams.get("idAuto");

let precioAuto = 0;

fetch(`http://192.168.1.102:3002/rentaautos/auto/listaruno?idAuto=${idAuto}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        precioAuto = parseFloat(data[0]["precioxdia"]);
        console.log(precioAuto);
    });

const cambioDias = function () {
    const diasAlquiler = parseFloat(
        document.getElementsByClassName("dias-cantidad")[0].value
    );

    console.log(
        (document.getElementsByClassName("total-alquiler")[0].value = `${
            precioAuto * diasAlquiler
        } Lps`)
    );

    console.log("Cambio");
};

// Realizar pedido

document.getElementById("input-button").addEventListener("click", async () => {
    console.log("Hola");
    const identidadUsuario =
        document.getElementsByClassName("identidadUsuario")[0].value;
    const email = document.getElementsByClassName("emailUsuario")[0].value;
    const telefonoUsuario =
        document.getElementsByClassName("telefonoUsuario")[0].value;
    const idAuto = urlParams.get("idAuto");
    let d = new Date();
    
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    d.setDate(d.getDate() + parseInt(document.getElementsByClassName("dias-cantidad")[0].value));
    let day = d.getDate();
    const fechaEntrada = `${year}-${month}-${day}`; 
   
    console.log(fechaEntrada);

    fetch("http://192.168.1.102:3002/rentaautos/alquiler/guardar", {
        // Adding method type
        method: "POST", // Adding body or contents to send
        body: JSON.stringify({
            fechaEntrada,
            identidadUsuario,
            telefonoUsuario,
            email,
            idAuto
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
            if (data['estado'] == 'correcto') {
                document.getElementById('container').style.display = 'block';
                
            } else if (data['estado'] == 'precaucion') {

                document.getElementById('container-error').style.display = 'block';
                data['errores'].forEach(error => {

                    document.getElementById('list-errores').insertAdjacentHTML('afterbegin', `<li>${error['mensaje']}</li>`);
                });
                
            }
        })
});

document.getElementById('buttonConfirmModal').addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    window.location.assign('http://127.0.0.1:5500/index.html')
})

document.getElementById('buttonConfirmModalError').addEventListener('click', () => {
    document.getElementById('container-error').style.display = 'none';
    document.getElementById('list-errores').textContent = "";
})
