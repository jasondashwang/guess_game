/* **** Guessing Game Functions **** */
var winningNumber;
var guesses;
var playerGuess;
var hinted;
var previousGuesses;
// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor(Math.random() * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	var number = +$("#the-guess").val();
	console.log(number);
	if(isNaN(number)){
		throw "Error!";
	} else if(number > 100 || number < 1){
		throw "Error!";
	} else {
		return number;
	}

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	if(playerGuess - winningNumber > 25){
		return 'The real number is lower by a lot!';
	} else if(playerGuess - winningNumber > 10){
		return 'The real number is significantly lower!';
	} else if(playerGuess - winningNumber < 10 && playerGuess - winningNumber > 0){
		return 'The real number is lower by a little';
	} else if(playerGuess - winningNumber > -10){
		return 'The real number is higher by a little!';
	} else if(playerGuess - winningNumber > -25){
		return 'The real number is significantly higher!';
	} else {
		return 'The real number is higher by a lot!';
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if (playerGuess === winningNumber) {
		return 'You win!';
	} else {
		return lowerOrHigher();
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	var digitString = winningNumber.toString();
	var lastDigit = +(digitString[digitString.length - 1]);
	var upperBound = winningNumber+(10-lastDigit);
	var lowerBound = winningNumber-lastDigit;

	return 'The answer is between ' + lowerBound + ' and ' + upperBound;
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	winningNumber = generateWinningNumber();
	playerGuess = null;
	guesses = 5;
	hinted = false;
	previousGuesses = [];
}