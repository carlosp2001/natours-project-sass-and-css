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

$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
            });
        } else {
            checkbox.each(function () {
                this.checked = false;
            });
        }
    });
    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });
});
$(".navbar-nav>li>a:not(.dropdown-toggle), .navbar-nav>li>div>a").on(
    "click",
    function () {
        $(".navbar-collapse").collapse("hide");
    }
);
$("#inputCheckIn").datepicker({
    uiLibrary: "bootstrap4",
});
$("#inputCheckOut").datepicker({
    uiLibrary: "bootstrap4",
});

document.getElementById("btn-agregar").addEventListener("click", () => {
    document.getElementById("addEmployeeModal").style.display = "block";
});

document.getElementById("close-addAuto").addEventListener("click", () => {
    document.getElementById("addEmployeeModal").style.display = "none";
    window.location.href = "http://127.0.0.1:5500/autosregistro.html";
});

// Agregar nuevo auto
document.getElementById("agregar-btn").addEventListener("click", () => {
    let marca = document.getElementById("marca-auto").value;
    let modelo = document.getElementById("modelo-auto").value;
    let year = document.getElementById("year-auto").value;
    let color = document.getElementById("color-auto").value;
    let asientos = document.getElementById("asientos-auto").value;
    let puertas = document.getElementById("puertas-auto").value;
    let motor = document.getElementById("motor-auto").value;
    let transmision = document.getElementById("transmision-select").value;
    let placa = document.getElementById("placa-auto").value;
    let tipo = document.getElementById("tipo-select").value;
    let precioxdia = document.getElementById("precio-auto").value;
    let idDistribuidor = document.getElementById("distribuidor-select").value;
    let idOficina = document.getElementById("oficina-select").value;
    console.log(
        marca,
        modelo,
        year,
        color,
        asientos,
        puertas,
        motor,
        transmision,
        placa,
        tipo,
        precioxdia,
        idDistribuidor,
        idOficina
    );
    const fileInput = document.getElementById("inputImage");

    if (fileInput.value.length < 1)
        console.log("Ingrese correctamente la imagen");
    else {
        fetch("http://192.168.1.102:3002/rentaautos/auto/guardar", {
            // Adding method type
            method: "POST", // Adding body or contents to send
            body: JSON.stringify({
                marca,
                modelo,
                anio: year,
                color,
                asientos,
                puertas,
                motor,
                transmision,
                placa,
                tipo,
                precioxdia,
                idDistribuidor,
                idOficina,
            }), // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data["estado"]);
                if (data["estado"] == "correcto") {
                    document.getElementById("addEmployeeModal").style.display =
                        "none";
                    fetch(
                        "http://192.168.1.102:3002/rentaautos/auto/listarultimo"
                    )
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            console.log(data[0]["id"]);
                            subirimagen(data[0]["id"]);
                        });
                    document.getElementsByClassName(
                        "popup-guardado"
                    )[0].style.display = "flex";
                } else if (data["estado"] == "precaucion") {
                    console.log(data['estado']);
                    const listErrores = document.getElementById("list-errores");
                    document.getElementById('popup-errores').style.display = 'flex';

                    data["errores"].forEach((error) => {
                        listErrores.insertAdjacentHTML(
                            "beforeend",
                            `<li>${error["mensaje"]}</li>`
                        );
                    });

                }
            });
    }
});

const subirimagen = function (id) {
    const fileInput = document.getElementById("inputImage");
    if (fileInput.value.length < 1)
        console.log("Ingrese correctamente la imagen");
    else {
        console.log(fileInput.files[0]);
        const datas = new FormData();
        datas.append("id", id);
        // datas.append('img', fileInput.files[0]);
        datas.append("img", fileInput.files[0]);
        const request = new XMLHttpRequest();
        request.open(
            "POST",
            "http://192.168.1.102:3002/rentaautos/archivos/auto/img"
        );
        request.send(datas);
    }
};

document.getElementById("cerrar-popup-save").addEventListener("click", () => {
    document.getElementsByClassName("popup-guardado")[0].style.display = "none";
    window.location.href = "http://127.0.0.1:5500/autosregistro.html";
});

// Eliminar auto
const eliminar = async function (idAuto) {
    console.log(idAuto);
    await fetch(
        `http://192.168.1.102:3002/rentaautos/auto/eliminar?idAuto=${idAuto}`,
        {
            method: "delete",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    )
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        });

    window.location.href = "http://127.0.0.1:5500/autosregistro.html";
};


// Cerrar popup errores
document.getElementById('cerrar-popup-errores').addEventListener('click', () => {
    document.getElementById('popup-errores').style.display = 'none';
})

