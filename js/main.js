const gameLogic = {
    gameOnGoing: false,
    turnComplete: true,
    playerOneSymbol: ``,
    playerTwoSymbol: ``,
    currentPlayerTurn: ``,
    tilesFilled: 0,
    winningCombos: [
        "#one.color","#two.color","#three.color",      "#four.color","#five.color","#six.color",
        "#seven.color","#eight.color","#nine.color",
        "#one.color","#four.color","#seven.color",
        "#two.color","#five.color","#eight.color",
        "#three.color","#six.color","#nine.color",
        "#one.color","#five.color","#nine.color",
        "#three.color","#five.color","#seven.color"
    ],// the game will map the current board state (based on an id and class selector)) at the end of the turn against this array to determine whether not a player has won
    
    //maps the current board state against the known winning combos
    findWinningCombo: function(array, string) {
        return array.map(function(combo) {
          let eachCombo = combo.replace(/color/g, string);
          return eachCombo = $(`${eachCombo}`).length === 3;
        })
    },

    //tries to determine whether or not there is a winner or a draw after a move is confirmed and continues the game if not 
    winOrDraw: function (){
        let tileToCheck = ``;
        if ( this.currentPlayerTurn === `X`){
            tileToCheck = `blue`;
        }else{
            tileToCheck = `red`;
        };
        const winnerFound = this.findWinningCombo(this.winningCombos, tileToCheck).includes(true);
        if ( winnerFound ){
            userInterface.checkWinner(this.currentPlayerTurn);
            this.gameOnGoing = false;
            setTimeout(function(){
                $(`.restart`).click();
             },2500);
            return
        }; //determines whether or not there is a winner
        if (this.tilesFilled === 9 && this.gameOnGoing === true){
            userInterface.drawAchieved();
            $(`.restart`).click();
            return;
        }; //determines whether or not there is a draw
        if (this.currentPlayerTurn === this.playerOneSymbol){
            this.currentPlayerTurn = this.playerTwoSymbol;
        }else{
            this.currentPlayerTurn = this.playerOneSymbol;
        };
        userInterface.turnMessage(this.currentPlayerTurn, this.gameOnGoing, this.turnComplete);
        this.turnCompleteToggle();
        userInterface.currentBoardSpot.addClass(`used`);
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
            this.winOrDraw();
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