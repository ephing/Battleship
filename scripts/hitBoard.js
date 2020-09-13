/**
 * Contains Hit Board
 * @author QiTao Weng
 * @class
 */
class HitBoard {
    /**
     * Constructor for boatBoard
     * @param {number} boatNum number of boats on the board
     */
    constructor() {
        this.hit = [];
        this.miss = [];
    }

    /**
     * Function to check whether position is a hit
     * @param {number} column index correlating to column (0-8)
     * @param {number} row index correlating to row (0-8)
     * @returns {boolean} true if is hit, otherwise false
     */
    isHit(column, row) {
        for (let b of this.boats) {
            for (let h of b.hitCoordinates) {
                if (h[0] === column && h[1] === row) return true;
            }
        }
        return false;
    }

    /**
     * Function to check whether position is a miss
     * @param {number} column index correlating to column (0-8)
     * @param {number} row index correlating to row (0-8)
     * @returns {boolean} true if is hit, otherwise false
     */
    isMiss(column, row) {

    }

}