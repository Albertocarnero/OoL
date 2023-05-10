// Selecciona el formulario de donaciones
const form = document.querySelector('.formulario-donaciones');

// Agrega un evento de escucha para cuando se envía el formulario
form.addEventListener('submit', (event) => {
  // Cancela el envío del formulario por defecto
  event.preventDefault();

  // Obtiene los valores de los campos del formulario
  const nombre = document.querySelector('#nombre').value;
  const email = document.querySelector('#email').value;
  const cantidad = document.querySelector('#cantidad').value;

  // Valida que los campos estén completos
  if (!nombre || !email || !cantidad) {
    alert('Por favor, completa todos los campos del formulario.');
    return;
  }

  // Envía los datos al proveedor de pagos
  // (reemplaza la URL con la URL del proveedor de pagos que estás usando)
  const url = 'https://proveedordepagos.com/donar';
  const data = {
    nombre: nombre,
    email: email,
    cantidad: cantidad
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ha ocurrido un error al procesar el pago.');
    }
    alert('¡Gracias por tu donación!');
    form.reset();
  })
  .catch(error => {
    alert(error.message);
  });
});
