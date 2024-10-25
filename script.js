var buttoncolors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];

var started = false;
var level = 0;

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomColor=buttoncolors[randomNumber];
    gamePattern.push(randomColor);

    animatePress(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);

}

function checkAnswer(i){
    if(userClickedPattern[i]===gamePattern[i]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },500);
        }
    }
    else{
        gameOver();
        startOver();
    }
    
}

function playSound(randomColor){
    var audio = new Audio("sounds/"+randomColor + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function gameOver(){
    playSound("wrong.mp3");
    $("body").addClass("game-over");  
    setTimeout(function(){
        $("body").removeClass("game-over");
    },750)
}

function startOver() {
    level = 0;
    $("#level-title").text("Game Over -Press any key to Restart");
    gamePattern = [];
    started = false;
}


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

$('div[type="button"]').click(function(){
    var choosenColor=$(this).attr("id");
    userClickedPattern.push(choosenColor);
    animatePress(choosenColor);
    checkAnswer(userClickedPattern.length-1);
})