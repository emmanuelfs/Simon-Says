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
                case "green": pressedColor("green", 2);
                    compareButton(1);
                    green.play();
                    break;
                case "red": pressedColor("red", 2);
                    compareButton(2);
                    red.play();
                    break;
                case "yellow": pressedColor("yellow", 2);
                    compareButton(3);
                    yellow.play();
                    break;
                case "blue": pressedColor("blue", 2);
                    compareButton(4);
                    blue.play();
                    break;
            }
    }
    }) 
})

function pressedColor(color, timeModifier){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
    $("#" + color).removeClass("pressed");
    }, timeOut / timeModifier);
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
            case 1: pressedColor("green", 1);
            green.play();
            break;
            // red
            case 2: pressedColor("red", 1);
            red.play();
            break;
            // yellow
            case 3: pressedColor("yellow", 1);
            yellow.play();
            break;
            // blue
            case 4: pressedColor("blue", 1);
            blue.play();
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