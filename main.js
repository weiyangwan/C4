function gameInit() {

  var $chip = $('.chip'),
      player = 'x',
      chipColor = "red",
      col = [],
      colIndex = "",
      chosenCol = [],
      chipIndex = "",
      move = 0;

  $(document).ready(function(){
    //array for each column to record move
    for (var i = 0; i < 7; i++) {
      col[i] = new Array();
    }

    $chip.hover(function(){
      $(this).css("background-color", chipColor);
      }, function(){
      $(this).css("background-color", "#446ccc");
    });

    $chip.click(function(){
      //Retrieve col clicked and push player symbol( x or o ) into col array
      colIndex = this.id.slice(4,5); //------------------------------Why this cannot be $this?
      chosenCol = col[colIndex];
      chosenCol.push(player);
      //find the index of the last pushed item
      chipIndex = chosenCol.length - 1;
      //change color of chip on game board
      var targetChip = [colIndex] + [chipIndex];
      var $chipPosition = $('#sq' + targetChip);
      $chipPosition.css("background-color", chipColor);
      console.log("Chosen chip: " + targetChip);

      checkWin();
      lockBoard();
      changePlayer();
    });

  });//end of document.ready

  //col ====================> refers to each column
  //colIndex ===============> index of current array (col[i])
  //chosenCol ==============> the current array
  //chipIndex ==============> the index of chip in play
  //chosenCol[chipIndex] ===> current chip(player) in play - either x or o

  function checkWin() {
    var winCount = 0;
    for (var i = 0; i < 6; i++) {//check column
      if(chosenCol[i] === chosenCol[chipIndex]) {
        winCount++;
        // console.log(chosenCol[chipIndex]+ " | win col: " + winCount);
        if (winCount == 4)  {
          console.log("WIIIIIINNNNNNNNNN by column!");
          return true;
        }
      } else {
        winCount = 0;
      }
    }//end check column

    winCount = 0;
    for (var j = 0; j < 7; j++) {//check row
      if(col[j][chipIndex] === chosenCol[chipIndex])  {
        winCount++;
        // console.log(chosenCol[chipIndex]+ " | win row: " + winCount);
        if(winCount == 4) {
          console.log("WIIINNNNNNNNNNNNN by Row!");
          return true;
        }
      } else {
        winCount = 0;
      }
    }// end check row

    //check SWNE Diagonal
    //retrieve colIndex and chipIndex for position of the chipIndex
    var startColumnSW = colIndex - (Math.min(colIndex,chipIndex));
    var startChipIndexSW = chipIndex - (Math.min(colIndex,chipIndex));
    var loopLengthSW = 0;
    winCount = 0;

    //determine length of loop for SWNE diagonal check
    if(startColumnSW <=3 && startChipIndexSW <= 2)  {
      if(startColumnSW === 0) {
        loopLengthSW = 6 - startChipIndexSW;
      } else if (startChipIndexSW === 0)  {
        loopLengthSW = 7 - startColumnSW;
      }
      // console.log("Length: " + loopLengthSW);
      // console.log("Win count before dia: " + winCount);
      for (var k = 0; k < loopLengthSW; k++) {
        if(col[startColumnSW + k][startChipIndexSW + k] === chosenCol[chipIndex]) {
          winCount++;
          // console.log(chosenCol[chipIndex]+ " | Win dia: " + winCount);
          if(winCount == 4) {
            console.log("WIIIIIIIIINNNNNNNN by diagonal SWNE!");
            return true;
          }
        } else {
          winCount = 0;
        }
      }
    }//end check SWNE Diagonal

    //check SENW Diagonal
    var startColumnSE = Math.min((parseInt(colIndex) + chipIndex), 6);
    var startChipIndexSE = Math.max(((parseInt(colIndex) + chipIndex)-6),0);
    var loopLengthSE = 0;
    winCount = 0;

    //determine length of loop for SENW Diagonal check
    if(startColumnSE >= 3 && startChipIndexSE <=2)  {
      if(startColumnSE < 6) {
        loopLengthSE = startColumnSE + 1;
      } else if (startColumnSE == 6)  {
        loopLengthSE = startColumnSE - startChipIndexSE;
      }
      console.log("before SE: " + winCount);
      for (var l = 0; l < loopLengthSE; l++) {
        if(col[startColumnSE - l][startChipIndexSE + l] === chosenCol[chipIndex]) {
          winCount++;
          if(winCount === 4)  {
            console.log("WIIIIIIIIINNNNNNNN by diagonal SENW!");
            return true;
          }
        } else {
          winCount = 0;
        }
      }
    }//end check SENW Diagonal
  }//end of checkWin

  function lockBoard(){
    // for (var i = 0; i < $chip.length; i++) {

    // }

    if (checkWin === true) {
      $chip.off();
      console.log("Player: " + player + " wins!");
    } else if (move === 42) {
      $chip.off();
      console.log("It's a tie!");
    }

  }

  function changePlayer() {
    if (player === 'x') {
      player = 'o';
      chipColor = "blue";
    } else if (player === 'o')  {
      player = 'x';
      chipColor = "red";
    }
    move++;
    console.log("no of move: " + move);
  }
}//end of gameInit
window.onload = gameInit();
