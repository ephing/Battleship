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
    if (currentStage === 0) {
        let player;
        if (currentPlayer === 1) player = p1.boatBoard;
        else player = p2.boatBoard;
        let selector = document.querySelector("#boatSelect");
        let boatChoice = parseInt(selector.options[selector.selectedIndex].value) - 1;
		switch(e.which) {
			case 37:
				player.moveHori(boatChoice, -1);
				break;
			case 38:
				player.moveVerti(boatChoice, -1);
				break;
			case 39:
				player.moveHori(boatChoice, 1);
				break;
			case 40: 
				player.moveVerti(boatChoice, 1);
				break;
			case 32:
				player.rotater(boatChoice);
				break;
			default: return;
		}
		e.preventDefault(); //Prevent arrow keys and space from interacting with wrong selectors
        drawBoard(currentPlayer);
    } else if (currentStage === 1) {
        //controls for if we're doing the shooting part of the game
    }
    //have a default value like currentStage = -1 for when there should be no controls
});
