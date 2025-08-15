document.getElementById('usuarioForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const correo = document.getElementById('correo').value.trim();
  const edad = document.getElementById('edad').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const numero = document.getElementById('numero').value.trim();

  if (!correo || !edad || !nombre || !numero) {
    alert('Por favor, completa todos los campos antes de registrar.');
    return;
  }

  function pad(n){return n<10? '0'+n : ''+n;}
  const d = new Date();
  const fechaRegistro = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());

  const data = {
    Correo: correo,
    Edad: String(edad),
    FechaRegistro: fechaRegistro,
    Nombre: nombre,
    Numero: String(numero)
  };

  // Realtime Database: /Usuarios/<pushId>
  rtdb.ref('Usuarios').push(data)
    .then(() => {
      alert('Usuario registrado correctamente.');
      // opcional: limpiar formulario
      document.getElementById('usuarioForm').reset();
    })
    .catch((error) => {
      console.error('Error al registrar:', error);
      alert('Ocurrió un error al registrar. Revisa la consola.');
    });
});
