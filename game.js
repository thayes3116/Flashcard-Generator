//Require Inquirer and other js file
const inquirer = require("inquirer"),
	fullBasicArray = require('./BasicCard'),
	fullClozeArray = require('./ClozeCard'),
	UserBasicCard = require('./UserBasicCard'),
	UserClozeCard = require('./UserClozedCard');

//Set counts to zero
var	questionCount = 0,
	correctCount = 0,

//Declare global variables to fill inquirer
	createPlay,
	createCardType,
	inqQuestion,
	inqAnswer,
	userInqAnswerArray = [],
	userQuestionArray = [],

//unpackaging data from other js files
	questionArray = fullClozeArray[0],
	clozeArray = fullClozeArray[1],	
	frontArray = fullBasicArray[0],
	backArray = fullBasicArray[1];

//function on load to ask if user wants to create cards or play with existing	
function InitialPrompt(){

	inquirer.prompt([

			{
				type: 'list',
				name: 'cardstyle',
				message: 'Do you want to play create your own cards of play with the prepared cards?',
				choices:['Create Cards', 'Play with Prepared Card']
			}

	])
	.then(function(answer){

			createPlay = answer.cardstyle;

			if(answer.cardstyle == 'Create Cards'){

				CreateCards();

			}else if(answer.cardstyle == 'Play with Prepared Card'){

				StartPreparedGame();				
			}
	});
}

//function to determine the type of card to make
function CreateCards(){

	inquirer.prompt([

			{
				type: 'list',
				name: 'cardstyle',
				message: 'Do you want to create basic or cloze cards?',
				choices:['Basic Card', 'Cloze Card']
			}

	])
	.then(function(answer){

			createCardType = answer.cardstyle;

			if(answer.cardstyle == 'Basic Card'){

				CreateBasicCards();


			}else if(answer.cardstyle == 'Cloze Card'){

				CreateClozeCards();			
			}
	})
}

//function to create basic cards
function CreateBasicCards(){

	inquirer.prompt([

	    	{
	    	type: "input",
	      	name: "front",
	        message: "Enter the information for the front of the card?"	        
	    	},

	    	{
	    	type: "input",
	      	name: "back",
	        message: "Enter the information for the back of the card?"	        
	    	}

    ])
    .then(function(ans) {	

    	var newCard = UserBasicCard(ans.front, ans.back)

			userQuestionArray.push(newCard.front);
			userInqAnswerArray.push(newCard.back);

    	CreateAnotherOrPLay()

    });
}

//functoin to create cloze cards
function CreateClozeCards(){

	inquirer.prompt([

	    	{
	    	type: "input",
	      	name: "question",
	        message: "Enter the information for the card?"	        
	    	},

	    	{
	    	type: "input",
	      	name: "cloze",
	        message: "Enter the information for the cloze?"	        
	    	}
	    ])
	    .then(function(ans) {

	    	var newCard = UserClozeCard(ans.question, ans.cloze),
				checker = newCard.preparedQuestion.includes("......");

			if(checker === true){

				userQuestionArray.push(newCard.preparedQuestion);
	    		userInqAnswerArray.push(newCard.cloze);
	    		
	    		CreateAnotherOrPLay()

	    	}else{

	   			console.log("Make sure the cloze matches a part of the question");
	   			
	   			CreateClozeCards();

	    	}
							    	
	    });
}

//function to determine if user wass to create more cards or play now
function CreateAnotherOrPLay(){

	inquirer.prompt([

	    	{
	    		type: "list",
	    		name: "createOrPlay",
	    		message: "Do you want to make another card or play with the cards you made?",
	    		choices: ["Create Another Card", "Play with My New Cards"]
	    	}

	    	]).then(function(answer){
	    		
	    		if(answer.createOrPlay === "Create Another Card"){

	    			if(createCardType == "Basic Card"){

	    				CreateBasicCards();

		    		}else if(createCardType == "Cloze Card"){

		    			CreateClozeCards();

		    		}

	    		}else if(answer.createOrPlay === "Play with My New Cards"){

	    			inqQuestion = userQuestionArray;
	    			inqAnswer = userInqAnswerArray;
	    			askQuestions();
	    		}	    	
	    	});
}

//function to start game on load
function StartPreparedGame(){

	inquirer.prompt([

			{
				type: 'list',
				name: 'cardstyle',
				message: 'What kind of cards you want to play with basic or cloze?',
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
			
			console.log("Congratulations!! You got "+correctCount+" right out of "+inqQuestion.length+". Your Mom would be proud!");
		
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
					message: "Want to try again?",
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

	if(createPlay === 'Create Cards'){

		askQuestions();

	}else if(createPlay === 'Play with Prepared Card'){	

		StartPreparedGame();

 	}	
}	

InitialPrompt();
	
	