//set current date and time with moment.js
$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a')); 

//-----------
//-VARIABLES-
//-----------

//parse out hour in military time
var currentTime = moment().format();
var dateTime = currentTime.split("T");
var time = dateTime[1].split(":");
var currentHour = time[0];

//create fixed array of empty strings for each event text area: number of events = 10
var storedEventsArr = ["","","","","","","","","",""];
console.log(storedEventsArr);

//initalize on page startup
initalize();

//loop through all save buttons and add event listener
for(var i = 1; i < 11; i++) {
    //btnSelector is assigned to the saveBtn selector id and iterating the number for each button
    var btnSelector = '#saveBtn' + i;
    var currentSaveBtnEl = document.querySelector(btnSelector);

    //event listener for buttons
    currentSaveBtnEl.addEventListener("click", function(e){
        //replace saveBtn# with just the #
        var curButtonCounter = e.target.id.replace('saveBtn', '');
        saveEvent(curButtonCounter);
        });
}

//-------------------
//-----FUNCTIONS-----
//-------------------

//initalize function run on page startup
function initalize(){
    storedEventsArr = JSON.parse(localStorage.getItem("storedEventsArr"));
    //looping through textareas and setting the stored value
    for (var i = 1; i < 11; i++) {
        var eventInput = document.querySelector("#eventInput" + i);

        eventInput.value = storedEventsArr[i-1];
        console.log(storedEventsArr);
    }
    colorRows(currentHour);
}

//save event function called on save button click
function saveEvent(i){
    var eventInput = document.querySelector("#eventInput" + i);

    storedEventsArr[i-1] = eventInput.value;
    localStorage.setItem("storedEventsArr", JSON.stringify(storedEventsArr));
    console.log(storedEventsArr);
}

//get time and set it as the input
function colorRows(currentHour){
    var tableRowAttribute = document.querySelectorAll("tr[currentHour]");
    for(i=0; i<tableRowAttribute.length; i++){
        var currentRow = tableRowAttribute.item(i);
        var hourAttribute = currentRow.getAttribute("currentHour");

        //converting strings to integers
        var intCurrentHour = parseInt(currentHour, 10);
        var intHourAttribute = parseInt(hourAttribute, 10);

        //add color classes to table row <tr> level
        if(intCurrentHour > intHourAttribute){
            currentRow.className += ' past';
        }
        else if(intCurrentHour < intHourAttribute){
            currentRow.className += ' future';

        }
        else{
            currentRow.className += ' present';

        }
    }
}
