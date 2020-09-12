/**
 * This is the boat class
 * @author Ethan Grantz
 * @class
 */
class Boat {
    /**
     * Constructor for the boat class
     * @param dim dimension for the boat
     * @param vertical orientation of the boat
     * @param startCoord starting coordinate of the boat
     */
    constructor(dim, vertical, startCoord) {
        //technically we only need the dim parameter, as we can just make vertical a default and sC can be inferred from dim.
        //however, I added the extra parameters to give creative freedom
        this.dimension = dim;
        this.isVertical = vertical;
        this.hitCoordinates = [];
        if (typeof startCoord == 'undefined' || startCoord > 5) startCoord = dim - 1;
        if (typeof vertical == 'undefined') this.isVertical = true;
        for (let i = 0; i < dim; i++) {
            if (vertical) {
                this.hitCoordinates.push([startCoord, i]);
            } else {
                this.hitCoordinates.push([i, startCoord]);
            }
        }
    }

    /**
     * This function adds or subtracts from the row coordinates of the boat
     * @function
     * @param {number} dir either -1 or 1 for up and down respectively
     */
    moveVert(dir) {
        for (let coord of this.hitCoordinates) {
            coord[1] += dir;
        }
    }

    /**
     * This function adds or subtracts from the column coordinates of the boat
     * @function
     * @param {number} dir either -1 or 1 for left and right respectively
     */
    moveHor(dir) {
        for (let coord of this.hitCoordinates) {
            coord[0] += dir;
        }
    }

    /**
     * This function rotates the boat about the top left corner
     * @function
     */
    rotate() {
        for (let coord of this.hitCoordinates) {
            if (this.isVertical) {
                if (coord === this.hitCoordinates[0]) continue;
                //look at this wacky formula I accidentally made up that gets the right boat coordinates
                coord[0] = coord[1] + coord[0] - this.hitCoordinates[0][1];
                coord[1] = this.hitCoordinates[0][1];
            } else {
                if (coord === this.hitCoordinates[0]) continue;
                coord[1] = coord[0] + coord[1] - this.hitCoordinates[0][0];
                coord[0] = this.hitCoordinates[0][0];
            }
        }
        this.isVertical = !this.isVertical;
    }
}
