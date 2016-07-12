function gameInit() {

  var $chip = $('.chip'),
      player = 'x',
      chipColor = "red",
      col = [], //refers to each col
      colIndex = "",//index of each array col[i]
      chosenCol = [],//col of current chip
      chipIndex = "",//index of current chip in col
      currentChip = "",//position of each chip col[i][chipIndex]
      $chipId = '', //the #id of current chip
      colLock = "",// the $chip to lock when array is full
      move = 0,
      win;

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
      currentChip = [colIndex] + [chipIndex];
      $chipId = $('#sq' + currentChip);
      colLock = $('#' + this.id);
      $chipId.css("background-color", chipColor);

      checkWin();
      lockBoard();
      changePlayer();
    });

  });//end of document.ready

  //chosenCol[chipIndex] ===> current chip(player) in play - either x or o

  function checkWin() {
    var winCount = 0;
    if(chosenCol[chipIndex] !== undefined){
      for (var i = 0; i < 6; i++) {//check column
        if(chosenCol[i] === chosenCol[chipIndex]) {
          winCount++;
          if (winCount == 4)  {
            win = true;
          }
        } else {
          winCount = 0;
        }
      }//end check column

      winCount = 0;
      for (var j = 0; j < 7; j++) {//check row
        if(col[j][chipIndex] === chosenCol[chipIndex])  {
          winCount++;
          if(winCount == 4) {
            win = true;
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
        for (var k = 0; k < loopLengthSW; k++) {
          if(col[startColumnSW + k][startChipIndexSW + k] === chosenCol[chipIndex]) {
            winCount++;
            if(winCount == 4) {
              win = true;
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
        for (var l = 0; l < loopLengthSE; l++) {
          if(col[startColumnSE - l][startChipIndexSE + l] === chosenCol[chipIndex]) {
            winCount++;
            if(winCount === 4)  {
              win = true;
            }
          } else {
            winCount = 0;
          }
        }
      }//end check SENW Diagonal
    }//end of check undefined

  }//end of checkWin

  function lockBoard(){
    if (win) {
      $chip.css("background-color", "#446ccc");
      $chip.off();
    } else if (move === 42) {
      $chip.css("background-color", "#446ccc");
      $chip.off();
    } else if (chosenCol.length == 6) {
      $chip.css("background-color", "#446ccc");
      colLock.off();
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
  }
}//end of gameInit
window.onload = gameInit();
