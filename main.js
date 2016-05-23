$(document).ready(function(){
	playAgain();
	var submission = function(){
		playerGuess = playersGuessSubmission();
		if(playerGuess > 100 || playerGuess < 1){
			alert('Enter a number in the correct range!');
		} else if(playerGuess === 0){
			alert('Please enter a number to guess!');
		} else if(guesses === 1) {
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