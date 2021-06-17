var buttonColors=["red","blue","yellow","green"];
var gamePattern=[];
var userClickedPattern=[];
var gameOn=false;
var level=0;
$(document).keypress(function(e){
    if(!gameOn){
        
        
        $("#level-title").text("Level "+level);
        gameOn=true;
        nextSequence();
    }
    
    
})
$('.btn').click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColor);
    animate(userChosenColor);
})
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var  randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}


function checkAnswer(lastClicked){
    if(gamePattern[lastClicked]===userClickedPattern[lastClicked]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
        
        
    }
    else{
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over Press Any Key To Restart");
        gameOn=false;
        gamePattern=[];
        level=0;
    }
    
}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animate(color){
    $("#"+color).addClass("pressed");
    setTimeout(() => {
        $("#"+color).removeClass("pressed");
    }, 100);
    
}
