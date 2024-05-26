let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 500;

let sky = new Image();
sky.src = "sky.png";

let gameover = new Image();
gameover.src = "gameover.png";

let dino = new Image();
dino.src = "dino2.png";

let fon = new Image();
fon.src = "fon4.png";

let cactus = new Image();
cactus.src = "cactus2.png";

let cactus2 = new Image();
cactus2.src = "cactus3.png";


let dinodown = false;
let speed = 3;
let dinoStart = false;
let dinoY=390;
let skyX = 0;
let fonX = 0;
let time=0;
let cactusX=900;
let cactus2X=1500;
let cactusStart =false;
let move="none";
let color = "white"

window.onload = function(){
    canvas.backgroundColor = "white";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 900, 500);
    ctx.drawImage(fon, 0, 0, 1800, 500);
    ctx.drawImage(sky,0,0,2400,500);
    ctx.drawImage(dino, 30, 390, 100, 100);
    ctx.fillStyle = "black";
    ctx.font = "18px Arial Black";
    ctx.fillText("Нажмите на клавишу enter. ", 290, 160);
}

document.addEventListener("keydown", moveUp);

function moveUp(event) {
    if ((event.key=="Space" && dinoStart == false) || (event.key=="Enter" && dinoStart == false) || (event.code=="LeftButton" && move=="none")) {
        dinoStart = true;
        dinoY=390;
        fonX = 0;
        skyX = 0;
        time=0;
        cactusX=900;
        cactus2X=1500;
        move="none";
        speed=3
        dino.src = "dino2.png";
        requestAnimationFrame(draw);}    
    if ((event.code=="ArrowUp" && move=="none") || (event.code=="Space" && move=="none") || (event.code=="LeftButton" && move=="none") ){
        move="up";
    } 
    
    
}
function draw(){
    document.getElementById("canvas").style.backgroundColor = "white";
    if (dinoStart==true) requestAnimationFrame(draw);
    
    time++;

    ctx.clearRect (0, 0, 900, 500);
    // Анимация земли 
    fonX -= speed;
    if (fonX <= -900) {fonX = 0;}
    // Анимация неба
    skyX -=1;
    if(skyX <= -900) {skyX = 0;}
    // Анимация динозавра
    if (time % 32 == 0) {dino.src = "dinorun1.png";
    } else if (time % 16 == 0) {dino.src = "dinorun2.png";};
    
    //кактус
    cactusX -= speed;
    if (cactusX <= -64) {cactusX = 900;}
    if (cactusX > 20 && cactusX < 60 && dinoY > 299) {
        dinoStart=false
    }
    cactus2X -= speed;
    if (cactus2X <= -64) {cactus2X = Math.floor(Math.random()*1700+900);}
    if (cactus2X > 20 && cactus2X < 60 && dinoY > 310) {
        dinoStart=false;
        dino.src = "dinodead.png";
    }
    //прыжок
    if (move == "up") {
        dinoY -= 6;
        if (dinoY <= 210) {move = "down"; dinoY = 210;}
    } else if (move == "down") {
        dinoY += 6;
        if (dinoY >= 390) {move = "none"; dinoY = 390;}
    }
   
    //ускорение
    if(time > 1000){
        speed = 4;
    }
    else if(time > 2000){
        speed = 5;
    } 
    else if(time > 3000){
        speed = 6;
    }
    else if(time > 5000){
        speed = 7;
    }
    else if(time > 7000){
        speed = 8;
    }

    // Отрисовка

    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 900, 500);
    ctx.drawImage(sky,skyX,0,1800,500);
    ctx.drawImage(fon, fonX, 0, 1800, 500);
    ctx.drawImage(dino, 30, dinoY, 100, 100);
    ctx.drawImage(cactus, cactusX, 399);
    ctx.drawImage(cactus2, cactus2X, 417);
    ctx.fillStyle = "black";
    ctx.fillText(time, 800, 30);
    console.log(time, speed, dinoStart)
    if (dinoStart == false) { 
        ctx.fillStyle = "black";
        ctx.drawImage(gameover,270,80)
        ctx.fillText("Ваш счёт " + time, 420, 160);
    }
    localStorage.setItem("счёт",time);
}


//Смена цвета фона
//function color(){
//    let num1 = Math.floor(Math.random()*255);
//    let num2 = Math.floor(Math.random()*255);
//    let num3 = Math.floor(Math.random()*255);
//    let div = document.getElementById("color");
//    div.style.backgroundColor = "rgb(" + num1 + ","+ num2 + ","+ num3 + ")";
//}


function tema1(){
    document.getElementById("body").style.backgroundColor = "#205b99";
    color = "white";
}

function tema(){
    document.getElementById("body").style.backgroundColor = "#205b99";
    color = "#314465";

}


//Отключение скроллинга
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

window.addEventListener("keydown", (e) => {  
    if (e.keyCode === 32 && e.target === document.body)  {  
      e.preventDefault();  
    }  
  });