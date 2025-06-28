// Configuration des couches visibles au lancement
var configLayers = {
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

// Fonction qui modifie l'initialisation des couches
function applyLayerConfig() {
    // Modifier les valeurs dans tabCategories selon la configuration
    for (var category in configLayers) {
        // Si c'est une catégorie principale
        if (tabCategories[category] !== undefined) {
            if (typeof tabCategories[category] === 'boolean') {
                tabCategories[category] = configLayers[category];
            }
            // Si c'est un objet (sous-catégories)
            else if (typeof tabCategories[category] === 'object') {
                // Vérifier si la catégorie entière doit être masquée
                if (configLayers[category] === false) {
                    // Masquer toutes les sous-catégories
                    for (var subCat in tabCategories[category]) {
                        tabCategories[category][subCat] = false;
                    }
                } 
                // Sinon, appliquer les configurations spécifiques aux sous-catégories
                else {
                    for (var subCat in tabCategories[category]) {
                        if (configLayers[subCat] !== undefined) {
                            tabCategories[category][subCat] = configLayers[subCat];
                        }
                    }
                }
            }
        }
        // Si c'est une sous-catégorie directe
        else {
            for (var mainCat in tabCategories) {
                if (typeof tabCategories[mainCat] === 'object' && tabCategories[mainCat][category] !== undefined) {
                    tabCategories[mainCat][category] = configLayers[category];
                }
            }
        }
    }
    
    // Mettre à jour l'affichage
    majAffichage();
    
    // Gestion spécifique pour la couche des rivières
    if (configLayers["Etangs et Rivières"] === false && rivieresLayer && map.hasLayer(rivieresLayer)) {
        map.removeLayer(rivieresLayer);
    }
    
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
        } else if (configLayers[id] !== undefined) {
            input.checked = configLayers[id];
        }
    }
}