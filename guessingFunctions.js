(function(){	
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
			return 'The real number is lower by more than 25!';
		} else if(playerGuess - winningNumber > 10){
			return 'The real number is lower by less than 25!';
		} else if(playerGuess - winningNumber < 10 && playerGuess - winningNumber > 0){
			return 'The real number is lower by less than 10';
		} else if(playerGuess - winningNumber > -10){
			return 'The real number is higher by less than 10!';
		} else if(playerGuess - winningNumber > -25){
			return 'The real number is higher by less than 25!';
		} else {
			return 'The real number is higher by more than 25!';
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

	$(document).ready(function(){
		playAgain();
		var submission = function(){
			try{
				playerGuess = playersGuessSubmission();
			} catch(e) {
				alert('Please enter a valid input!');
				return;
			}

			if(playerGuess === 0){
				alert('Please enter a number to guess!');
			} else if(guesses === 0) {
				$('#result').text('You Lose!').addClass('failure');; 
				$('#answerHolder').show();
				$('#answer').text(winningNumber);
			} else{
				if($.inArray(playerGuess, previousGuesses) === -1){
					var final = checkGuess();
					$('#result').text(checkGuess);
					if(final === 'You win!'){
						$('#result').addClass('victory');
					} 
					guesses -= 1;
					var previous = $('#prevGuesses');
					previous.text(previous.text() + ' ' + playerGuess);
					$('#numberOfGuesses').text(guesses);
					previousGuesses.push(playerGuess);
					
				} else {
					alert('You already entered that number!');
				}
			}
			
		};
		$('#submit').on('click', submission);

		// Enter/Return Key Handling
		$('#the-guess').bind('enterKey', function(e){
			submission();
		});

		$('#the-guess').keyup(function(e){
			if(e.keyCode == 13){
				$(this).trigger('enterKey');
			}
		});



		$('#restart').on('click', function(){
			playAgain();
			$('#numberOfGuesses').text(5);
			$('.temphide').hide();
			$('#result').text('Enter a number to get feedback!').removeClass('victory').removeClass('failure');
			$('#prevGuesses').text('You already guessed: ');
			
		});

		$('#hint').on('click', function(){
			if(!hinted){
				$('#the-hint').text(provideHint).show();
			}
		});
	});
}());