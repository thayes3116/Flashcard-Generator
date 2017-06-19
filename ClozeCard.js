var inquirer = require("inquirer");
var questionArray = [];
var userInput;
var questionCount = 0;

function ClozeCard(question, cloze){
	this.question = question;
	this.cloze = cloze;
	this.preparedQuestion = (this.question).replace(this.cloze, "......");
	this.checker = () => {
		if(userInput = this.cloze){
			console.log("You got it right!!");
		}else{
			console.log("Wrong, the answer is" + this.cloze);
		}
	}
	this.push = () => {
		questionArray.push(this);
	}
}

var jamestown = new ClozeCard("Jamestown, the first permanent English settlement, was founded in 1607.", "Jamestown")
	jamestown.push();

var louisiana = new ClozeCard("President Thomas Jefferson purchased the Louisiana Territory from France in 1803.", "Louisiana")
	louisiana.push();

// console.log(louisiana.question);
// console.log(louisiana.cloze);
// console.log(louisiana.preparedQuestion);
// console.log(questionArray);
// console.log(questionArray[questionCount].preparedQuestion);

function askQuestions(){
		// var Count = questionCount;
		// console.log(Count);
		console.log("37  " + questionArray[questionCount].preparedQuestion);

	 //    inquirer.prompt([
	 //    {
	 //      	name: questionArray[Count],
	 //         message: questionArray[Count].preparedQuestion,	        
	 //    }]).then(function(answer) {
	 //    	userInput = answer;
	 //    	questionArray[Count].checker();	    	
	 //    });
	 //    questionCount++;
		// askQuestions();
}
	askQuestions();
