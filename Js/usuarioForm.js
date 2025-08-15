document.getElementById('usuarioForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const edad = document.getElementById('edad').value.trim();

  if (!nombre || !correo || !numero || !edad) {
    alert('Por favor, completa todos los campos antes de registrar.');
    return;
  }

  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  const d = new Date();
  const fechaRegistro = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  const data = { Nombre: nombre, Correo: correo, Numero: String(numero), Edad: String(edad), FechaRegistro: fechaRegistro };

  rtdb.ref('Usuarios').push(data)
    .then(() => {
      alert('Usuario registrado correctamente.');
      document.getElementById('usuarioForm').reset();
    })
    .catch((error) => {
      console.error('Error al registrar:', error);
      alert('Ocurrió un error al registrar. Revisa la consola.');
    });
});
