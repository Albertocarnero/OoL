// 1. Seleccionar elementos del DOM
const modoOscuroButton = document.querySelector('#modo-oscuro');
const cuerpo = document.querySelector('body');
const descripcion = document.querySelector('.texto-principal p');
const formularioContacto = document.querySelector('.formulario-contacto');
const formularioDonacion = document.querySelector('.formulario-donacion');
const formularioRegistro = document.querySelector('.formulario-registro');

// 2. Añadir listeners
modoOscuroButton.addEventListener('click', cambiarModo);
formularioContacto.addEventListener('submit', enviarFormularioContacto);
formularioDonacion.addEventListener('submit', enviarFormularioDonacion);
formularioRegistro.addEventListener('submit', enviarFormularioRegistro);

// 3. Función para cambiar el modo de la página
function cambiarModo() {
  cuerpo.classList.toggle('modo-oscuro');
}

// 4. Función para enviar el formulario de contacto
function enviarFormularioContacto(evento) {
  evento.preventDefault();
  const nombre = formularioContacto.querySelector('#nombre').value;
  const correo = formularioContacto.querySelector('#correo').value;
  const mensaje = formularioContacto.querySelector('#mensaje').value;
  const datos = {
    nombre,
    correo,
    mensaje
  };
  enviarAjax(datos, 'contacto');
}

// 5. Función para enviar el formulario de donación
function enviarFormularioDonacion(evento) {
  evento.preventDefault();
  const nombre = formularioDonacion.querySelector('#nombre').value;
  const correo = formularioDonacion.querySelector('#correo').value;
  const monto = formularioDonacion.querySelector('#monto').value;
  const datos = {
    nombre,
    correo,
    monto
  };
  enviarAjax(datos, 'donacion');
}

// 6. Función para enviar el formulario de registro
function enviarFormularioRegistro(evento) {
  evento.preventDefault();
  const nombre = formularioRegistro.querySelector('#nombre').value;
  const correo = formularioRegistro.querySelector('#correo').value;
  const password = formularioRegistro.querySelector('#password').value;
  const datos = {
    nombre,
    correo,
    password
  };
  enviarAjax(datos, 'registro');
}

// 7. Validar formulario
function validarFormulario(nombre, correo, password) {
  if (!nombre || !correo || !password) {
    alert('Por favor, rellena todos los campos.');
    return false;
  }
  if (password.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return false;
  }
  return true;
}

// 8. Función para enviar datos con AJAX
function enviarAjax(datos, tipo) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `procesar_${tipo}.php`, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      alert(xhr.responseText);
      formularioContacto.reset();
      formularioDonacion.reset();
      formularioRegistro.reset();
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  const parametros = new URLSearchParams(datos).toString();
  xhr.send(parametros);
}
