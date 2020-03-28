//console.logs are included (but commented out) in this code for the purpose of this assignment but would be removed upon deployment to secure pw in a real-world scenario

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


//Arrays with user options    
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numeric = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var special = ["!", "#", "$", "%", "&", "*", "+", "-", ".", "/", ":", ";", "=", "?", "@", "\\", "^", "_"];
//entireArray includes any of the 4 above arrays selected by the user via the below confirms
var entireArray = [];
//pwArr is the arr of chars that will make up the returned pw & includes chars randomly selected based on user's input for included character types
var pwArr = [];

//The generatePassword() function generates a password for the user based on user-supplied requirements
function generatePassword() {
  var passwordLength = 0;
  //This while loop validates the user's input for password length (i.e. length must be an integer between 8-128 characters)
  while((passwordLength<8 || passwordLength>128) || isNaN(passwordLength)==true){
    passwordLength = prompt("Choose a password length between 8 and 128 characters.");
    //console.log(passwordLength);
    //If the user selects cancel, the application will reset
    if (passwordLength==null){
      return "";
    }
  }
  //console.log(pwArr.length);

  //user input confirms
  var charactersLower = false;
  var charactersUpper = false;
  var charactersNumeric = false;
  var charactersSpecial = false;

  //This while loop presents the user with confirms to select each option they wish to include in the password
  while (charactersLower == false && charactersUpper == false && charactersNumeric == false && charactersSpecial == false) {
    charactersLower = confirm("Do you wish to include Lowercase characters?");
    //console.log(charactersLower);
    
    charactersUpper = confirm("Do you wish to include Uppercase characters?");
    //console.log(charactersUpper);
    
    charactersNumeric = confirm("Do you wish to include numeric characters?");
    //console.log(charactersNumeric);
    
    charactersSpecial = confirm("Do you wish to include Special Characters?");
    //console.log(charactersSpecial);
  }

  //This set of if statements fills entireArray with the user's chosen array options (i.e. lowerCase, upperCase, numeric, special arrays)
  if(charactersLower == true){
    entireArray.push(lowerCase);
  }
  if(charactersUpper == true){
    entireArray.push(upperCase);
  }
  if(charactersNumeric == true){
    entireArray.push(numeric);
  }
  if(charactersSpecial == true){
    entireArray.push(special);
  }
  //console.log(entireArray);

  pwArr = buildPwArr(pwArr, passwordLength, entireArray);
    
  var isValid = validator(entireArray, lowerCase, upperCase, numeric, special, pwArr);

  //while not valid { reset pwArray, call function to get new PW, check validator }
  while (isValid == false){
    pwArr = [];
    pwArr = buildPwArr(pwArr, passwordLength, entireArray);
    isValid = validator(entireArray, lowerCase, upperCase, numeric, special, pwArr);
  }

  //returns created pw without commas
  return pwArr.join("");
}

function buildPwArr(pwArr, passwordLength, entireArray){
  //pushes random chars into pwArr
        while(pwArr.length < passwordLength){
        
          var userChosenArray = entireArray[Math.floor(Math.random() * entireArray.length)];
          //console.log(userChosenArray);
  
          var randomChar = userChosenArray[Math.floor(Math.random() * userChosenArray.length)];
          //console.log(randomChar);
  
          pwArr.push(randomChar);
        }
        //console.log(pwArr);
        return pwArr;
}

//The validator function validates that at least 1 of each char type chosen by the user is included in the returned pw, if not then a new set of random cahrs will be chosen
function validator(entireArray, lowerCase, upperCase, numeric, special, pwArr){
  var lowerCaseUserValue = false;
  var upperCaseUserValue = false;
  var numericUserValue = false;
  var specialUserValue = false;
  var chosenArrayTypes = 0;

  for (var i = 0; i < entireArray.length; i++){

    if (entireArray[i] == lowerCase) {
      for(var j = 0; j < pwArr.length; j++){
        lowerCaseUserValue = existsInArray(pwArr[j], lowerCase);
          if(lowerCaseUserValue == true){
          chosenArrayTypes++;
          break;
        }
      }
    }

    if (entireArray[i] == upperCase) {
      for(var j = 0; j < pwArr.length; j++){
        upperCaseUserValue = existsInArray(pwArr[j], upperCase);
        if(upperCaseUserValue == true){
          chosenArrayTypes++;
          break;
        }
      }
    }

    if (entireArray[i] == numeric) {
      for(var j = 0; j < pwArr.length; j++){
        numericUserValue = existsInArray(pwArr[j], numeric);
        if(numericUserValue == true){
          chosenArrayTypes++;
          break;
        }
      }
    }

    if (entireArray[i] == special) {
      for(var j = 0; j < pwArr.length; j++){
        specialUserValue = existsInArray(pwArr[j], special);
        if(specialUserValue == true){
          chosenArrayTypes++;
          break;
        }
      }
    }
  }
    
  if (entireArray.length == chosenArrayTypes){
    return true;
  }
  else{
    return false;
  }
}

function existsInArray(inChar, inArray) {
  for (var i=0; i < inArray.length; i++){
    if (inChar === inArray[i]){
      return true;
    }
  }
  return false;
}
