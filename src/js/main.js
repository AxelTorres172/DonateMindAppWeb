let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene que se muestre el prompt automáticamente
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'inline-block';

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none'; // Oculta el botón
      deferredPrompt.prompt(); // Muestra el prompt de instalación

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Instalación aceptada');
        } else {
          console.log('Instalación rechazada');
        }
        deferredPrompt = null;
      });
    });
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado ✔️', reg))
      .catch(err => console.warn('Error al registrar Service Worker ❌', err));
  });
}


