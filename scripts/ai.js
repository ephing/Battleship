/**
 * @class AI
 */

 class AI{

    /** 
    * @param difficulty will go from 1 (easy), 2(medium), 3(Hard)
    */
    constructor(difficulty){

        this.difficulty=difficulty;

        //boatOnBoard saves boats numbers on an array.
        this.boatOnBoard=[];

        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){

                this.boatOnBoard[i][j]=0;
            }
        }

        
        this.boatNum=Math.floor((Math.random()*5)+1);
        this.setAIBoatBoard(boatNum);        

        this.hitBoard = new HitBoard();
        
        //bottom sets hit points
        if(this.boatNum === 1){
            this.boatCount = this.boatNum;
        }
        else if(this.boatNum === 2){
            this.boatCount = 3;
        }
        else if(this.boatNum === 3){
            this.boatCount = 6;
        }
        else if(this.boatNum === 4){
            this.boatCount = 10;
        }
        else if(this.boatNum === 5){
            this.boatCount = 15;
        }
    }
    
    getBoat(num) {
        return this.boatBoard.boats[num];
    }

//DIFFICULTY 2 STILL NEEDS TO BE FINISHED
    fire(Enemy){
        
        if(this.difficulty==1){
            
            let hitFound=false;
        
            while(hitFound=false){

                let col = this.randomCol(Math.floor((Math.random()*9)+1));
                let row= Math.floor((Math.random()*9)+1);

                if(Enemy.boatBoard.hasBeenHit[row][col]!=true){
        
                    Enemy.boatBoard.hasBeenHit[row][col]=true;
                    Enemy.hitBoard.hit[row][col]=true;
                    hitFound=true;
                    
                }
            }
        }

        if(this.difficulty==2){
            //set orthogonal fire once it hits

        }

        if(this.difficulty==3){
            let hitFound=false;
        
            while(hitFound=false){

                let col = this.randomCol(Math.floor((Math.random()*9)+1));
                let row= Math.floor((Math.random()*9)+1);

                if(Enemy.boatBoard.hasBeenHit[row][col]!=true){
                    //in isAHit col and row are flipped since that's how it used for p1 and p2 in application.js
                    if(Enemy.boatBoard.isAHit(col,row)){
                        Enemy.boatBoard.hasBeenHit[row][col]=true;
                        
                        Enemy.hitBoard.hit[row][col]=true;
                        hitFound=true;
                    }

                }
                

            }
        }
    }
//sets up boatOnBoard
    setAIBoatBoard(boatNum){

        for(let bNum=5; bNum>0; bNum--){

            if(bNum===5){
             
                let vert1horz2= Math.floor((Math.random()*2)+1);
                
                let col = Math.floor((Math.random()*4)+0);
                let row= Math.floor((Math.random()*4)+0);
                if(vert1horz2===1){
                    for(let i=0; i<bNum; i++){
                        this.boatOnBoard[row+i][col]=bNum;
                    }
                }
                else{
                    for(let i=0; i<bNum; i++){
                        this.boatOnBoard[row][col+i]=bNum;
                    }
                }
             
            }
            else{
                let boatPlaced=false;
                while(boatPlaced=false){
                    let vert1horz2= Math.floor((Math.random()*2)+1);
                    let col = Math.floor((Math.random()*8)+0);
                    let row= Math.floor((Math.random()*8)+0);
                    if(canBeSet(row,col,bNum,vert1horz2)!=0){
                        
                        if(this.canBeSet(row,col,bNum,vert1horz2)=8){
                            for(let upn=row; up<row+bNum; up++){
                                this.boatOnBoard[upn][col]=bNum;
                                                      
                            }
                        }
                        if(this.canBeSet(row,col,bNum,vert1horz2)=2){
                            for(let downn=row; down>row-bNum; down--){
                                this.boatOnBoard[downn][col]=bNum;
                            }
                        }
                        if(this.canBeSet(row,col,bNum,vert1horz2)=4){
                            for(let leftn=col; left>col-bNum; left--){
                                this.boatOnBoard[row][leftn]=bNum;
                                   
                            }
                        }
                        if(this.canBeSet(row,col,bNum,vert1horz2)=6){
                            for(let rightn=col; right<col+bNum; right++){
                                this.boatOnBoard[row][rightn]=bNum;
                            }
                        }
                        boatPlaced=true;
                    }

                }

            }  
        }
    }


    //check to see if boat can be set for SetAIBoatBoard function
    /*
    *all lay according to starting row
    *code returns 0, can't lay boat
    *code returns 8, boat lays up,
    *code returns 2, boat lays down,
    *code returns 4, boat lays left, 
    *code returns 6, boat lays right,

    */
    canBeSet(row,col,bNum,vert1ORhorz2){
        
        let code=0
        if(vert1ORhorz2===1){
            let up=true;
            let down=true;
            for(let upn=row; up<row+bNum; up++){
                if(this.boatOnBoard[upn][col]!=0){
                    up=false;
                }

            }

            for(let downn=row; down>row-bNum; down--){
                if(this.boatOnBoard[downn][col]!=0){
                    down=false;
                }
            }

            if(up===true){
                code=8;
            }
            if(down===true){
                code =2;
            }
            
        }
        else{
            left=true;
            right=true;

            for(let leftn=col; left>col-bNum; left--){
                if(this.boatOnBoard[row][leftn]!=0){
                    left = false;
                }
            }
            for(let rightn=col; right<col+bNum; right++){
                if(this.boatOnBoard[row][rightn]!=0){
                    right=false;
                }
            }
            if(left===true){
                code=4;
            }
            if(right===true){
                code=6;
            }
        }
        
        return code;

    }

    receiveShot(row,col){
        let status ="";

        if(this.hitBoard.hit[row][col]===false){
            if(this.boatOnBoard[row][col]!=0){
                status="You hit a boat that belongs to the AI!!";
                this.boatCount=this.boatCount-1;
            }
            else{
                status="You hit the ocean";
            }
            this.hitBoard.hit[row][col]===true;

        }
        else{
            status = "this location has already been hit";
        }
        return status;
    }

    randomCol(num){
        if(num===1){
            return "A"
        }
        if(num===2){
            return "B"
        }
        if(num===3){
            return "C"
        }
        if(num===4){
            return "D"
        }
        if(num===5){
            return "E"
        }
        if(num===6){
            return "F"
        }
        if(num===7){
            return "G"
        }
        if(num===8){
            return "H"
        }
        if(num===9){
            return "I"
        }
  
    }
 }
