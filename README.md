# GA SEI35 Project 0 - Tic Tac Toe
Welcome to my first coding project, involving the game of "Tic Tac Toe" ("Knots and Crosses" for some).

This is a brief overview of the technologies used, instructions using the application, any issues I ran into creating the project and things to look forward to in future updates.

If you want to just get straight into the application follow this link:
https://ooc9490.github.io/sei_project0/

**OR**

If you want to take a look at what I am adding to the project you can headover to:
https://github.com/OOC9490/sei_project0_withAI

## Approaching the Solution
It was a little bit surprising how much thought I had to take between steps to reach a solution I was happy to present... If I had to break it down, this was the general flow of my work:

1. Basic HTML and gameboard layout
2. Configuring the user interface
3. Implementing the game's logic

I started the project having "separation of concerns" in mind and was able to successfully separate all components that interacted with the UI and the back-end. I would also quite often, look back and try to refactor the code where I saw too much repetition. During the program's construction, I never really worked on more than two or three functions that interacted with each other, as to not divide my attention too much **AND** avoid overthinking whatever it was I was doing. Once the game was functional, I would review the code to try and address whatever issues I was having or implement what "wants" I had for the project.

## Playing the application
1. Select the token you want to play with.
2. Select a tile on the board and then press "Confirm" to end your turn and pass play to the other player. Some notes regarding your turn:
    - You can take back your move before you hit "Confirm" by clicking on the same tile you just placed a token in (You won't be able to take back a previous turn's move though!)
    - You can't pass play until you have filled a tile with a token
3. A tally of your wins will be taken according to the token you won with. (scores are maintained until the page is refreshed by the browser)
4. You can reset the gameboard at any time by clicking "Restart" (**NOTE:** there is a four second load time for the game board to become "live" again)
5. The game board will automatically reset if a winner hasn't been found after the 9th turn of play has been confirmed. (Shares the same load time as the "Restart" function)

## Technologies used
- HTML
- CSS
- Javascript
- standard jQuery JS library [https://jquery.com/download/]

## Problems in the creation of Tic Tac Toe
1. Not hard coding "winning combinations" for the program to check against
2. Pre-rendering a gameboard - this limited me to a 3 by 3 board, but it wasn't something I wanted to prioritise heavily in creating the program.

## For the future
- [ ] Addition of an AI that utilises the "Minimax Algorithm"
- [ ] Implementing a more responsive interface
- [ ] Rendering and handling a larger game board
- [ ] Enable the use of different player tokens
- [ ] Community Suggestions
