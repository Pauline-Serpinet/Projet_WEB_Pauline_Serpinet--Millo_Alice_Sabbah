// ===== Quelle fleur êtes-vous ?  =====

// Numéro essia
var essais = 0;

// Nom et description de chaque fleur
var fleurs = {
    r: {
        nom: "Rose",
        description: "Passionné(e) et charismatique, vous ne laissez personne indifférent. Vous vivez les choses à fond !"
    },
    t: {
        nom: "Tournesol",
        description: "Joyeux(se) et plein(e) d'énergie, vous apportez de la lumière partout où vous allez."
    },
    l: {
        nom: "Lavande",
        description: "Calme et apaisant(e), vous êtes une présence rassurante pour votre entourage."
    },
    o: {
        nom: "Orchidée",
        description: "Élégant(e) et mystérieux(se), vous avez un style unique et beaucoup de raffinement."
    }
};

// ---------- Alerte, confirmation et décompte ----------

function quizAlert() {
    var prenom = document.getElementById("prenom").value;
    var statut = document.getElementById("statut").value;

    if (prenom == "" || statut == "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    alert("Vous êtes sur le point de commencer le quizz !");
    quizConfirm();
}

function quizConfirm() {
    var res = confirm("Etes-vous sûr de vouloir continuer ?");
    if (res == true) {
        alert("Le quizz va commencer dans 5 secondes !");

        // Décompte de 5 secondes
        var timer = 5;

        // Création d'un élément p pour afficher le décompte
        var confirmation = document.createElement("p");
        confirmation.textContent = timer + " secondes";

        // Style du message
        confirmation.style.color = "red";
        confirmation.style.fontSize = "1.5em";
        confirmation.style.fontWeight = "bold";
        confirmation.style.textAlign = "center";

        // Ajout du message dans le fieldset "informations"
        var start = document.getElementById("informations");
        start.appendChild(confirmation);

        // setInterval s'exécute toutes les secondes
        var interval = setInterval(function () {
            timer--;
            console.log(timer);
            confirmation.textContent = timer + " secondes";

            // Quand le décompte est terminé
            if (timer == 0) {
                clearInterval(interval);
                confirmation.textContent = "C'est parti ! Bonne chance !";

                // Affiche le quizz et le bouton
                var elementsQuiz = document.getElementsByClassName("quiz");
                for (var i = 0; i < elementsQuiz.length; i++) {
                    elementsQuiz[i].style.display = "block";
                }

                // On désactive la saisie des informations et on cache le bouton de départ
                document.getElementById("informations").disabled = true;
                document.getElementById("start").style.display = "none";
            }
        }, 1000);
    } else {
        alert("Vous allez être redirigé vers la page d'accueil !");
        window.location.href = "accueil.html";
    }
}

// ---------- Calcul de la fleur ----------

function submitQuiz() {
    // Compteur de points pour chaque fleur
    var points = { r: 0, t: 0, l: 0, o: 0 };

    // On parcourt les 8 questions
    for (var i = 1; i <= 8; i++) {
        var coche = document.querySelector('input[name="q' + i + '"]:checked');

        // Si une question n'a pas de réponse, on arrête
        if (coche == null) {
            alert("Veuillez répondre à toutes les questions !");
            return;
        }

        // On ajoute 1 point à la fleur associée à la réponse
        points[coche.value]++;
    }

    // On cherche la fleur qui a le plus de points
    var gagnante = "r";
    for (var cle in points) {
        if (points[cle] > points[gagnante]) {
            gagnante = cle;
        }
    }

    // Affichage du résultat
    var prenom = document.getElementById("prenom").value;
    document.getElementById("resultat-fleur").innerHTML =
        "<h3>" + prenom + ", vous êtes une : " + fleurs[gagnante].nom + " !</h3>" +
        "<p>" + fleurs[gagnante].description + "</p>";

    // Ajout d'une ligne dans le tableau des résultats
    essais++;
    var tbody = document.getElementById("result").getElementsByTagName("tbody")[0];
    var ligne = tbody.insertRow();
    ligne.insertCell(0).textContent = essais;
    ligne.insertCell(1).textContent = fleurs[gagnante].nom;

    // Réinitialisation des réponses pour pouvoir refaire le quizz
    var inputs = document.querySelectorAll('input[type="radio"]');
    for (var j = 0; j < inputs.length; j++) {
        inputs[j].checked = false;
    }
}
