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
console.log(currentHour);

//create fixed array of empty strings for each event text area: number of events = 10
var storedEventsArr = ["","","","","","","","","",""];

console.log(storedEventsArr);

initalize();

//loop through all save buttons and add event listener
for(var i = 1; i < 11; i++) {
    //btnSelector is assigned to the saveBtn selector id and iterating the number for each button
    var btnSelector = '#saveBtn' + i;
    //var currentSaveBtnEl = document.querySelector(btnSelector);
    var currentSaveBtnEl = $(btnSelector);

    //event listener for buttons
    //currentSaveBtnEl.addEventListener("click", function(e){
    $(currentSaveBtnEl).on("click", function(){
        //replace saveBtn# with just the #
        //var curButtonCounter = e.target.id.replace('saveBtn', ''); 
        var curButtonCounter = $(this)[0].id.replace('saveBtn','');
        saveEvent(curButtonCounter);
        });
}

//-------------------
//-----FUNCTIONS-----
//-------------------

//initalize function run on page startup
function initalize(){
    //storedEventsArr = JSON.parse(localStorage.getItem("storedEventsArr"));
    storedEventsArr = jQuery.parseJSON(localStorage.getItem("storedEventsArr"));
    //looping through textareas and setting the stored value
    if (storedEventsArr == null){
        storedEventsArr = ["","","","","","","","","",""];
    }
    for (var i = 1; i < 11; i++) {
        //var eventInput = document.querySelector("#eventInput" + i);
        var eventInput = $("#eventInput" + i);

        eventInput.val(storedEventsArr[i-1]);
        console.log(storedEventsArr);
    }
    colorRows(currentHour);
}

//save event function called on save button click
function saveEvent(i){
    //var eventInput = document.querySelector("#eventInput" + i);
    var eventInput = $("#eventInput" + i);

    storedEventsArr[i-1] = eventInput.val();
    localStorage.setItem("storedEventsArr", JSON.stringify(storedEventsArr));
    console.log(storedEventsArr);
}

//get time and set it as the input
function colorRows(currentHour){
    //var tableRowAttribute = document.querySelectorAll("tr[currentHour]"); 
    var tableRowAttribute = $("tr[currentHour]");

    //for(i=0; i<tableRowAttribute.length; i++){
    $(tableRowAttribute).each(function(i,value){
        //var currentRow = tableRowAttribute.item(i);
        var currentRow = $(this);

        //var hourAttribute = currentRow.attribute("currentHour");
        var hourAttribute = currentRow.attr("currentHour");

        //converting strings to integers
        var intCurrentHour = parseInt(currentHour, 10);
        var intHourAttribute = parseInt(hourAttribute, 10);

        //add color classes to table row <tr> level
        if(intCurrentHour > intHourAttribute){
            currentRow.addClass('past');
        }
        else if(intCurrentHour < intHourAttribute){
            currentRow.addClass('future');
        }
        else{
            currentRow.addClass('present');
        }
    });
}
