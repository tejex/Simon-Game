var buttonColours = ["red","blue", "green","yellow"];
var gamePattern =[];
var userClickedPattern =[];
var level = 0;
var started= false;


$(document.body).keydown(function(event){
  if(!started){
  level = 0;
  $("#level-title").text("Level 0");
  nextSequence();
}
})


$(".btn").click(function(){
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePres(userChosenColour);

  var length = userClickedPattern.length-1;
  checkAnswer(length);
})


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence()
      },1000)
      userClickedPattern = [];
    }
  }
  else{
    var bam = new Audio("sounds/wrong.mp3");
    bam.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern =[];
  level++;
  $("#level-title").text("level " + level );
  const randomNum = Math.floor(Math.random()*4);
  const randomChosenColor = buttonColours[randomNum];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

  const audio = new Audio("sounds/"+randomChosenColor+".mp3");
  audio.play();
}

function playSound(name){
  const audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePres(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  },100);
}



function startOver(){
  level =0;
  gamePattern=[];
  started = false;
}
