//run this on page start
var startPageEl = document.querySelector("#Cover");
var startBtnEl = document.querySelector("#startBtn")
var sbLinkEl = document.querySelector("#sbLink");
var scoreboardEl = document.querySelector("#score-card");
var question1El = document.querySelector("#Question1");
var question2El = document.querySelector("#Question2");
var question3El = document.querySelector("#Question3");
var question5El = document.querySelector("#Question4");
var question5El = document.querySelector("#Question5");
var inputScoreEl = document.querySelector("#inputScoreInfo");
var questionArr = ["Question1", "Question2", "Question3", "Question4", "Question5"];
var answerBtn = document.querySelectorAll("button[correct]");
var correctFooterEl = document.querySelector("#correctFooter");
var incorrectFooterEl = document.querySelector("#incorrectFooter");
var scoreboardList = document.querySelector("#scoreboard");
var sbTryAgainBtn = document.querySelector("#tryAgain");
var sbClearBtn = document.querySelector("#clearBtn");

//shows start page
startPageEl.className = startPageEl.className.replace("hidden", "");

//sets View High Scores link --> on click to go to Scoreboard
sbLinkEl.addEventListener("click", function(){
  showCard(scoreboardEl);
});

//click start btn to show first question
startBtnEl.addEventListener("click", function(){
  questionArr = ["Question1", "Question2", "Question3", "Question4", "Question5"];
  showRandomQuestion(questionArr, inputScoreEl);
  setTime(timerEl);
});

//loop through each answer button and add click event
for(i=0; i<answerBtn.length; i++){
  var Btn = answerBtn.item(i);
  Btn.addEventListener("click", function(e){
    e=e||window.event;
    var btnEl = e.target||e.srcElement;
    var isCorrectReturn = rightAnswer(btnEl);
    if (isCorrectReturn == "true"){
      showRandomQuestion(questionArr, inputScoreEl);
    }
    else{
      secondsLeft = secondsLeft - 10;
      timerEl.textContent = secondsLeft;
    }
  });
}

//Timer
var secondsLeft = 60;
var timerEl = document.getElementById("countdown");
var finalTime = document.getElementById("finalScore");

timerEl.textContent = secondsLeft;

var timerInterval;
function setTime(timerEl) {
    timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    //if time runs out (timer = or < 0), show input card & score = 0
    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      showCard(inputScoreEl);
      secondsLeft = 0;
      finalTime.textContent = secondsLeft;
    }

  }, 1000);
}

var initalsEl = document.getElementById("initalsInput");
var initialsSubmitBtn = document.getElementById("initalsSubmit");

//input page submit initials button (store in local storage)
initialsSubmitBtn.addEventListener("click", function(){
  var initalsSubmitted = initalsEl.value;
  var userInitialsArr = [initalsSubmitted, secondsLeft];
  initalsEl.value = "";
  // example: sbItemsArr[0] = ABC, sbItemsArr[1] = 25;

  var highScoresArr = JSON.parse(localStorage.getItem("highScoresArr"));
  //check if scores exist, if none exist, push score into array
  if (highScoresArr == null){
    localStorage.setItem("highScoresArr", JSON.stringify(userInitialsArr));
  }
    //push HS into array in order starting with highest score
    else{
      for (i = 1; i < highScoresArr.length; i+=2) {
        currentHS = highScoresArr[i];
        
        var isHighscore = false;
        if(userInitialsArr[1] > highScoresArr[i]){
          highScoresArr.splice(i-1, 0, userInitialsArr[1]);
          highScoresArr.splice(i-1, 0, userInitialsArr[0]);
          isHighscore = true;
          break;
        }
      }
      //if we didn't insert our scores anywhere and if there is space in the array it must be the low score.
      if (isHighscore == false && highScoresArr.length < 10){
        highScoresArr.push(userInitialsArr[0]);
        highScoresArr.push(userInitialsArr[1]);
      }
      localStorage.setItem("highScoresArr", JSON.stringify(highScoresArr));
    }
  showCard(scoreboardEl);
});

//scoreboard page try again button
sbTryAgainBtn.addEventListener("click", function(){
  showCard(startPageEl);
  secondsLeft=60;
  timerEl.textContent = secondsLeft;
});

//scoreboard page clear button
sbClearBtn.addEventListener("click", function(){
  //clear scoreboard out of DOM
  while (scoreboardList.children.length > 0) {
    scoreboardList.children.item(0).remove();
  }
  //clear scoreboard out of localStorage
  localStorage.removeItem("highScoresArr");
});


//end page start



//randomly choose question from array
function showRandomQuestion(questionArr, inputScoreEl){ 
  //checks length of question array
  if (questionArr.length == 0){
    showCard(inputScoreEl);
    clearInterval(timerInterval);
    finalTime.textContent = secondsLeft;

  }
  else{ 
    //chooses random index from questions array
    var i = Math.floor(Math.random() * questionArr.length);
    //get element of question array id
    var chosenQ = document.getElementById(questionArr[i]);
    //remove randomly chosen question from array
    questionArr.splice(i, 1);
    //shows randomly chosen qustion
    showCard(chosenQ);
  }
}

function showCard(calledCard){
  var allCards = document.querySelectorAll(".container");
  //loops through all cards
  for(i=0; i<allCards.length; i++){
    //get current card and set to var
    var currentCard = allCards.item(i);
    //if the current card's class list does not include the hidden class, then add the hidden class
    if(currentCard.className.includes("hidden") == false){
      currentCard.className += ' hidden';
    }   
  }
  //show calledCard
  calledCard.className = calledCard.className.replace("hidden", "");
  console.log(calledCard.className);

  //check is card shown is the scoreboard card
  if (calledCard == scoreboardEl){
    // clear scoreboard
    while (scoreboardList.children.length > 0) {
      scoreboardList.children.item(0).remove();
    }
    // list scoreboard
    var highScoresArr = JSON.parse(localStorage.getItem("highScoresArr"));

    // Render scoreboard scores as li for each [initals, score]
    if (highScoresArr != null){
      for (var i = 0; i < highScoresArr.length; i+=2) {
        var currentHSli = highScoresArr[i] + ": " + highScoresArr[i+1];

        var li = document.createElement("li");
        li.textContent = currentHSli;

        scoreboardList.appendChild(li);
      }
    }
  }
}

//correct-incorrect footer
function rightAnswer(btnEl){
  var isCorrect = btnEl.getAttribute("correct");
  if (isCorrect == "true"){
    // show correct footer & hide incorrect footer
    correctFooterEl.className = correctFooterEl.className.replace("hidden", "");
    setTimeout(function(){
      correctFooterEl.className += ' hidden';
    }, 500);
  }
  else{
    // show incorrect footer & hide correct footer
    incorrectFooterEl.className = incorrectFooterEl.className.replace("hidden", "");
    setTimeout(function(){
      incorrectFooterEl.className += ' hidden';
    }, 1000);
  }
  return isCorrect;
}
