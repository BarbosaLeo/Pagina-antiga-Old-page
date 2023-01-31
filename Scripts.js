var playerScore;
var playerAircraft;
var playerSpeed = 5;
var gameObstacles = [];
var gameUpgrades = [];
var obstacleSpawnRate = 50;
var meteoriteVelocity = 1;
var gameIsRunning = false;


//function startGame() {
//    myGameArea.create();
//        playerStart = new component("50px", "Consolas", "white", 650, 250, "text");
//        playerControl_1 = new component("30px", "Consolas", "white", 50, 60, "text");
//        playerControl_2 = new component("20px", "Consolas", "white", 50, 90, "text");
//        playerScoreText = new component("30px","Consolas", "white", 1400, 60, "text"); 
//        playerAircraft = new component(64,64,"img/spf_w2.gif", 900, 400, "image");

//        playerStart.text = "click here to Start!"
//        playerControl_1.text = "Press A and D to move";
//        playerControl_2.text = "Press S to stop movement"
//        playerStart.update();
//        playerControl_1.update();
//        playerControl_2.update();
//        playerScoreText.update();
//}

//var myGameArea = {
//    canvas : document.createElement("canvas"),

//    create : function(){
//        this.canvas.width = 1920;
//        this.canvas.height = 500;
//        this.context = this.canvas.getContext("2d");
//        document.body.insertBefore(this.canvas, document.body.childNodes[7]);
//        this.frameNo = 0;
//        window.addEventListener('click', (e) =>{
//            if(!gameIsRunning && e.target == this.canvas) {
//                myGameArea.start();
//                gameIsRunning = true;
//            }
//        })
//    },

//    start : function() {
//        this.interval = setInterval(updateGameArea, 20);
//        window.addEventListener('keydown', (e) => {
//            if(e.key === "a")moveleft()
//            else if(e.key === "d")moveright()
//            else if(e.key === "s"){
//                clearmove();
//                myGameArea.key = false;;
//            }
//          })
//        },

//    clear : function() {
//        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//    },

//    stop : function() {
//        gameEndScreen = new component("50px", "Consolas", "white", 650, 250, "text");
//        gameEndScreen.text = "reload page to play again"
//        gameEndScreen.update();
//        clearInterval(this.interval);
//    }
//}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }
        else if(this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }

        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }

    this.crashWith = function(otherobj){
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myFront = this.y;
        var myBack = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;

        if ((myBack < othertop) ||
        (myFront > otherbottom) ||
        (myRight < otherleft) ||
        (myLeft > otherright)) {
        crash = false;
        }
        return crash;
    }
}

function everyInterval(n){
    if((myGameArea.frameNo /n) % 1 == 0){return true;}
    return false;
}


function updateGameArea() {
    var x, y;
    var playerScore =  Math.round(myGameArea.frameNo/60);

    for (i = 0; i < gameObstacles.length; i++) {
        if (playerAircraft.crashWith(gameObstacles[i])) {
        myGameArea.stop();
        gameIsRunning = false;
        }
    }
    for (i=0;i<gameUpgrades.length;i++){
        if(playerAircraft.crashWith(gameUpgrades[i])){
            playerSpeed+=1;
        }
    }

    myGameArea.clear();
    myGameArea.frameNo += 1;

    if(myGameArea.frameNo == 1 || everyInterval(obstacleSpawnRate)){
        xMin =64;
        xMax = 1800;
        xSpawn = Math.floor(Math.random()*(xMax-xMin+1)+xMin);
        x = xSpawn;
        y = -50;
        gameObstacles.push(new component(64, 64, "img/meteorites-1.png", x, y, "image"))
    }
    for (i=0; i< gameObstacles.length; i += 1){
        gameObstacles[i].y += meteoriteVelocity;
        gameObstacles[i].update();
    }
    if(everyInterval(100)){
        obstacleSpawnRate -=.5;
        meteoriteVelocity +=.1;
    }

    playerControl_1.update();
    playerControl_2.update();
    playerScoreText.text = "SCORE: " + playerScore;
    playerScoreText.update();

    playerAircraft.newPos();
    playerAircraft.update();
}

function moveleft() {
    playerAircraft.speedX = -playerSpeed; 
}

function moveright() {
    playerAircraft.speedX = playerSpeed; 
}

function clearmove() {
    playerAircraft.speedX = 0; 
    playerAircraft.speedY = 0; 
}

// falta implementar!!!!
var modal = document.getElementById("modal");
var img = document.getElementById("img");
var modalImg = document.getElementById("modalImg");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
}
//falta implementar!!!!
var span = document.getElementsByClassName("close")[0];
if(span != null){
span.onclick = function(){
    modal.style.display = "none";
}}
