function gameInit() {

  var $chip = $('.chip'),
      $message = $('.message'),
      $icon = $('div.icon'),
      $bomb = $('.bomb'),
      $p1bomb = $('.p1bomb'),
      $p2bomb = $('.p2bomb'),
      $bombMsg = $('.bombMsg'),
      $bombActiveMsg = $('.bombActiveMsg'),
      bomb = false,
      player1Bomb = "",
      player2Bomb = "",
      player = 'x',
      chipColor = "red",
      col = [], //refers to each col
      colIndex = "",//index of each array col[i]
      chosenCol = [],//col of current chip -> col[colIndex]
      chipIndex = "",//index of current chip in col
      currentChip = "",//position of each chip col[i][chipIndex]
      $chipId = '', //the #id of current chip
      $column = "",// the $chip to lock when array is full
      move = 0,
      win;

  $(document).ready(function(){
    $message.text(" Your turn");
    $bombActiveMsg.text("Click to activate the bomb!");
    //array for each column to record move
    for (var i = 0; i < 7; i++) {
      col[i] = new Array();
    }

    $chip.hover(function(){
      if(bomb)  {
        $(this).css({"background-image": "url('/assets/black-bomb-icon.png')", "background-size": "115%", "vertical-align": "bottom"});
      } else {
        $(this).css("background-color", chipColor);
      }
      }, function(){
      $(this).css("background-image", "");
      $(this).css("background-color", "#446ccc");
    });

    $chip.click(function(){
      //Retrieve column clicked
      $column = $('#' + this.id);
      colIndex = this.id.slice(4,5); //------------------------------Why this does not need to be $(this)?
      chosenCol = col[colIndex];

      if(bomb)  {
        for (var i = 0; i < chosenCol.length; i++) {
          $('#sq' + (colIndex + i)).css("background-color", "white");
        }
        col[colIndex] = [];
        bomb = false;
        move -= (chosenCol.length + 1);
        $message.text(" Your turn");
      } else {
        //push player symbol( x or o ) into col array
        chosenCol.push(player);
        //find the index of the last pushed item & change color
        chipIndex = chosenCol.length - 1;
        currentChip = colIndex + chipIndex;
        $chipId = $('#sq' + currentChip);
        $chipId.css("background-color", chipColor);

        checkWin();
        lockBoard();
      }
      changePlayer();
      $(this).css("background-image", "");
      $(this).css("background-color", chipColor);
      if (chosenCol.length == 6) {
        $chip.css("background-color", "#446ccc");
        $column.off();
      }
    });

    $bomb.click(function(){
      if(player === "x" && player1Bomb !== "activated")  {
        bomb = true;
        $p1bomb.replaceWith("<h4 class='activated'>Activated</h4>");
        player1Bomb = "activated";
        $message.text(" activated the bomb!");
      } else if(player === "o" && player2Bomb !== "activated") {
        bomb = true;
        $p2bomb.replaceWith("<h4 class='activated'>Activated</h4>");
        player2Bomb = "activated";
        $message.text(" activated the bomb!");
      }
    });

  });//end of document.ready

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
      $chip.off();
      $chip.css("background-color", "#446ccc");
      $bombMsg.hide();
      $message.text(" wins!");
    } else if (move === 41) {
      $chip.off();
      $chip.css("background-color", "#446ccc");
      $icon.hide();
      $bombMsg.hide();
      $message.text("It's a tie!");
    }
  }

  function changePlayer() {
    if(!win)  {
      if (player === 'x') {
        player = 'o';
        chipColor = "blue";
        if(player1Bomb === "activated") {
          $bombActiveMsg.text("You have already activated your bomb!");
        }
      } else if (player === 'o')  {
        player = 'x';
        chipColor = "red";
        if(player2Bomb === "activated") {
          $bombActiveMsg.text("You have already activated your bomb!");
        }
      }
      $bombActiveMsg.text("Click to activate the bomb!");
      $icon.attr("class", chipColor);
      move++;
    }
  }
}//end of gameInit
window.onload = gameInit();
