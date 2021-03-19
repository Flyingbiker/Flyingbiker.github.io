class Voiture {
    constructor(numero, couleur) {
        this.numero = numero;
        this.couleur = couleur;
        this.div = null;
    }
    addOnPiste(position) {
        let carOnTrack = document.createElement("div");
        carOnTrack.innerHTML = this.numero;
        carOnTrack.classList.add("voitures");
        carOnTrack.style.backgroundColor = this.couleur;
        carOnTrack.style.top = (position - 1) * 100 + 50 + 'px';
        piste.appendChild(carOnTrack);
        this.div = carOnTrack;
    }
    moveOn(actualPostion) {
        actualPostion += Math.round(Math.random()*40+10);
        this.div.style.left = actualPostion + 'px';
        return actualPostion;
    }
    winner(actualPosition){
        if (actualPosition >= 500){
            this.div.style.border = ("10px solid red");
            winner = true;
        }        
    }    
}

const voiture1 = new Voiture(15, "#fff");
console.log(voiture1.numero, voiture1.numeroMethode);
voiture1.numeroMethode = 20;
console.log(voiture1.numero, voiture1.numeroMethode);
;

var piste = document.getElementById("piste");
var btnSubmit = document.getElementById("btn-add-car");
var carNumField = document.getElementById("numero");
var carColorField = document.getElementById("couleur");
var form1 = document.getElementById("form1");
var carList = [];
var positionCar1=positionCar2=0;
var displayChrono = document.getElementById("chrono");
var chronoOn = false;
var winner = false;
var chrono;

form1.addEventListener("submit", function listenButtonSubmit(e) {
    e.preventDefault();
    let carNumValue = carNumField.value;
    let carColorValue = carColorField.value;
    let car = new Voiture(carNumValue, carColorValue);
    carList.push(car);

    //création de la Div
    let position = carList.length;
    car.addOnPiste(position);

    console.table(carList);
    if (position==2){
        form1.removeEventListener("submit", listenButtonSubmit);
    }
});
document.body.addEventListener("keydown", function listenKeyboard(e) {
    console.log(e);
    if (!chronoOn && (e.key === "l" || e.key === "s")){
        incChrono(1);
    }
    
    switch (e.key) {
        case "l":
            console.log("voiture 1");
            positionCar1 = carList[0].moveOn(positionCar1);
            carList[0].winner(positionCar1);
            break;
        case "s":
            
            console.log("voiture 2");
            positionCar2 = carList[1].moveOn(positionCar2);
            carList[1].winner(positionCar2);
            break;
        default:
            console.log("pas d'action sur les voitures");
    }
    if (winner){
        console.log("supprimer chrono");
        clearInterval(chrono);
        document.body.removeEventListener("keydown", listenKeyboard);
    }
});

function incChrono(time){
    chronoOn = true;
    chrono = setInterval(function(){
        displayChrono.innerHTML = time + " secondes";
        return time ++;
    }, 1000);    
}

let date = new Date();
console.log(date);
let object = {};
object.maintenant = date
console.log(object.maintenant.prototype);
console.log(object.maintenant.toJSON());