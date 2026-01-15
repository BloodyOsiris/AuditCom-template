// src/injectImages.js

// 1. Configuration des images (Mettez les noms EXACTS de vos fichiers)
const logoMap = {
    // Nom exact venant de l'API : Chemin exact vers votre dossier images
    'FC Biel-Bienne': './images/Logo_FC_Biel.png', 
    'Lausanne-Sport': './images/lausanne.png',
    'Yverdon-Sport': './images/yverdon.jpg',
    // Ajoutez les autres ici...
};

function getLogoPath(teamName) {
    // Retourne l'image si elle existe, sinon un placeholder gris
    return logoMap[teamName] || './images/placeholder.png';
}

// 2. Fonction qui ajoute l'image dans une carte
function injectImageIntoCard(cardNode) {
    // On cherche le nom de l'équipe (rempli par main.js)
    const nameElement = cardNode.querySelector('.team-name-target');
    // On cherche l'image vide
    const imgElement = cardNode.querySelector('.team-logo-target');

    if (nameElement && imgElement) {
        const teamName = nameElement.textContent.trim();
        
        // C'est ici qu'on injecte le src !
        imgElement.src = getLogoPath(teamName);
        imgElement.alt = `Logo ${teamName}`;
    }
}

// 3. L'observateur : Il surveille quand main.js ajoute des éléments dans la page
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            // Si l'élément ajouté est une balise HTML
            if (node.nodeType === 1) {
                // Si c'est notre carte (vérification large)
                if (node.querySelector('.team-name-target')) {
                    // Petite pause pour laisser main.js finir d'écrire le texte
                    setTimeout(() => injectImageIntoCard(node), 0);
                }
            }
        });
    });
});

// 4. Démarrage de la surveillance sur la liste
const teamListContainer = document.getElementById('teamList');
if (teamListContainer) {
    observer.observe(teamListContainer, { childList: true, subtree: true });
}