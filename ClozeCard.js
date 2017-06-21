//declare empty arrays
var questionArray = [],
	clozeArray = [],
	fullCLozeArray = [];

//constructor to build cloze cards
function ClozeCard(question, cloze){

	this.question = question;
	this.cloze = cloze;
	this.preparedQuestion = (this.question).replace(this.cloze, "......");

 	this.push = () => {

		questionArray.push(this.preparedQuestion);
		clozeArray.push(this.cloze);

	};
}

//create cards using constructor
var jamestown = new ClozeCard("Jamestown, the first permanent English settlement, was founded in 1607.", "Jamestown");	
var louisiana = new ClozeCard("President Thomas Jefferson purchased the Louisiana Territory from France in 1803.", "Louisiana");
var yorktown = new ClozeCard("The British defeat at Yorktown, Virginia by George Washington’s troops signaled the end of the American Revolution.", "Yorktown");
var gettysburg = new ClozeCard("The Battle of Gettysburg was the turning point in the Civil War for the North.  Confederate troops were forced to retreat and never invaded the North again.", "Gettysburg");
var separation = new ClozeCard("Separation of Powers is a system in which each branch of government has its own powers.", "Separation");
var democracy = new ClozeCard("A Democracy is a form of government that is run for and by the people, giving people the supreme power.", "Democracy");
var monroe = new ClozeCard("The Monroe Doctrine was a foreign policy statement delivered by President James Monroe stating that 1) the U.S. would not interfere in European affairs, and 2) that the western hemisphere was closed to colonization and/ or interference by European nations.", "Monroe");

//package data for export
jamestown.push();
louisiana.push();
yorktown.push();
gettysburg.push();
separation.push();
democracy.push();
monroe.push();
fullCLozeArray.push(questionArray);
fullCLozeArray.push(clozeArray);

//export data
module.exports = fullCLozeArray;
