const userInterface = {
    drawOnce: false,
    currentBoardSpot: undefined, // a key that will be used to plot the tile the turn player has selected

    winDrawMsg: function( turnplayer, drawCheck ){
        let msgOutput = ``;
        this.$userMsg.text(``);
        if (drawCheck){
            msgOutput = `This game is a draw! Loading next game...`;
        }else{
            msgOutput = `${turnplayer} is the winner! Loading next game...`;
        };
        this.$winOrDraw.text(msgOutput).animate({
            opacity: 0
        },2500, function(){
            userInterface.$winOrDraw.text(``).css(`opacity`, `1`);
        });
        setTimeout(function(){
            $(`.restart`).click();
        },2500);
    },

    turnMessage: function(turnPlayerSymbol, gameState, turnState){
        if ( gameState === true && turnState === false){
            this.$userMsg.text(`The ${turnPlayerSymbol} player still hasn't taken their turn!`);
        } else {
            this.$userMsg.text(`It is ${turnPlayerSymbol} player's turn!`);
        }
    },

    //clears the game board when called
    clearBoard: function(){
        $(`td`).html("").removeClass("blue red used");
        this.$userMsg.text(`The game has been restarted!`).animate({
            opacity: 0
        },2000, function(){
            userInterface.$userMsg.text(``).css(`opacity`, `1`);
        });
        this.drawOnce = false;
    },

    //Switches between UI button holders
    toggleHolders: function(buttonPressed){
        if ( buttonPressed.hasClass(`cross`) || buttonPressed.hasClass(`circle`)){
            this.$buttonHolders.toggle();
        }else if ( buttonPressed.hasClass(`restart`)){
            gameLogic.restartGame();
            this.clearBoard();
            this.$buttonHolders.toggle();
        };
    },
    
    //determines which UI button has been pressed
    checkButton: function(buttonPressed){
        if (buttonPressed.hasClass(`cross`)){
            const priority = `X`;
            gameLogic.gameStart(priority, `O`);
            this.toggleHolders(buttonPressed);
        }else if (buttonPressed.hasClass(`circle`)){
            const priority = `O`;
            gameLogic.gameStart(priority, `X`);
            this.toggleHolders(buttonPressed);
        }else if (buttonPressed.hasClass(`pass`)){
            gameLogic.switchTurn();
            this.drawOnce = false;
        }else{
            this.toggleHolders(buttonPressed);
        }   
    },

    //function checks whether or not the clicked tile is being used and draws according to whos turn it is or erases it if the tile was filled this turn
    fillGrid: function(gridContents, gridLocation){
        if (gridContents === ``){
            if (gameLogic.currentPlayerTurn === `X`){
                gridLocation.addClass(`blue`).html(`X`);// X tiles are always blue
                this.drawOnce = true;
            }else{
                gridLocation.addClass(`red`).html(`O`);// O tiles are always red
                this.drawOnce = true;
            }
        }else if (gridContents === gameLogic.currentPlayerTurn &&gridLocation.hasClass(`used`) === false){
            gridLocation.removeClass(`blue red`).html(``);
            this.drawOnce = false;
            gameLogic.turnCompleteToggle();
        };
    },

    //Ensures that the game is running before drawing on the board
    drawOrErase: function(gridLocation){
        if ( gridLocation.html() === `` && this.drawOnce === false && gameLogic.gameOnGoing === true){
            this.fillGrid(gridLocation.html(), gridLocation);
            this.currentBoardSpot = gridLocation;
            gameLogic.turnCompleteToggle();
        }else if (gameLogic.gameOnGoing === true && gridLocation.html() !== ``) {
            this.fillGrid(gridLocation.html(), gridLocation);
            this.currentBoardSpot = undefined;
        };
    },
};
//prepares event listeners and userInterface object keys to be used during UI management
$(document).ready(function(){
    $(`.userButton`).on(`click`,function(){
        userInterface.checkButton($(this));
    });
    $(`td`).on(`click`, function(){
        userInterface.drawOrErase($(this));
    })
    userInterface.$buttonHolders = $(`.buttonHolder`);
    userInterface.$userMsg = $(`.userMessages p`);
    userInterface.$winOrDraw = $(`.winOrDrawMsg p`);
});