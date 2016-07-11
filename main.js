function gameInit() {

  var $chip = $('.chip'),
      player = 'x',
      chipColor = "red",
      col = [],
      colIndex = "",
      chosenCol = [];
      chipIndex = "";
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


      checkWin();
      changePlayer();
    });

  })//end of document.ready

  function changePlayer() {
    if (player === 'x') {
      player = 'o';
      chipColor = "blue";
    } else if (player === 'o')  {
      player = 'x';
      chipColor = "red";
    }
  }

  //colIndex ===============> index of current array (column[i])
  //chosenCol ==============> the current array
  //chipIndex ==============> the index of chip in play
  //chosenCol[chipIndex] ===> current chip(player) in play - either x or o

  function checkWin() {
    var winCount = "";
    //check Column
    for (var i = 0; i < 6; i++) {
      if(chosenCol[i] === chosenCol[chipIndex]) {
      winCount++;
      console.log(winCount);
        if (winCount == 4)  {
          console.log(chosenCol[chipIndex]+ " Wins by column!");
        }
      } else {
        winCount = 0;
      }
    }

    // for (var j = 0; j < 7; i++) {
    //   if
    // }
  }//end of checkWin


  function lockCol(){

  }

}//end of gameInit
window.onload = gameInit();

// 07 column and 06 row --> 06 index and 05 index
//compare within array(compare column)
  //check max +/-3 from current chip
    // only check if index is 3 or more
    // if index 0, check index 1,2,3
    // if index 1, check index 0,2,3  or 2,3,4
    // if index 2, check index 0,1,3 or 1,3,4 or 3,4,5
    // if index 3, check index 0,1,2 or 1,2,4 or 2,4,5
    // if index 4, check index 1,2,3 or 2,3,5
    // if index 5, check index 2,3,4

//compare with adjacent array with the same index number (compare col)
    // if col 0, check col 1,2,3
    // if col 1, check col 0,2,3  or 2,3,4
    // if col 2, check col 0,1,3 or 1,3,4 or 3,4,5
    // if col 3, check col 0,1,2 or 1,2,4 or 2,4,5
    // if col 4, check col 1,2,3 or 2,3,5
    // if col 5, check col 2,3,4

//compare diagonally by manipulation array name and index number
    // if col 0 , index 0, check [1][1], [2][2], [3][3]
    // if col 3, index 3, check
        //diagonal southwest/northeast
          //[0][0], [1][1], [2][2]  or
          //[1][1], [2][2], [4][4] or
          //[2][2], [4][4], [5][5] or
        //diagonal northwest/southeast
          //[6][0], [5][1], [4][2] or
          //[5][1], [4][2], [2][4] or
          //[4][2], [2][4], [1][5] or
