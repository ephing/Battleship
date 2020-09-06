/**
* @author Ethan Grantz
* Contains info for player interaction with game
*/

/**
* Makes the boat count selection button visible once everything is loaded
*/
document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#button").style.visibility = "visible";
});

//codes from https://javascript.info/keyboard-events
/**
* Detects key presses and executes functions based on them
*/
document.addEventListener("keydown", (e) => {
	if (currentStage == 0) {
		let player;
		if (currentPlayer == 1) player = p1.boatBoard;
		else player = p2.boatBoard;
		let selecter = document.querySelector("#boatSelect");
		let boatChoice = parseInt(selecter.options[selecter.selectedIndex].value) - 1;
		if (e.code == "ArrowUp") {
			player.moveVerti(boatChoice, -1);
		}
		if (e.code == "ArrowDown") {
			player.moveVerti(boatChoice, 1);
		}
		if (e.code == "ArrowLeft") {
			player.moveHori(boatChoice, -1);
		}
		if (e.code == "ArrowRight") {
			player.moveHori(boatChoice, 1);
		}
		if (e.code == "Space") {
			player.rotater(boatChoice);
		}
		drawBoard(currentPlayer);
	}
	else if (currentStage == 1) {
		//controls for if we're doing the shooting part of the game
	}
	//have a default value like currentStage = -1 for when there should be no controls
});
