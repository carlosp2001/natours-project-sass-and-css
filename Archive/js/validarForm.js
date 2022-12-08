function validarForm() {
	let nombre = document.getElementById("name").value;
	let mensaje = document.getElementById("message").value;

	if (nombre === undefined || nombre === "") {
		let error_mensaje = document.getElementById("error_nombre");
		error_mensaje.style.display = "block";
		error_mensaje.textContent = "El nombre no puede estar vacio";
	} else if (nombre.match("^[a-zA-Z ]+$") === null) {
		let error_mensaje = document.getElementById("error_nombre");
		error_mensaje.style.display = "block";
		error_mensaje.textContent = "El nombre no puede contener números";
	} else if (mensaje === undefined || mensaje === "") document.getElementById("error_mensaje").style.display = "block";
	else {
		document.getElementById("error_nombre").style.display = "none";
		document.getElementById("error_mensaje").style.display = "none";
	}
}
