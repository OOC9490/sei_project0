const gameLogic = {
    gameComplete: false,
    playerOneSymbol: ``,
    playerTwoSymbol: ``,
    currentPlayerTurn: ``,
    
    restart: function (){
        this.gameComplete = false;
        this.playerOneSymbol = ``;
        this.playerTwoSymbol = ``;
    },

    switchTurn: function() {
        
    },

    gameStart: function (firstPlayer, secondPlayer) {
            this.playerOneSymbol = firstPlayer;
            this.playerTwoSymbol = secondPlayer;
            this.currentPlayerTurn = firstPlayer;
            userInterface.turnMessage(this.currentPlayerTurn);
    },
};
