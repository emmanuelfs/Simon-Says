let sequence = [];
let pressedSequence = [];
let firstRun = true;
let gameStarted = false;
let timeOut = 500;
let canClick = true;
let i = 0;
let p = 0;

const green = new Audio("./sounds/green.mp3");
const blue = new Audio("./sounds/blue.mp3");
const red = new Audio("./sounds/red.mp3");
const yellow = new Audio("./sounds/yellow.mp3");

$(document).ready(()=>
{
    $(document).keypress(()=>{
        if (firstRun) { 
            $("body").removeClass("game-over");            
            $("#level-title").text("Press A Key to Start");
            gameStarted = true;
            firstRun = false;  
            pressButtons();      
        }
    })   
    
    $(".btn").click(function(e){
        if (gameStarted && canClick){
            switch ($(this).attr("id")){
                case "green": pressedColor("green");
                    compareButton(1);
                    green.play();
                    break;
                case "red": pressedColor("red");
                    compareButton(2);
                    red.play();
                    break;
                case "yellow": pressedColor("yellow");
                    compareButton(3);
                    yellow.play();
                    break;
                case "blue": pressedColor("blue");
                    compareButton(4);
                    blue.play();
                    break;
            }
    }
    }) 
})

function pressedColor(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
    $("#" + color).removeClass("pressed");
    }, timeOut / 2);
}

function compareButton(press){   
    if (gameStarted){ 
        if (press === sequence[p]){
            p++;
            if (p >= sequence.length){
                // end of turn
                p = 0;
                pressButtons();
            }
        } else{
            i = 0;
            p = 0;
            gameStarted = false;
            firstRun = true;
            sequence = [];
            pressedSequence = [];
            $("body").addClass("game-over");
            $("#level-title").text("Game over, press a key to play again");
        }
    }
}

function pressButtons(){
    if (!firstRun && gameStarted){
        sequence.push(Math.floor((Math.random() * 4) + 1));
        forLoop();
    }
}
function forLoop(){
    canClick = false;
    setTimeout(() => {
        switch (sequence[i]){
            // green
            case 1: $("#green").addClass("pressed");
            green.play();
            setTimeout(function(){
                $("#green").removeClass("pressed");
                }, timeOut);
            break;
            // red
            case 2: $("#red").addClass("pressed");
            red.play();
            setTimeout(function(){
                $("#red").removeClass("pressed");
                }, timeOut);
            break;
            // yellow
            case 3: $("#yellow").addClass("pressed");
            yellow.play();
            setTimeout(function(){
                $("#yellow").removeClass("pressed");
                }, timeOut);
            break;
            // blue
            case 4: $("#blue").addClass("pressed");
            blue.play();
            setTimeout(function(){
                $("#blue").removeClass("pressed");
                }, timeOut);
            break;
            // default
            default: break;
        }
        i++;
        if (i < sequence.length){
            forLoop();
        }
        else{
            canClick = true;
            i = 0;
        }
    }, timeOut + 200);
}