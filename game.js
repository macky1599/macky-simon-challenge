var buttonDogs = ["toby", "bailey", "sky", "cody", "king", "matcha"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;


$("#start").on("click", function() {
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        }
});




$(".btn").click(function(){
    var userChosenDog = $(this).attr("id");

    userClickedPattern.push(userChosenDog);

    playSound(userChosenDog);

    animatePress(userChosenDog);

    checkAnswer(userClickedPattern.length-1);
    
});

function nextSequence(){
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 6);

    var randomChosenDog = buttonDogs[randomNumber];

    gamePattern.push(randomChosenDog);
    
    $("#" + randomChosenDog).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenDog);
}

function animatePress(currentDog){
    $("#" + currentDog).addClass("pressed");
    setTimeout(function(){
        $("#" + currentDog).removeClass("pressed");
    }, 100);    
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();  
            }, 1000);
        }
    }
    else{
        console.log("failed");
        
        playSound("fail");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press The Button to Restart");
        setTimeout(function(){
        $("body").removeClass("game-over");   
        }, 3000);

        startOver();
        
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3")
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}