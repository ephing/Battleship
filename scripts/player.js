/**
 * Player class for each player
 * @class
 */
class Player {
    /**
     * Constructor for Player class
     * @param boatNum number of boats on the board
     * @param id player identifier
     */
    constructor(boatNum, id) {
        this.playerID = id;
        this.boatBoard = new BoatBoard(boatNum);
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
