const gameLogic = {
    gameOnGoing: false,
    turnComplete: true,
    playerOneSymbol: ``,
    playerTwoSymbol: ``,
    currentPlayerTurn: ``,
    tilesFilled: 0,
    
    winOrDraw: function (turnPlayer){
        if (this.tilesFilled === 9 && this.gameOnGoing === true){
            $(`.Restart`).click();
            return;
        }
        if (this.currentPlayerTurn === this.playerOneSymbol){
            this.currentPlayerTurn = this.playerTwoSymbol;
        }else{
            this.currentPlayerTurn = this.playerOneSymbol;
        };
        userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        this.turnCompleteToggle();
        userInterface.currentBoardSpot.addClass(`Used`);
    },

    turnCompleteToggle: function (){
        if ( this.turnComplete === false ){
            this.turnComplete = true;
        }else{
            this.turnComplete = false;
        };
    },

    restartGame: function (){
        this.gameOnGoing = false;
        this.turnComplete = true;
        this.tilesFilled = 0;
        this.playerOneSymbol = ``;
        this.playerTwoSymbol = ``;
    },

    switchTurn: function(){
        if ( this.turnComplete ){
            this.tilesFilled++;
            this.winOrDraw(this.currentPlayerTurn);
        }else{
            userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        }
    },

    gameStart: function (firstPlayer, secondPlayer) {
        this.playerOneSymbol = firstPlayer;
        this.playerTwoSymbol = secondPlayer;
        this.currentPlayerTurn = firstPlayer;
        userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        this.gameOnGoing = true;
        this.turnComplete = false;
    },
};