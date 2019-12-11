const gameLogic = {
    gameOnGoing: false,
    turnComplete: true,
    isDraw: false,
    playerOneSymbol: ``,
    playerTwoSymbol: ``,
    currentPlayerTurn: ``,
    xWins: 0,
    oWins: 0,
    tilesFilled: 0,
    winningCombos: [
        "#one.color, #two.color, #three.color",      "#four.color, #five.color, #six.color",
        "#seven.color, #eight.color, #nine.color",
        "#one.color, #four.color, #seven.color",
        "#two.color, #five.color, #eight.color",
        "#three.color, #six.color, #nine.color",
        "#one.color, #five.color, #nine.color",
        "#seven.color, #five.color, #three.color"
    ],// the game will map the current board state (based on an id and class selector)) at the end of the turn against this array to determine whether not a player has won
    
    //maps the current board state against the known winning combos
    findWinningCombo: function(winConArray, colour) {
        return winConArray.map(function(winCon) {
          let winConChecker = winCon.replace(/color/g, colour);
          return winConChecker = $(winConChecker).length === 3;
        })
    },

    //tries to determine whether or not there is a winner or a draw after a move is confirmed and continues the game if not 
    winOrDraw: function (){
        const blueGameState = this.findWinningCombo(this.winningCombos, `blue`);
        const redGameState = this.findWinningCombo(this.winningCombos, `red`);
        const blueWinner = blueGameState.includes(true);
        const redWinner = redGameState.includes(true);
        let tallyUpdate = 0;
        if ( blueWinner || redWinner ){
            if ( blueWinner === true){
                this.xWins++;
                tallyUpdate = this.xWins;
            }else{
                this.oWins++;
                tallyUpdate = this.oWins;
            };
            this.gameOnGoing = false; //stops the user from interacting with the board
            userInterface.increaseTally(this.currentPlayerTurn, tallyUpdate);
            userInterface.winDrawMsg(this.currentPlayerTurn, this.isDraw);
            return;
        }; //determines whether or not there is a winner
        if (this.tilesFilled === 9 && this.gameOnGoing === true){
            this.gameOnGoing = false; //same as above
            this.isDraw = true;
            userInterface.winDrawMsg(this.currentPlayerTurn, this.isDraw);
            return;
        }; //determines whether or not there is a draw
        if (this.currentPlayerTurn === this.playerOneSymbol){
            this.currentPlayerTurn = this.playerTwoSymbol;
        }else{
            this.currentPlayerTurn = this.playerOneSymbol;
        };
        userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        this.turnCompleteToggle();
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
        this.isDraw = false;
        this.tilesFilled = 0;
        this.playerOneSymbol = ``;
        this.playerTwoSymbol = ``;
    },

    switchTurn: function(){
        if ( this.turnComplete ){
            this.tilesFilled++;
            this.winOrDraw();
        }else{
            userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        };
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