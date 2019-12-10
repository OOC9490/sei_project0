const userInterface = {
    turnMessage: function(turnPlayerSymbol){
        this.$userMsg.text(`It is ${turnPlayerSymbol} player's turn!`);
    },

    clearBoard: function(){
        $(`td`).html("");
        const restartMsg = this.$userMsg.text(`A player has restarted the game!`);
    },

    toggleHolders: function(buttonPressed){
        if ( buttonPressed.hasClass(`cross`) || buttonPressed.hasClass(`circle`)){
            this.$buttonHolders.eq(0).hide();
            this.$buttonHolders.eq(1).show();
        }else if ( buttonPressed.hasClass(`Restart`)){
            //gameLogic.restart();
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
        }else{
            this.toggleHolders(buttonPressed);
        }   
    },
};
$(document).ready(function(){
    $('.userButton').on('click',function(){
        userInterface.checkButton($(this));
    });
    userInterface.$buttonHolders = $(`.buttonHolder`);
    userInterface.$userMsg = $(`.userMessages p`);
});