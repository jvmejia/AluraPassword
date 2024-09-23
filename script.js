let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcion = [];
let posicionActual = -1;
//Funcion se invoca al momento que el usuario haga clic en el boton
function clickBoton() {
	let nombreGasto = document.getElementById("nombreGasto").value;
	let valorGasto = document.getElementById("valorGasto").value;
	let descripcion = document.getElementById("desc").value;
	let boton = document.getElementById("botonFormulario");

	if (nombreGasto === "" || valorGasto === "" || descripcion === "") {
		alert("Por favor, rellena los campos antes de continuar");
		return;
	}

	if (posicionActual !== -1) {
		listaNombresGastos[posicionActual] = nombreGasto;
		listaValoresGastos[posicionActual] = valorGasto;
		listaDescripcion[posicionActual] = descripcion;

		posicionActual = -1;

		boton.textContent = "Agregar Gasto";
	} else {
		listaNombresGastos.push(nombreGasto);
		listaValoresGastos.push(valorGasto);
		listaDescripcion.push(descripcion);
	}

	if (valorGasto > 150) {
		alert("Cuidado!, tienes un gasto mayor a 150");
	}
	actualizarListaDeGastos();
}

function actualizarListaDeGastos() {
	const listaElementos = document.getElementById("listaDeGastos");
	const sumaGastos = document.getElementById("totalGastos");
	let htmlLista = "";
	let totalGastos = 0;
	listaNombresGastos.forEach((elemento, posicion) => {
		const valorGasto = Number(listaValoresGastos[posicion]);
		const descripcion = listaDescripcion[posicion];
		htmlLista += `<li> ${elemento} - $${valorGasto.toFixed(2)}USD - ${descripcion}
                    <button class ="imagen-borrar" onclick="eliminarGasto(${posicion});"></button>
                    <button class = "imagen-editar"onclick="editarGasto(${posicion});"></button>

        </li>`;

		//Calculamos el total de gastos
		totalGastos += Number(valorGasto);
		console.log(totalGastos);
	});
	listaElementos.innerHTML = htmlLista;
	sumaGastos.innerHTML = totalGastos.toFixed(2);
	limpiar();
	//console.log(htmlLista);
}

function limpiar() {
	document.getElementById("nombreGasto").value = "";
	document.getElementById("valorGasto").value = "";
	document.getElementById("desc").value = "";
}

function eliminarGasto(posicion) {
	listaNombresGastos.splice(posicion, 1);
	listaValoresGastos.splice(posicion, 1);
	listaDescripcion.splice(posicion, 1);
	actualizarListaDeGastos();
}

function editarGasto(posicion) {
	document.getElementById("nombreGasto").value = listaNombresGastos[posicion];
	document.getElementById("valorGasto").value = listaValoresGastos[posicion];
	document.getElementById("desc").value = listaDescripcion[posicion];

	posicionActual = posicion;

	let boton = document.getElementById("botonFormulario");
	boton.textContent = "Editar Gasto";
}
