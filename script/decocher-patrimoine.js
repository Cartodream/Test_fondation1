// Script pour décocher les cases du Patrimoine Naturel
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    // Décocher toutes les cases du Patrimoine Naturel
    var inputs = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if (input.parentElement && input.parentElement.textContent.includes("Patrimoine Naturel")) {
        input.checked = false;
        // Simuler un clic pour déclencher l'événement onDisplayCheckBoxChanged
        input.click();
      }
    }
    
    // Masquer la couche des rivières
    if (rivieresLayer && map.hasLayer(rivieresLayer)) {
      map.removeLayer(rivieresLayer);
    }
  }, 500);
});