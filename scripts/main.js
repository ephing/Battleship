/**
* Initializes some important game info (plus some other stuff that will be changed later)
*/
main = function() {
	let selecter = document.querySelector("#boatSelect");
	let boatCount = selecter.options[selecter.selectedIndex].value;
	selecter.style.visibility = "hidden";
	currentPlayer = 2;
	//stage -1: default value, no controls
	//stage 0: placing boats phase
	//stage 1: choosing where to shoot opponent phase
	//this is used so that we can make the keyboard inputs do different things in different phases of the game
	currentStage = -1;
	document.querySelector("#boatCount").outerHTML = "";
	p1 = new Player(boatCount, 1);
	p2 = new Player(boatCount, 2);
	
	//this button make the player finish their boat moving phase
	document.querySelector("#button").outerHTML = "<button id=\"button\" type=\"button\" onclick=\"stageInit(-1)\">Confirm</button>";
	
	stageInit(-1);
}

/**
* Draws player ui in the div block with id="game" (currently only the boat board)
*/
drawBoard = function() {
	document.querySelector("#game").innerHTML = "";
	document.querySelector("#game").style.visibility = "visible";
	let topText = "";
	for (let i = 0; i < 9; i++) {
		topText += "&nbsp&nbsp&nbsp" + String.fromCharCode(65 + i);
	}
	topText += "<br />_|___|___|___|___|___|___|___|___|___|<br />"
	document.querySelector("#game").innerHTML += topText;
	let b;
	if (currentPlayer == 1) b = p1.boatBoard;
	else b = p2.boatBoard;
	for (let i = 0; i < 9; i++) { //row
		document.querySelector("#game").innerHTML += i;
		for (let j = 0; j < 9; j++) { //column
			//check if boat is at current coordinates
			if (b.isAHit(j,i)) {
				let boatID = b.getBoatID(j,i);
				//color it red if its already been hit
				if (b.hasBeenHit[i][j]) {
					document.querySelector("#game").innerHTML += "| <span id=\"hit\">" + boatID + "</span>&nbsp";
				}
				else document.querySelector("#game").innerHTML += "|&nbsp" + boatID + "&nbsp";
			} else {
				document.querySelector("#game").innerHTML += "|&nbsp&nbsp&nbsp";
			}
		}
		document.querySelector("#game").innerHTML += "|<br />&nbsp|___|___|___|___|___|___|___|___|___|<br />";
	}
}

stageInit = function(stage) {
	if (stage == -1) {
		currentStage = -1;
		if (currentPlayer == 1) currentPlayer = 2;
		else currentPlayer = 1;
		document.querySelector("#game").innerHTML = "";
		document.querySelector("#playerConfirmation").innerHTML = "<h2>Player " + currentPlayer + " Turn!</h2><button onclick=\"stageInit(0)\">Confirm</button>";
		document.querySelector("#button").style.visibility = "hidden";
		document.querySelector("#boatSelect").style.visibility = "hidden";
	} else if (stage == 0) {
		currentStage = 0;
		document.querySelector("#playerConfirmation").innerHTML = "";
		let selecter = document.querySelector("#boatSelect");
		selecter.innerHTML = "";
		//I wanted to use the same <select> block for both choosing boatCount and
		//for selecting which boat to move. This loop resizes the selecter if you choose fewer than 5 boats
		//This is subject to change later as it causes clutter whether I put this here or add another
		//<select> in index.html
		for (let i = 0; i < p1.boatBoard.boatCount; i++) {
			selecter.innerHTML += "<option value=\"" + (i + 1) + "\">" + (i + 1) + "</option><br />";
		}
		selecter.style.visibility = "visible";
		document.querySelector("#button").style.visibility = "visible";
		drawBoard(currentPlayer);
	} else if (stage == 1) {
		currentStage = 1;
		document.querySelector("#playerConfirmation").innerHTML = "";
	}
}
