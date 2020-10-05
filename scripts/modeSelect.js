application = null



document.addEventListener("DOMContentLoaded", () => {
    wrapper =   document.getElementById("startWrapper");
    modeMenu =  wrapper.outerHTML;


    document.getElementById("AIMode").addEventListener("click", function() {
        //   document.getElementById("demo").innerHTML = "Hello World";
            console.log("Slected AI Mode");
            AIDifficulty = document.getElementById("AIModeSelect").value;
            console.log("AI Difficulty = "+ AIDifficulty);

            hideStart(wrapper);
            application = new AI_Application(AIDifficulty);
            showGame()
        });


    document.getElementById("playerMode").addEventListener("click", function() {
            console.log("Selected Player Mode")
            application = new PVP_Application();

            hideStart(wrapper);
            showGame()
            });
    // this.showHTML("#button");
    // need to make this vissible


//hides the HTML
    function hideHTML(selector) {
        document.querySelector(selector).style.visibility = "hidden";
    }
    //replaced them with this regex: document.querySelector\(("[^"]*")\).style.visibility = "hidden"

//shows the HTML
    function showHTML(selector){
         document.querySelector(selector).style.visibility = "visible";
     }

//Hides the start
    function hideStart(wrapper){
        wrapper.outerHTML = "";
    }

//Shows the game
    function showGame(){
        showHTML("#inputs");
        showHTML("#boatCount");
        showHTML("#button")
        // showHTML("#scoreboard")
    }


});
