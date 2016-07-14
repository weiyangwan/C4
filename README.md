******************
C4 | WITH A TWIST
******************

BASIC GAMEPLAY
*************************************
Connect Four (also known as Captain's Mistress, Four Up, Plot Four, Find Four, Four in a Row, Four in a Line and Gravitrips (in Soviet Union) ) is a two-player connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to connect four of one's own discs of the same color next to each other vertically, horizontally, or diagonally before your opponent. Connect Four is a strongly solved game. The first player can always win by playing the right moves.(Source: wikipedia)

For C4 | With a Twist, a bomb element is added to the game play. This is a play on the name C4, which refers to the board game Connect 4 and the explosive commonly known as C4. When a bomb is activated, it will clear an entire column of the board, changing the dynamics of the game.

Rules governing the use of a bomb is as follow:

1. Each player is given 01 bomb at the start of each game.
2. The bomb can be activated any time during the game.
3. A bomb can be played either to destroy the other player's sequence of play or to gain advantage for the player activating it.
4. The bomb is not applicable for columns which are already filled up.
5. A bomb will destroy an entire column which it is dropped on.
6. When a player activates the bomb, it is considered a turn.
7. The player will not be able to play a chip the same time a bomb is activated.
8. Game play resumes as per normal after a bomb has been activated.


GAME CREATION
************************************
The game board of 07 columns and 06 rows are created in HTML.

The game play is rendered into HTML using JavaScript and jQuery and styled in CSS with Sass framework. Responsive design for different screen sizes is included at breakpoints of 480px, 768px and 1024px.

An array is created for each column to record move and to enable checking of win at each move. When a chip is dropped, a string of either "x" or "o" representing the two players is pushed into the array.  

At the end of each turn, a checkWin function is called to determine whether the current move represents a winning move. A winning move is defined as having 04 consecutive sequence of the same chip along the same column, row or diagonal path. The checkWin function is split into 04 parts:

1. Check a column/array for a consecutive sequence of either "x" or "o" in the array.
2. Check a row, which is across 07 columns. The index of the current chip in play is identified and each column at the same index is check for a consecutive sequence of either "x" or "o" across the columns/arrays.
3. Check a diagonal in the SouthWest - NorthEast direction. After the current chip is identified, the lowest position in the SouthWest corner of the board, which is along the diagonal path of the current chip is determined. From this lowest SouthWest position, win is checked by looking for a consecutive sequence of either "x" or "o" along the diagonal path.
4. Check a diagonal in the SouthEast - NorthWest direction. After the current chip is identified, the lowest position in the SouthEast corner of the board, which is along the diagonal path of the current chip is determined. From this lowest SouthEast position, win is checked by looking for a consecutive sequence of either "x" or "o" along the diagonal path.

After checkWin, a lockBoard function is called to lock the board or an array according to the following conditions:

1. The board is locked when a player wins the game.
2. The board is locked when the board is full and there is no winner. i.e. a tie

When lockBoard function is called, the event listener is removed when either condition is met.

If there is no winner, the game continues and the changePlayer function is called to change to the next player.

When a bomb is selected, instead of dropping a chip, a player is given the opportunity to destroy an entire column of his choosing. The chosen column/array is emptied when the bomb is dropped. Game play resumes as per normal after a bomb is dropped.
