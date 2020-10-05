/**
 * Contains functions that manipulate game progression and also the draw function and info for player interaction with game
 * @author Ethan Grantz, QiTao Weng
 * @class
 */
class AI_Application {
    constructor() {
        this._init();
    }

    /**
     * initializes event listeners
     * @listens Document:DOMContentLoaded
     * @listens Document:keydown
     */
    _init(difficulty) {
        // Makes the boat count selection button visible once everything is loaded
        document.addEventListener("DOMContentLoaded", () => {
            // this.showHTML("#button");
            // need to make this vissible 
        });
        console.log("AI App")

        window.ai = new AI(difficulty)

        // keyboard key code values from https://javascript.info/keyboard-events
        // Detects key presses and executes functions based on them

        document.addEventListener("keydown", (e) => {
            if (currentStage === 0) {
                let player;
                if (currentPlayer === 1) player = p1.boatBoard;
                let selector = document.querySelector("#boatSelect");
                let boatChoice = parseInt(selector.options[selector.selectedIndex].value) - 1;
                switch (e.key) {
                    case "ArrowLeft": //left
                        player.moveHori(boatChoice, -1);
                        break;
                    case "ArrowUp": //up
                        player.moveVerti(boatChoice, -1);
                        break;
                    case "ArrowRight": //right
                        player.moveHori(boatChoice, 1);
                        break;
                    case "ArrowDown": //down
                        player.moveVerti(boatChoice, 1);
                        break;
                    case " ": //space
                        player.rotator(boatChoice);
                        break;
                    default:
                        return;
                }
                e.preventDefault(); //Prevent arrow keys and space from interacting with wrong selectors
                this.drawBoard(currentPlayer);
            } 
        });

    }

    /**
     * Initializes some important game info
     * @function
     */
    main() {
        console.log("AI App Main")

        let selector = document.querySelector("#boatSelect");
        let boatCount = parseInt(selector.options[selector.selectedIndex].value);
        selector.style.visibility = "hidden";
        window.currentPlayer = 2;

        //stage -1: default value, no controls
        //stage 0: placing boats phase
        //stage 1: choosing where to shoot opponent phase
        //this is used so that we can make the keyboard work only on boat moving phase
        window.currentStage = -1;
        window.fireStage = false;//used to make the game loop run correctly
        //outerHTML
        document.querySelector("#boatCount").innerHTML = "";
        window.p1 = new Player(boatCount, 1);


        // window.p2 = new Player(boatCount, 2);
        
        

        //this button make the player finish their boat moving phase
        document.querySelector("#button").outerHTML = "<button id=\"button\" type=\"button\" onclick=\"select.play(); application.stageInit(-1);\">Confirm</button>";
		
        this.stageInit(-1);
    }

    /**
     * Draws player ui in the div block with id="gameBoard"
     * @function
     */
    drawBoard() {
        this.showHTML("#gameBoard");
        this.showHTML("#infoTabel");
        let b;
        let opponentb;
        let bHit;
        
        if (currentPlayer === 1) {
            b = p1.boatBoard;
            // This is added so that the spots the opponet has hit show up on the players board
            bHit = p1.hitBoard;
            opponentb = ai.hitBoard;
            // opponentb = p2.hitBoard;
            for (let i = 0; i < 9; i++) { //row
                for (let j = 0; j < 9; j++) { //column
                    //check hitboard info
                    if (opponentb.attempt[i][j] && opponentb.hit[i][j]) {
                        document.getElementById('spot1' + i + j).className = "hit";
                    } else if (opponentb.attempt[i][j]) {
                        document.getElementById('spot1' + i + j).className = "miss";
                    } else {
                        document.getElementById('spot1' + i + j).className = "ocean";
                    }
                    //boatboard info
                    if (b.isAHit(j, i)) {
                        let bid = b.getBoatID(j, i);
                        if (b.hasBeenHit[i][j]) {
                            document.getElementById('spot2' + i + j).className = "hit";
                            document.getElementById('spot2' + i + j).innerHTML = bid;
                        } else {
                            document.getElementById('spot2' + i + j).className = "boat";
                            document.getElementById('spot2' + i + j).innerHTML = bid;
                        }
                    }
                    else if(bHit.attempt[i][j]){
                            document.getElementById('spot2' + i + j).className = "miss";
                    }
                    else {
                        document.getElementById('spot2' + i + j).className = "ocean";
                        document.getElementById('spot2' + i + j).innerHTML = "";
                    }
                }
            }
        }
        // } else {          
        //     b = p2.boatBoard;
        //     // This is added so that the spots the opponet has hit show up on the players board
        //     bHit = p2.hitBoard;
        //     opponentb = p1.hitBoard;
        // }


    }

