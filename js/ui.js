const userInterface = {
    drawOnce: false,
    currentBoardSpot: undefined,
    turnMessage: function(turnPlayerSymbol, gameState, turnState){
        if ( gameState === true && turnState === false){
            this.$userMsg.text(`The ${turnPlayerSymbol} player still hasn't taken their turn!`);
        } else {
            this.$userMsg.text(`It is ${turnPlayerSymbol} player's turn!`);
        }
    },

    clearBoard: function(){
        $(`td`).html("");
        $(`td`).removeClass("crossFilled circleFilled");
        this.$userMsg.text(`The game has been restarted!`);
        this.$userMsg.animate({
            opacity: 0
        },1500, function(){
            userInterface.$userMsg.text(``);
            userInterface.$userMsg.css(`opacity`, `1`);
        });
        this.drawOnce = false;
    },

    toggleHolders: function(buttonPressed){
        if ( buttonPressed.hasClass(`cross`) || buttonPressed.hasClass(`circle`)){
            this.$buttonHolders.eq(0).hide();
            this.$buttonHolders.eq(1).show();
        }else if ( buttonPressed.hasClass(`Restart`)){
            gameLogic.restartGame();
            this.clearBoard();
            this.$buttonHolders.eq(0).show();
            this.$buttonHolders.eq(1).hide();
        };
    },
    
    checkButton: function(buttonPressed){
        if (buttonPressed.hasClass(`cross`)){
            const priority = `X`;
            gameLogic.gameStart(priority, `O`);
            this.toggleHolders(buttonPressed);
        }else if (buttonPressed.hasClass(`circle`)){
            const priority = `O`;
            gameLogic.gameStart(priority, `X`);
            this.toggleHolders(buttonPressed);
        }else if (buttonPressed.hasClass(`Pass`)){
            gameLogic.switchTurn();
            this.drawOnce = false;
        }else{
            this.toggleHolders(buttonPressed);
        }   
    },

    fillGrid: function(gridContents, gridLocation){
        if (gridContents === ``){
            if (gameLogic.currentPlayerTurn === `X`){
                gridLocation.addClass(`crossFilled`);
                gridLocation.html(`X`);
                this.drawOnce = true;
            }else{
                gridLocation.addClass(`circleFilled`);
                gridLocation.html(`O`);
                this.drawOnce = true;
            }
        }else if (gridContents === gameLogic.currentPlayerTurn &&gridLocation.hasClass(`Used`) === false){
            gridLocation.removeClass(`crossFilled circleFilled`);
            gridLocation.html(``);
            this.drawOnce = false;
            gameLogic.turnCompleteToggle();
        };
    },

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
$(document).ready(function(){
    $(`.userButton`).on(`click`,function(){
        userInterface.checkButton($(this));
    });
    $(`td`).on(`click`, function(){
        userInterface.drawOrErase($(this));
    })
    userInterface.$buttonHolders = $(`.buttonHolder`);
    userInterface.$userMsg = $(`.userMessages p`);
});