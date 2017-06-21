//declare empty arrays
var frontArray = [],
	backArray = [],
	fullBasicArray= [];

//constructor to build basic cards
function BasicCard(front,back){
	if (this instanceof BasicCard){
		this.front = front;
		this.back = back;

		this.push = () => {
			frontArray.push(this.front);
			backArray.push(this.back);
		}
	}else{

		return new BasicCard(front,back)
	}	
}
//create cards using constructor
var george = BasicCard("Who was the president (the first one from 1789-1797) who lived in Mount Vernon?", "George Washington"),	
	andrew = BasicCard("What president succeeded Abraham Lincoln when he was assassinated?", "Andrew Jackson"),
	brown = BasicCard("Whose raid on Harper's Ferry led to further tensions before the war?", "John Brown"),
	phila = BasicCard(" In what city was the Declaration of Independence signed?", "Philadelphia");

//package data for export
fullBasicArray.push(frontArray);
fullBasicArray.push(backArray);
george.push();
andrew.push();
brown.push();
phila.push();

//export data
module.exports = fullBasicArray;