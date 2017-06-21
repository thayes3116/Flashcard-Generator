var inquirer = require("inquirer"),
	BasicCard = require('./BasicCard'),
	ClozeCard = require('./ClozeCard'),

	questionCount = 0,
	correctCount = 0,
	frontArray = [],
	backArray = [],
	questionArray = [],
	clozeArray = [];

var jamestown = new ClozeCard("Jamestown, the first permanent English settlement, was founded in 1607.", "Jamestown");	
var louisiana = new ClozeCard("President Thomas Jefferson purchased the Louisiana Territory from France in 1803.", "Louisiana");
var yorktown = new ClozeCard("The British defeat at Yorktown, Virginia by George Washington’s troops signaled the end of the American Revolution.", "Yorktown");
var gettysburg = new ClozeCard("The Battle of Gettysburg was the turning point in the Civil War for the North.  Confederate troops were forced to retreat and never invaded the North again.", "Gettysburg")

function allPush(){
	jamestown.push();
	louisiana.push();
	yorktown.push();
	gettysburg.push();
}

function resetClozeGame(){

	questionArray = [];
	clozeArray = [];
	questionCount = 0;
	correctCount = 0;
	allPush();
	askQuestions();
}

inquirer.prompt([
		{
			type: 'list',
			name: 'cardstyle',
			message: 'Do you want to play with basic or cloze flashcards ?',
			choices:['Basic Card', 'Cloze Card']
		}
	])
	.then(function(answer){
		//If the users choice is basic....
		if(answer.choice === 'Basic Card'){
			askBasicQuestions();
		}else{
			askClozeQuestions();
		}
	})

function askClozeQuestions(){

	if(questionCount < questionArray.length){

	    inquirer.prompt([

	    	{
	    	type: "input",
	      	name: "input",
	        message: questionArray[questionCount]	        
	    	}

	    ])
	    .then(function(answer) {

	    	userInput = answer.input;

		    	if(userInput.toLowerCase() === clozeArray[questionCount].toLowerCase()){
		    			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
						console.log("You got it right!!");
						console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
						questionCount++;
						correctCount++;
		    			askQuestions(4000);
					}else{
						console.log("Noooooooooooooooooooooooooooooooooooooo");
						console.log("Wrong, the answer is " + clozeArray[questionCount]);
						console.log("----------------------------------------");
						questionCount++;
		    			askQuestions(4000);
					}
	    });	    
	}else{
		if((correctCount / questionArray.length) >= .75){
			console.log("Congratulations!! You got "+correctCount+" right out of "+questionArray.length+". You're Mom would be proud!");

			inquirer.prompt([
				{
					type: "confirm",
					message: "Want to play again?",
					name: "confirm",
					default: true,	
				}
			]).then(function(response) {
  
		  		if (response.confirm) {
		  			resetClozeGame();
  				}else{
  					console.log("Bye Bye");
  				}
  			});

		}else{
			console.log("That's sad. You only got "+correctCount+" right out of "+questionArray.length+". You should ask for a tuition refund");

			inquirer.prompt([
				{
					type: "confirm",
					message: "Want to try again and earn back your dignity?",
					name: "confirm",
					default: true,	
				}
			]).then(function(response) {
  
		  		if (response.confirm) {
		  			resetClozeGame();
  				}else{
  					console.log("Bye Bye");
  				}
  			});
		}
	}		
}
	allPush();
	