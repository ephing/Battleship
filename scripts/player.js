/**
 * Player class for each player
 * @class
 */
class Player {
    /**
     * Constructor for Player class
     * @param {number} boatNum number of boats on the board
     * @param {number} id player identifier
     */
    constructor(boatNum, id) {
        this.playerID = id;
        this.boatBoard = new BoatBoard(boatNum);
        this.hitBoard = new HitBoard();
        if(boatNum === 1){//boatNumber is measured by the amount of remaining hits
            this.boatCount = boatNum;
        }
        else if(boatNum === 2){
            this.boatCount = 3;
        }
        else if(boatNum === 3){
            this.boatCount = 6;
        }
        else if(boatNum === 4){
            this.boatCount = 10;
        }
        else if(boatNum === 5){
            this.boatCount = 15;
        }

        
        //also have like hitBoard or whatever else
    }

    /**
     * Returns a boat so you don't have to do p#.boatBoard.boats[num] every time you want to access a specific boat
     * @param {number} num ranging from 0 to 4, equal to boat length - 1, index of boat in boat array
     * @returns {Object} boat at specified index
     */
    //is there a way to use the get keyword when there's a parameter? This is a personal curiosity question, doesn't necessarily help the code
    getBoat(num) {
        return this.boatBoard.boats[num];
    }
}
