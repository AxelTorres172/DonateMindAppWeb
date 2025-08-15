// Registro del Service Worker en la RAÍZ del repo (GitHub Pages)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js') // raíz del sitio publicado
      .then(reg => console.log('✔ Service Worker registrado', reg.scope))
      .catch(err => console.warn('❌ Error al registrar SW', err));
  });
}

let deferredPrompt;

// Mostrar botón en Android/desktop cuando el navegador dispare beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.getElementById('installBtn');
  if (!btn) return;

  btn.style.display = 'inline-block';
  btn.onclick = async () => {
    btn.style.display = 'none';
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log('Instalación:', choice.outcome);
    deferredPrompt = null;
  };
});

// iOS: no existe beforeinstallprompt -> mostrar instrucción
(function showIosTipIfNeeded() {
  const ua = navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(ua);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isIos && !isStandalone) {
    const tip = document.getElementById('iosInstallTip');
    if (tip) tip.style.display = 'block';
  }
})();
