//Require Inquirer and other js file
const inquirer = require("inquirer"),
	fullBasicArray = require('./BasicCard'),
	fullClozeArray = require('./ClozeCard');

//Set counts to zero
var	questionCount = 0,
	correctCount = 0,

//Declare global variables to fill inquirer
	inqQuestion,
	inqAnswer,

//unpackaging data from other js files
	questionArray = fullClozeArray[0],
	clozeArray = fullClozeArray[1],	
	frontArray = fullBasicArray[0],
	backArray = fullBasicArray[1];

//function to start game on load
function StartGame(){

	inquirer.prompt([

			{
				type: 'list',
				name: 'cardstyle',
				message: 'Do you want to play with basic or cloze cards ?',
				choices:['Basic Card', 'Cloze Card']
			}

	])
	.then(function(answer){

			if(answer.cardstyle == 'Basic Card'){

				inqQuestion = frontArray;
				inqAnswer = backArray;

			}else if(answer.cardstyle == 'Cloze Card'){

				inqQuestion = questionArray;
				inqAnswer = clozeArray;				
			}

			askQuestions();
	})
}

//function to ask questions
function askQuestions(){

	if(questionCount < inqQuestion.length){
		
	    inquirer.prompt([

	    	{
	    	type: "input",
	      	name: "input",
	        message: inqQuestion[questionCount]	        
	    	}

	    ])
	    .then(function(ans) {

	    	if(ans.input.toLowerCase() === inqAnswer[questionCount].toLowerCase()){
	    			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
					console.log("You got it right!!");
					console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
					correctCount++;

				}else{

					console.log("Noooooooooooooooooooooooooooooooooooooo");
					console.log("Wrong, the answer is " + inqAnswer[questionCount]);
					console.log("----------------------------------------");
				}

			questionCount++;
    		askQuestions();
	    });

	}else{

		if((correctCount / inqQuestion.length) >= .75){
			
			console.log("Congratulations!! You got "+correctCount+" right out of "+inqQuestion.length+". You're Mom would be proud!");
		
		}else{

			console.log("That's sad. You only got "+correctCount+" right out of "+inqQuestion.length+". You should ask for a tuition refund");			
		}

		playAgain();
	}		
}

//playagain function
function playAgain(){

	inquirer.prompt([
				{
					type: "confirm",
					message: "Want to try again and earn back your dignity?",
					name: "confirm",
					default: true,	
				}
	]).then(function(response) {

  		if (response.confirm) {

  			resetGame();

			}else{

				console.log("Bye Bye");

			}
	});
}

//reset game
function resetGame(){

	questionCount = 0;
	correctCount = 0;

	StartGame();
}	

StartGame();
	
	