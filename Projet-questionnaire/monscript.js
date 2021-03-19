var questionnaire = [
    {
        question: "Quelle est la méthode JS pour récupérer une balise par l'id ?",
        reponse: [
            "getElementById()",
            "getElementsById()",
        ],
        correct: 0
    },
    {
        question: "Quelle est la méthode jQuery pour récupérer une balise par l'id ?",
        reponse: [
            "$('.id')",
            "$('id')",
            "$('#id')",
        ],
        correct: 2
    },
    {
        question: "Quelle est la méthode JS pour créer une balise div ?",
        reponse: [
            "document.createElement('div')",
            "document.CreateElement('div')",
            "document.CreateDiv()",
        ],
        correct: 0
    }

]

/** 1 - Créer la structure HTML des questions en parcourant le tableau questionnaire */
/**         Parcourir le tableau
 *          Pour chaque question copier le modele HTML .clone()
 *          Dans le modele mettre la question et les réponses
 *          Afficher uniquement la première question
 */
var model = $(".modele");
var htmlQuestionnaire = $("#questionnaire");

$.each(questionnaire, function (i, itemQuestion) {

    //Récupère l'objet' question
    let temp = itemQuestion;

    //Récupère la question
    let q = `Question N°${(i + 1)} : ${temp.question}`;

    //Récupère le tableau de réponses
    let tabReponse = temp.reponse;

    //Copie le modèle HTML
    let htmlQuestion = model.clone();

    //on remplie la div ".q" avec la question
    htmlQuestion.find(".q").text(q);

    //Construction des inputs des réponses
    let inputReponse = "";
    $.each(tabReponse, function (y, reponse) {
        inputReponse += `<input type="radio" value="${y}" name="q${i}">${reponse}`;
    });

    //on remplie la div ".reponse" avec la liste d'inputs
    htmlQuestion.find(".reponse").html(inputReponse);
    htmlQuestion.hide();
    htmlQuestionnaire.append(htmlQuestion);
});

$("#questionnaire .question:first").show();

/** 2 - Sur click du bouton suivant
 *     A - vérifier qu'un bouton radio est coché sinon message d'erreur
 *     B - Récupérer la valeur du radio coché
 *     C - Enregistrer cette valeur dans un tableau réponseUser []
 *     D - Cacher la question courante
 *     E - Afficher la question suivante
 * 
 */

//utiliser :checked pour le bouton radio

var button = $('.btn');
var i = 1;
var resultats = [];
button.click(function () {
    //récupération de la réponse
    let reponseV = $("#questionnaire .question:visible input:checked");
    console.log(reponseV);

    //détermeiner à quelle question on en est
    let question = $("#questionnaire .question:visible");
    if (i < 3) {
        if (reponseV.length == 0) {
            console.log("cocher une case !");
            console.log(question);
            question.append("<p class='erreur'>cocher une case !</p>")
        } else {
            $('.erreur').remove();
            console.log(reponseV.val());
            resultats.push(reponseV.val());
            // console.log(resultats, i, reponseV.val());
            question.hide();
            $(`#questionnaire .question:eq(${i})`).toggle();
            i++;
        }
    } else if (i == questionnaire.length) {
        //si c'est la dernière réponse, on affiche montre toutes les questions
        resultats.push(reponseV.val());
        let questions = $("#questionnaire .question");
        questions.slideDown();
        i++;

        let score = 0;
        $(resultats).each(function(idx, val){
            let reponseCorrect = questionnaire[idx].correct;
            if ( val == reponseCorrect){
                score++;
                $(`#questionnaire .question:eq(${idx})`).addClass("juste");                

            } else {
                $(`#questionnaire .question:eq(${idx})`).addClass("faux")
                .append('la bonne réponse était la ' + (reponseCorrect+1));
                $(`#questionnaire .question:eq(${idx}) [value=${reponseCorrect}]`).addClass("bonneReponse");
                
            }
        }) ;
        htmlQuestionnaire.append(`<h1>Votre score est de ${score} / ${resultats.length}</h1>`);
        
    } else {

        alert("le tableau est complet");

    }    
});
console.log(questionnaire[2].correct);

//pour savoir si c'est un objet jQuery
console.log(questionnaire instanceof jQuery);
console.log($(questionnaire) instanceof jQuery);