// Configuration des couches visibles au lancement
var layerConfig = {
    // Catégories principales
    "Patrimoine Architectural": true,
    "Patrimoine Naturel": false,
    "Autres Points": true,
    
    // Sous-catégories
    "Etangs et Rivières": false,
    "Forêts et Parcs": false,
    "Patrimoine Religieux": true,
    "Patrimoine Bâti Monumental": true
};

// Fonction pour initialiser les couches selon la configuration
function initLayers() {
    console.log("Initialisation des couches...");
    
    // Appliquer la configuration aux catégories principales
    for (var cat in layerConfig) {
        if (tabCategories[cat] !== undefined) {
            if (typeof tabCategories[cat] === 'boolean') {
                tabCategories[cat] = layerConfig[cat];
            }
            else if (typeof tabCategories[cat] === 'object') {
                // Si c'est une catégorie avec sous-catégories
                if (layerConfig[cat] === false) {
                    // Si la catégorie principale est désactivée, désactiver toutes ses sous-catégories
                    for (var subCat in tabCategories[cat]) {
                        tabCategories[cat][subCat] = false;
                    }
                }
            }
        }
    }
    
    // Appliquer la configuration aux sous-catégories
    for (var cat in tabCategories) {
        if (typeof tabCategories[cat] === 'object') {
            for (var subCat in tabCategories[cat]) {
                if (layerConfig[subCat] !== undefined) {
                    tabCategories[cat][subCat] = layerConfig[subCat];
                }
            }
        }
    }
    
    // Gestion spécifique pour la couche des rivières
    if (layerConfig["Etangs et Rivières"] === false && rivieresLayer && map.hasLayer(rivieresLayer)) {
        map.removeLayer(rivieresLayer);
    }
    
    // Mettre à jour l'affichage
    majAffichage();
    
    // Mettre à jour les cases à cocher dans l'interface
    var inputs = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var id = input.id;
        
        // Trouver la catégorie parente
        var parentCategory = "";
        for (var cat in tabCategories) {
            if (tabCategories[cat][id] !== undefined) {
                parentCategory = cat;
                break;
            }
        }
        
        // Mettre à jour l'état de la case à cocher
        if (parentCategory && tabCategories[parentCategory][id] !== undefined) {
            input.checked = tabCategories[parentCategory][id];
        } else if (layerConfig[id] !== undefined) {
            input.checked = layerConfig[id];
        }
    }
}

// Exécuter l'initialisation après le chargement complet de la page
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que la carte soit initialisée
    var checkInterval = setInterval(function() {
        if (typeof tabCategories !== 'undefined' && typeof map !== 'undefined' && map !== null) {
            clearInterval(checkInterval);
            // Réduire le délai d'attente à 100ms
            setTimeout(initLayers, 100);
        }
    }, 50); // Vérifier plus fréquemment
});