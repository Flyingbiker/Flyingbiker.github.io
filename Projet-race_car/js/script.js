var piste = document.getElementById("piste");

class Voiture{
  constructor(numero, couleur){
      this._left = null ;
      this._top = null ;
      this._numero = numero;
      this._couleur = couleur;
      // Creation d'un div /
      this._balise = document.createElement("div");

    //Ajout de la classe voitureClass 
      this._balise.setAttribute("class","voitureClass");

      this._balise.style.borderColor = this._couleur;

      this._balise.textContent = this._numero;

    // Ajout de la balise sur la piste */
      piste.appendChild(this._balise);
  }
  positionner(left,top){
    this._balise.style.left = left + "px";
    this._balise.style.top = top + "px";
    this._left = left ;
    this._top = top ;
  }
  setCouleur(nouvelleCouleur){
    this._couleur = nouvelleCouleur;
    this._balise.style.borderColor = nouvelleCouleur;
  }
  /*    D - keypress, keydown, keyup
    vroumVroum1 : d => accélérer | z => up | s = down
    vroumVroum2 : i => accélérer | k => up | l = down*/

accelerer(){
    //avancer de manière aléatoire entre 10 et 50px
        let gaz = getRandomBetween(10,50) ;
        this.positionner(this._left+ gaz, this._top);
        console.log("accélérer " + this._numero + " " + this.left);        
    }
    
up(){
    //monter de manière aléatoire entre 10 et 20px
        let gaz =  getRandomBetween(10,20) ;
        this.positionner(this._left, this._top - gaz);
        console.log("up" + this._numero + " "+ this.up);
    }
down(){
    //monter de manière aléatoire entre 10 et 20px
        let gaz = getRandomBetween(10,20) ;
        this.positionner(this._left, this._top + gaz);
        console.log("down" + this._numero + " " +this.down );
    }
}
//fonction random entre min et max
function getRandomBetween(min, max){
    let nb = Math.random()*(max-min)+min;
    return nb;
}
//pour valider les numéros et les couleurs
function validation(){
    /*Numéro entre 0 et 99*/
    let inputNum = document.getElementById("inputNumero");
    inputNum = parseInt(inputNum.value);
    if (isNaN(inputNum)){
        document.getElementById("errorNumero").style.display = "block";
    }else if (inputNum <1 || inputNum >99) {
        document.getElementById("errorNumero").style.display = "block";
    }else {
        document.getElementById("errorNumero").style.display = "none";
    }
    console.log(isNaN(inputNum)); // NaN => Not en Number
     //isNaN(?) => true si ce n'est pas un nombre, false si c'est un nombre
     // SI erreur faire apparaitre la balise #errorNumero
    
    /*Couleur au format #000FFF #CCC*/
    let inputCouleur = document.getElementById("inputColor");
    inputCouleur = inputCouleur.value;
    let tailleTexte = inputCouleur.length;
    let tabCaractere =["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","A","B","C","D","E","F"];
    if (tailleTexte ==7 || tailleTexte ==4){ 
        if (inputCouleur[0]=='#'){
            for(let i = 1; i<tailleTexte; i++){
                    for (let j=0;j < tabCaractere.length; j++){
                        if (tabCaractere.includes (inputCouleur[i])) {return inputCouleur} 
                            else {
                                alert("faux "+ inputCouleur[i]);
                                break;
                                break;
                            }
                    }
                
                }
            }
            else {alert("veuiller commencer par un #")
            }
        }
        else{
            alert("veuillez saisir une couleur valide");
    }

    //txt.length
    //vérifier que le premier caractère = //#endregion
    //vérifier pour les autres que les caractères sont les suivants :
    //0,..9 et A,..F
    //var fruits = ["Banana", "Orange", "Apple", "Mango"];
    //var n = fruits.includes("Mango");
    // SI erreur faire apparaitre la balise #errorColor
    
}
/* 1 - Récupérer le bouton d'envoi du formulaire et les valeurs des champs */
var btnAjouter = document.getElementById("btn-ajouter");
var inputNum = document.getElementById("inputNumero");
var inputCouleur = document.getElementById("inputColor");
var vrouvroum1, vrouvroum2;
vrouvroum1= null;
vrouvroum2= null;
//console.log(btnAjouter,inputNum,inputCouleur);
/* 2 - Lier l'event click sur le bouton Ajouter */
/* 3 - Lors du click :
/*        * Empêcher l'event par défaut */
/* Récupérer le numéro et la couleur du formulaire */
/* Créer la voiture vrouvroum1 et positionner la sur la piste*/
/* Trouver une solution pour créer vrouvroum2 si vrouvroum1 est créée*/

btnAjouter.addEventListener("click", function(e){
    e.preventDefault();
    let valid = validation();
    if (valid) {
    if (vrouvroum1== null){ 
        vrouvroum1 = new Voiture(inputNum.value,inputCouleur.value);
        vrouvroum1.positionner(0,200);
    }else if (vrouvroum2 == null) { 
        vrouvroum2 = new Voiture(inputNum.value,inputCouleur.value);
        vrouvroum2.positionner(0,400);
    }
}
});

//pour faire avancer les voitures
//1 récupérer le body
var body = document.getElementById("body");


//2 associer l'event keydown au body
body.addEventListener("keydown", function(e){
    console.log(e.key);
    switch(e.key){
        case "d": 
            vrouvroum1.accelerer();
            console.log("vroum1 avance");
            break;
        case "z": 
            vrouvroum1.up();
            console.log("vroum1 monte");
            break;
        case "f": 
            vrouvroum1.down();
            console.log("vroum1 descend");
            break;
        case "i": 
            vrouvroum2.accelerer();
            console.log("vroum2 avance");
            break;
        case "k": 
            vrouvroum2.up();   
            console.log("vroum2 monte");
            break;
        case "l": 
            vrouvroum1.down();
            console.log("vroum2 descend");
            break;
        default:console.log("rien de prévu pour cette touche");
    }
})

//3 récupérer l'event lorsque l'on tape sur une touche 
/*et l'afficher dans la console*/