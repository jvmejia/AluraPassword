let cantidad_caracteres = document.getElementById("cantidad");
let contraseña_escrita = document.getElementById("contrasena");

const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minus = "abcdefghijklmnopqrstuvwxyz";
const nums = "1234567890";
const especiales = "!@#$%^&*";

function generar() {
  let numero_ingresado = parseInt(cantidad_caracteres.value);

  if (isNaN(numero_ingresado)) {
    alert(
      "Por favor, ingresa un valor válido para la longitud de la contraseña"
    );
    return;
  }
  if (numero_ingresado < 8) {
    alert("Tu contraseña debe de ser mayor a 8 caracteres");
    return;
  }

  let incluir_mayusculas = document.getElementById("mayusculas").checked;
  let incluir_minusculas = document.getElementById("minusculas").checked;
  let incluir_numeros = document.getElementById("numeros").checked;
  let incluir_especiales = document.getElementById("especiales").checked;
  let cadena_caracteres = "";

  if (incluir_mayusculas) cadena_caracteres += mayus;
  if (incluir_minusculas) cadena_caracteres += minus;
  if (incluir_numeros) cadena_caracteres += nums;
  if (incluir_especiales) cadena_caracteres += especiales;

  if (cadena_caracteres === "") {
    alert("Debes seleccionar al menos un tipo de carácter");
    return;
  }

  let contraseña = "";
  for (let i = 0; i < numero_ingresado; i++) {
    let posicion_aleatoria =
      cadena_caracteres[Math.floor(Math.random() * cadena_caracteres.length)];
    contraseña += posicion_aleatoria;
  }

  // Imprimir la contraseña en el campo correspondiente
  contraseña_escrita.value = contraseña;

  // Verificar la fortaleza de la contraseña
  verificar_fortaleza(contraseña);
}

function borrar() {
  contraseña_escrita.value = "";
}

function verificar_fortaleza(contraseña) {
  let tieneMayuscula = false;
  let tieneMinuscula = false;
  let tieneNumero = false;
  let tieneEspecial = false;

  for (let i = 0; i < contraseña.length; i++) {
    let char = contraseña[i];

    if (mayus.includes(char)) {
      tieneMayuscula = true;
    } else if (minus.includes(char)) {
      tieneMinuscula = true;
    } else if (nums.includes(char)) {
      tieneNumero = true;
    } else if (especiales.includes(char)) {
      tieneEspecial = true;
    }
  }

  let esFuerte =
    tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
  let mensaje = "La contraseña es débil porque le falta: ";

  if (!tieneMayuscula) mensaje += "\n- Al menos una letra mayúscula";
  if (!tieneMinuscula) mensaje += "\n- Al menos una letra minúscula";
  if (!tieneNumero) mensaje += "\n- Al menos un número";
  if (!tieneEspecial) mensaje += "\n- Al menos un carácter especial";

  if (esFuerte) {
    alert("La contraseña es fuerte");
  } else {
    alert(mensaje);
  }
}