    /**
     * Makes changes to graphics and player controls corresponding to current game stage
     * @param {number} stage -1,0,or 1, for the various stages of the game
     *  //stage -1: default value, no controls
        //stage 0: placing boats phase
        //stage 1: choosing where to shoot opponent phase
        //this is used so that we can make the keyboard work only on boat moving phase
     * 
     * @function
     */
    stageInit(stage) {
        if (stage === -1) {
            currentStage = -1;
            if (currentPlayer === 1) {
                
                
                // currentPlayer = 2;
            } else {
                // AI's turn
                

                
                currentPlayer = 1;
            }
            this.hideHTML("#gameBoard");
            this.hideHTML("#infoTabel");
            this.hideHTML("#button");
            this.hideHTML("#boatSelect");
            this.hideHTML("#row");
            this.hideHTML("#col");

            try {
                this.hideHTML("#continueButton");
            } catch (error) {
                
            }

            if (fireStage == false) {
                document.querySelector("#playerConfirmation").innerHTML = "<h2>Player " + currentPlayer + " Turn!</h2><button onclick=\"select.play(); application.stageInit(0);\">Confirm</button>";
            } else {
                document.querySelector("#playerConfirmation").innerHTML = "<h2>Player " + currentPlayer + " Turn to attack!</h2><button onclick=\"select.play(); application.stageInit(1);\">Attack</button>";
            }
        } else if (stage === 0) {
            if (currentPlayer === 1) {
                currentStage = 0;
                document.querySelector("#playerConfirmation").innerHTML = "";
                let selector = document.querySelector("#boatSelect");
                selector.innerHTML = "";
                for (let i = 0; i < p1.boatBoard.boatCount; i++) {
                    selector.innerHTML += "<option value=\"" + (i + 1) + "\">" + (i + 1) + "</option><br />";
                }
                selector.style.visibility = "visible";
                this.showHTML("#button");
                this.showHTML("#gameBoard");
                this.showHTML("#infoTabel");
                this.drawBoard(currentPlayer);
                
                fireStage = true;
                
            }
           
        } else if (stage === 1) {
            currentStage = 1;
            document.querySelector("#playerConfirmation").innerHTML = "";
            this.showHTML("#infoTabel");
            this.hideHTML("#infoTable");
            this.hideHTML("#boatSelect");
            this.showHTML("#row");
            this.showHTML("#col");
            // ;
            document.querySelector("#gameInfo").innerHTML = "Select coordinate to attack " + "</h2><button onclick=\"select.play(); application.fire(); \">Fire</button>";
            this.drawBoard(currentPlayer);

        }
    }

    aiTurn(){
        console.log("AI turn");
    }
    /**
     * Game stage that allows you to select row and column and fire at a position
     * @function
     */
    fire() {
		document.querySelector("#gameInfo").innerHTML = "";
		// checkWin needs to be done within this function and boatCount should lose one point for every hit
		//p1.boatCount = 0;// --test for full game runthrough
		//parse selector ints for row and column selection
		let row = document.querySelector("#row");
		let col = document.querySelector("#col");
		let rowChoice = parseInt(row.options[row.selectedIndex].value);
		let colChoice = parseInt(col.options[col.selectedIndex].value);
        
        //currentPlayer attacks other player
		if (currentPlayer === 1) {
			if (ai.hitBoard.hit[rowChoice][colChoice] === true) {
				document.querySelector("#gameInfo").innerHTML = "Firing at same position, please re-enter " + "</h2><button onclick=\"select.play(); application.fire();\">fire</button>";
				return;
			} else {
                
                //function below will set ai.hitBoard.hit[rowChoice][colChoice] to true and lower AI hp by one 
                ai.takeShot(rowChoice,colChoice);

				document.querySelector("#cannon").play();
				setTimeout(() => {
					// flags p2 boatBoard's hasBeenHit array for position
   
					if (ai.hitBoard.hit[rowChoice][colChoice]===false && ai.boatOnBoard[rowChoice][colChoice]!=0) {
						// flags if shot landed for hitBoard
						document.querySelector("#explosion").play();

						if (boatt.hitCounter === boatt.dimension) {
							boatt.isSunk = true;
							document.querySelector("#gameInfo").innerHTML = "You sunk your opponent's 1x" + boatt.dimension + " boat! ";
						}
					}
					else {
						document.querySelector("#miss").play();
					}
				}, 2000);
			}
        } else
        {
            // to-do: AI
        }
        

		setTimeout(() => {
			this.checkWin();
		}, 2000);
    }

    checkWin() {
        if (p1.boatCount === 0) {
			document.querySelector("#victoryMusic").play();
			document.querySelector("#introMusic").pause();
            this.hideHTML("#gameBoard");
            this.hideHTML("#infoTabel");
            this.hideHTML("#boatSelect");
            document.querySelector("#playerConfirmation").innerHTML = "<h2>The AI Wins " + " Wins !</h2><button onclick=\"select.play(); window.location.reload();\">Play Again</button>";
        } else if (ai.AIhp() === 0) {
			document.querySelector("#victoryMusic").play();
			document.querySelector("#introMusic").pause();
            this.hideHTML("#gameBoard");
            this.hideHTML("#infoTabel");
            this.hideHTML("#boatSelect");
            document.querySelector("#playerConfirmation").innerHTML = "<h2>Player 1 " + " Wins !</h2><button onclick=\"select.play(); window.location.reload();\">Play Again</button>";
        } else {
            this.drawBoard(currentPlayer);
            document.querySelector("#gameInfo").innerHTML += "</h2><button id='continueButton' onclick=\"select.play(); application.stageInit(-1);\">Continue</button>";
        }
    }



    hideHTML(selector) {
        document.querySelector(selector).style.visibility = "hidden";
    }
    //replaced them with this regex: document.querySelector\(("[^"]*")\).style.visibility = "hidden"
    
     showHTML(selector){
         document.querySelector(selector).style.visibility = "visible";
     }
    
};









