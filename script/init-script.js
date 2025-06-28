// Script pour décocher les cases du Patrimoine Naturel au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que le DOM soit complètement chargé
    setTimeout(function() {
        // Décocher toutes les cases du Patrimoine Naturel
        var inputs = document.querySelectorAll('input[type="checkbox"]');
        inputs.forEach(function(input) {
            if (input.id && input.parentElement.textContent.includes("Patrimoine Naturel")) {
                input.checked = false;
                // Déclencher l'événement onclick pour mettre à jour l'affichage
                var event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                input.dispatchEvent(event);
            }
        });
    }, 500);
});