var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});


$(".btn").click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastIndex=userClickedPattern.length-1;
    checkAnswer(lastIndex);
}); 


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

        if(currentLevel===gamePattern.length-1){
            setTimeout(nextSequence, 1000);
            userClickedPattern=[];

        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
            
        }, 200);
        gameOver();
    }

} 



function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}

function gameOver(){
    started=false;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    $("h1").text("Game Over, Press A Key to Start");
}

function playSound(name){
    var sound=("./sounds/"+name+".mp3")
    var audio = new Audio(sound);
    audio.play();
}


function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}


