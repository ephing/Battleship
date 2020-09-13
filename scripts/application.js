/**
 * Contains functions that manipulate game progression and also the draw function and info for player interaction with game
 * @author Ethan Grantz, QiTao Weng
 * @class
 */
class Application {
    constructor() {
        this._init();
    }

    /**
     * initializes event listeners
     * @listens Document:DOMContentLoaded
     * @listens Document:keydown
     */
    _init() {
        // Makes the boat count selection button visible once everything is loaded
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelector("#button").style.visibility = "visible";
        });

        // keyboard key code values from https://javascript.info/keyboard-events
        // Detects key presses and executes functions based on them

        document.addEventListener("keydown", (e) => {
            if (currentStage === 0) {
                let player;
                if (currentPlayer === 1) player = p1.boatBoard;
                else player = p2.boatBoard;
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
            } else if (currentStage === 1) {
                //controls for if we're doing the shooting part of the game
            }
            //have a default value like currentStage = -1 for when there should be no controls
        });

    }

    /**
     * Initializes some important game info
     * @function
     */
    main() {
        let selector = document.querySelector("#boatSelect");
        let boatCount = parseInt(selector.options[selector.selectedIndex].value);
        selector.style.visibility = "hidden";
        window.currentPlayer = 2;
        //stage -1: default value, no controls
        //stage 0: placing boats phase
        //stage 1: choosing where to shoot opponent phase
        //this is used so that we can make the keyboard inputs do different things in different phases of the game
        window.currentStage = -1;
        window.fireStage = false;//used to make the game loop run correctly
        document.querySelector("#boatCount").outerHTML = "";
        window.p1 = new Player(boatCount, 1);
        window.p2 = new Player(boatCount, 2);

        //this button make the player finish their boat moving phase
        document.querySelector("#button").outerHTML = "<button id=\"button\" type=\"button\" onclick=\"application.stageInit(-1)\">Confirm</button>";

        this.stageInit(-1);
    }

    /**
     * Draws player ui in the div block with id="gameBoard"
     * @function
     */
    drawBoard() {
        document.querySelector("#gameBoard").style.visibility = "visible";
        let b;
        let opponentb;
        if (currentPlayer === 1) {
            b = p1.boatBoard;
            opponentb = p2.hitBoard;
        } else {
            b = p2.boatBoard;
            opponentb = p1.hitBoard;
        }

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
                if (b.isAHit(j, i)) {
                    let bid = b.getBoatID(j, i);
                    if (b.hasBeenHit[i][j]) {
                        document.getElementById('spot2' + i + j).className = "hit";
                        document.getElementById('spot2' + i + j).innerHTML = bid;
                    } else {
                        document.getElementById('spot2' + i + j).className = "boat";
                        document.getElementById('spot2' + i + j).innerHTML = bid;
                    }
                } else {
                    document.getElementById('spot2' + i + j).className = "ocean";
                    document.getElementById('spot2' + i + j).innerHTML = "";
                }
            }
        }
    }

    /**
     * Makes changes to graphics and player controls corresponding to current game stage
     * @param {number} stage -1,0,or 1, for the various stages of the game
     * @function
     */
    stageInit(stage) {
        if (stage === -1) {
            currentStage = -1;
            if (currentPlayer === 1) {
                currentPlayer = 2;
            } else {
                currentPlayer = 1;
            }
            document.querySelector("#gameBoard").style.visibility = "hidden";
            document.querySelector("#button").style.visibility = "hidden";
            document.querySelector("#boatSelect").style.visibility = "hidden";
            if (fireStage == false) {
                document.querySelector("#playerConfirmation").innerHTML = "<h2>Player " + currentPlayer + " Turn!</h2><button onclick=\"application.stageInit(0)\">Confirm</button>";
            } else {
                document.querySelector("#playerConfirmation").innerHTML = "<h2>Player " + currentPlayer + " Turn to attack!</h2><button onclick=\"application.stageInit(1)\">Attack</button>";
            }
        } else if (stage === 0) {
            currentStage = 0;
            document.querySelector("#playerConfirmation").innerHTML = "";
            let selector = document.querySelector("#boatSelect");
            selector.innerHTML = "";
            //I wanted to use the same <select> block for both choosing boatCount and
            //for selecting which boat to move. This loop resizes the selector if you choose fewer than 5 boats
            //This is subject to change later as it causes clutter whether I put this here or add another
            //<select> in index.html
            for (let i = 0; i < p1.boatBoard.boatCount; i++) {
                selector.innerHTML += "<option value=\"" + (i + 1) + "\">" + (i + 1) + "</option><br />";
            }
            selector.style.visibility = "visible";
            document.querySelector("#button").style.visibility = "visible";
            document.querySelector("#gameBoard").style.visibility = "visible";
            this.drawBoard(currentPlayer);
            if (currentPlayer === 2) {
                fireStage = true;
            }
        } else if (stage === 1) {
            currentStage = 1;
            document.querySelector("#playerConfirmation").innerHTML = "";
            document.querySelector("#gameBoard").style.visibility = "visible";
            document.querySelector("#infoTable").style.visibility = "hidden";
            document.querySelector("#boatSelect").style.visibility = "hidden";
            document.querySelector("#row").style.visibility = "visible";
            document.querySelector("#col").style.visibility = "visible";
            document.querySelector("#gameInfo").innerHTML = "Select coordinate to attack " + "</h2><button onclick=\"application.fire()\">Fire</button>";
            this.drawBoard(currentPlayer);

        }
    }

    /**
     * Game stage that allows you to select row and column and fire at a position
     * @function
     */
    fire() {
        // checkWin needs to be done within this function and boatCount should lose one point for every hit
        //p1.boatCount = 0;// --test for full game runthrough
        //parse selector ints for row and column selection
        let row = document.querySelector("#row");
        let col = document.querySelector("#col");
        let rowChoice = parseInt(row.options[row.selectedIndex].value);
        let colChoice = parseInt(col.options[col.selectedIndex].value);
        //currentPlayer attacks other player
        if (currentPlayer === 1) {
            if (p2.boatBoard.hasBeenHit[rowChoice][colChoice] === true) {
                document.querySelector("#gameInfo").innerHTML = "Firing at same position, please re-enter " + "</h2><button onclick=\"application.fire()\">fire</button>";
                return;
            } else {
                // flags p2 boatBoard's hasBeenHit array for position
                p2.boatBoard.hasBeenHit[rowChoice][colChoice] = true;
                // flags attempt for hitBoard
                p2.hitBoard.attempt[rowChoice][colChoice] = true;
                // checks if col, row is a hit
                if (p2.boatBoard.isAHit(colChoice, rowChoice)) {
                    // flags if shot landed for hitBoard
                    p2.hitBoard.hit[rowChoice][colChoice] = true;
                    p2.boatCount -= 1;
                }
            }
        } else {
            if (p1.boatBoard.hasBeenHit[rowChoice][colChoice] === true) {
                document.querySelector("#gameInfo").innerHTML = "Firing at same position, please re-enter " + "</h2><button onclick=\"application.fire(-1)\">fire</button>";
                return;
            } else {
                p1.boatBoard.hasBeenHit[rowChoice][colChoice] = true;
                p1.hitBoard.attempt[rowChoice][colChoice] = true;
                if (p1.boatBoard.isAHit(colChoice, rowChoice)) {
                    p1.hitBoard.hit[rowChoice][colChoice] = true;
                    p1.boatCount -= 1;
                }
            }
        }
        this.checkWin();
    }

    checkWin() {
        if (p1.boatCount === 0) {
            document.querySelector("#gameBoard").style.visibility = "hidden";
            document.querySelector("#boatSelect").style.visibility = "hidden";
            document.querySelector("#playerConfirmation").innerHTML = "<h2>Player 2 " + " Wins !</h2><button onclick=\"window.location.reload()\">Play Again</button>";
        } else if (p2.boatCount === 0) {
            document.querySelector("#gameBoard").style.visibility = "hidden";
            document.querySelector("#boatSelect").style.visibility = "hidden";
            document.querySelector("#playerConfirmation").innerHTML = "<h2>Player 1 " + " Wins !</h2><button onclick=\"window.location.reload()\">Play Again</button>";
        } else {
            this.drawBoard(currentPlayer);
            document.querySelector("#gameInfo").innerHTML = "" + "</h2><button onclick=\"application.stageInit(-1)\">Continue</button>";
        }
    }
}
