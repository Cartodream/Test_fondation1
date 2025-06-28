// Script à ajouter juste avant la fermeture de la balise body
document.addEventListener('DOMContentLoaded', function() {
    // Décocher toutes les cases du Patrimoine Naturel
    setTimeout(function() {
        var inputs = document.querySelectorAll('input[type="checkbox"]');
        inputs.forEach(function(input) {
            // Vérifier si l'élément parent contient le texte "Patrimoine Naturel"
            var parentText = input.parentElement.textContent;
            if (parentText && parentText.includes("Patrimoine Naturel")) {
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
    }, 500); // Délai pour s'assurer que le DOM est complètement chargé
});