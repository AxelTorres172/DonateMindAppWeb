let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'inline-block';

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();

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
    navigator.serviceWorker.register('Js/service-worker.js') // 🔹 ruta relativa y con mayúscula
      .then(reg => console.log('Service Worker registrado ✔️', reg))
      .catch(err => console.warn('Error al registrar Service Worker ❌', err));
  });
}
