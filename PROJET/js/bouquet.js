// ===== JavaScript de la page Bouquets =====

// ----- Détails de chaque bouquet (tu peux modifier les textes) -----
var details = {
    eclatant:    { nom: "L'éclatant", img: "bouquet fleurie.avif", prix: "À partir de 29,99 €", fleurs: "Gerberas, œillets, amaryllis, célosie rouge, gypsophile et feuillage", texte: "Un bouquet très coloré aux tons roses et rouges, pour dire bravo ou illuminer une pièce." },
    blanc:       { nom: "Blanc Immortel", img: "bouquet blanc.avif", prix: "À partir de 34,99 €", fleurs: "Chrysanthèmes, gerberas, roses blanches, œillets crème, gypsophile et eucalyptus", texte: "Un bouquet lumineux tout en blanc et en crème, élégant et apaisant." },
    lys:         { nom: "Majesté Rose", img: "fleur lys.avif", prix: "À partir de 29,99 €", fleurs: "Lys roses et feuillage vert", texte: "Des lys parfumés aux tons roses, dont les boutons s'ouvrent peu à peu." },
    automne:     { nom: "L'Automne Rose", img: "bouquet beige.avif", prix: "À partir de 39,99 €", fleurs: "Roses pêche, gerberas, chrysanthèmes bordeaux, œillets et feuillage", texte: "Les couleurs chaudes de l'automne : pêche, abricot et framboise." },
    douceur:     { nom: "Douceur", img: "bouquet melange.avif", prix: "À partir de 34,99 €", fleurs: "Mélange de fleurs de saison aux tons doux", texte: "Un bouquet délicat et poétique, facile à offrir." },
    velours:     { nom: "Velour Rouge", img: "fleurs cado.avif", prix: "À partir de 24,99 €", fleurs: "Protéas, eucalyptus bordeaux, achillée et baies rouges", texte: "Un bouquet dans les tons bordeaux et rouges, original et durable." },
    flamenco:    { nom: "Flamenco", img: "fleur rouge.avif", prix: "À partir de 34,99 €", fleurs: "Fleurs de saison dans les tons rouges", texte: "Un bouquet intense et passionné, pour marquer les esprits." },
    nacre:       { nom: "Nacre", img: "fleur jaune.avif", prix: "À partir de 29,99 €", fleurs: "Fleurs de saison dans les tons jaunes et clairs", texte: "Un bouquet frais et lumineux, qui met de bonne humeur." },
    irresistible:{ nom: "L'irrésistible", img: "bouquet cadeau.avif", prix: "À partir de 49,99 €", fleurs: "Amaryllis, alstroemérias, célosie, hypericum et feuillage, avec une boîte de chocolats", texte: "Le bouquet cadeau parfait : fleurs et chocolats dans le même colis." },
    symphonie:   { nom: "Symphonie Rose", img: "bouquet rose.avif", prix: "À partir de 44,99 €", fleurs: "Roses roses et fuchsia, gypsophile et feuillage", texte: "Un bouquet de roses romantique aux nuances de rose." },
    mariage:     { nom: "Promesse Bohème", img: "bouquet mariage.jpg", prix: "89,99 €", fleurs: "Roses de jardin pêche, lisianthus blancs, eucalyptus, queues de lièvre et herbe de la pampa", texte: "Un bouquet de mariée bohème, à adapter avec notre équipe." }
};

// Ouvre la fenêtre avec les détails du bouquet cliqué
function voirDetail(cle) {
    var b = details[cle];
    document.getElementById("contenu-detail").innerHTML =
        '<img src="../img/' + b.img + '" alt="' + b.nom + '" style="width: 100%; height: 250px; object-fit: cover;">' +
        '<h3 style="font-family: \'Playfair Display\', serif; color: #534312; font-size: 1.6rem;">' + b.nom + '</h3>' +
        '<p>' + b.texte + '</p>' +
        '<p><strong>Composition :</strong> ' + b.fleurs + '</p>' +
        '<p class="prix">' + b.prix + '</p>' +
        '<a class="lien-bouton" href="contact.html">Commander</a> ' +
        '<input type="button" class="bouton" value="Fermer" onclick="fermerDetail()" style="display: inline-block;">';
    document.getElementById("fenetre").style.display = "flex";
}

// Cache la fenêtre
function fermerDetail() {
    document.getElementById("fenetre").style.display = "none";
}

// mode = "tous" : on affiche tout / mode = "bas" : on cache les bouquets de 35 € ou plus
function filtrer(mode) {
    // 1. On réaffiche d'abord tous les bouquets et tous les blocs "cher"
    var produits = document.getElementsByClassName("produit");
    for (var i = 0; i < produits.length; i++) {
        produits[i].style.display = "";
    }
    var chers = document.getElementsByClassName("cher");
    for (var j = 0; j < chers.length; j++) {
        chers[j].style.display = "";
    }

    // 2. Si on veut seulement les bouquets bon marché, on cache ceux qui ont la classe "cher"
    if (mode == "bas") {
        for (var k = 0; k < chers.length; k++) {
            chers[k].style.display = "none";
        }
    }
}