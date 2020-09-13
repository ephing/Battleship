/**
 * Contains Hit Board, keeps track of shots taken and landed
 * @author QiTao Weng
 * @class
 */
class HitBoard {
    /**
     * Constructor for boatBoard
     */
    constructor() {
        this.attempt = [];
        this.hit = [];
        for (let i = 0; i < 9; i++) this.attempt.push([false, false, false, false, false, false, false, false, false]);
        for (let i = 0; i < 9; i++) this.hit.push([false, false, false, false, false, false, false, false, false]);
    }

    // /**
    //  * Function to check whether position has been hit
    //  * @param {number} row index correlating to row (0-8)
    //  * @param {number} column index correlating to column (0-8)
    //  * @returns {boolean} true if position has been hit/attempted, otherwise false
    //  */
    // hasBeenHit(column, row) {
    //     return attempt[row, column];
    // }
    //
    // /**
    //  * Function to check whether position is a hit
    //  * @param {number} column index correlating to column (0-8)
    //  * @param {number} row index correlating to row (0-8)
    //  * @returns {boolean} true if is a landed shot, otherwise false
    //  */
    // isHit(column, row) {
    //     return hit[row,column];
    // }

}