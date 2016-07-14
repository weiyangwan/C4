$(document).ready(function(){
  var connect4 = {

    $dialog: $('#dialog-message'),
    $chip: $('.chip'),
    $message: $('.message'),
    $icon: $('div.icon'),
    $bomb: $('.bomb'),
    $p1bomb: $('.p1bomb'),
    $p2bomb: $('.p2bomb'),
    $bombMsg: $('.bombMsg'),
    $bombActiveMsg: $('.bombActiveMsg'),
    bomb: false,
    player1Bomb: "",
    player2Bomb: "",
    player: 'x',
    chipColor: "red",
    col: [], //refers to each col
    colIndex: "",//index of each array col[i]
    chosenCol: [],//col of current chip -> col[colIndex]
    chipIndex: "",//index of current chip in col
    currentChip: "",//position of each chip col[i][chipIndex]
    $chipId: '', //the #id of current chip
    $column: "",// the $chip to lock when array is full
    move: 0,
    win: "",
  };//end of connect4

  initGame: function() {
    this.$message.text(" Your turn");
    this.$bombActiveMsg.text("Click to activate the bomb!");
    //array for each column to record move
    for (var i = 0; i < 7; i++) {
      col[i] = new Array();
    }

    // $dialog.dialog({
    //   modal: true
    // });

    this.$chip.hover(function(){
      if(this.bomb)  {
        $(this).css({"background-image": "url('assets/black-bomb-icon.png')", "background-size": "115%", "vertical-align": "bottom"});
      } else {
        $(this).css("background-color", this.chipColor);
      }
      }, function(){
      $(this).css("background-image", "");
      $(this).css("background-color", "#446ccc");
    });

    this.$chip.click(function(){
      //Retrieve column clicked
      this.$column = $('#' + this.id);
      this.colIndex = this.id.slice(4,5); //------------------------------Why this does not need to be $(this)?
      this.chosenCol = this.col[this.colIndex];
      if(this.bomb)  {
        // $column.on(); //-----------------------------------------Need to unlock chips to allow bomb for full array.
        for (var i = 0; i < this.chosenCol.length; i++) {
          $('#sq' + (this.colIndex + i)).css("background-color", "white");
        }
        this.col[this.colIndex] = [];
        this.bomb = false;
        this.move -= (this.chosenCol.length + 1);
        $message.text(" Your turn");
      } else {
        //push player symbol( x or o ) into this.col array
        this.chosenCol.push(this.player);

        //find the index of the last pushed item
        this.chipIndex = this.chosenCol.length - 1;

        for (var j = 5; j < [this.chipIndex]; j--) {
          $('#sq' + (this.colIndex + j)).toggleClass(this.chipColor, 5000);
        }
        //change color of chip on game board
        this.currentChip = this.colIndex + this.chipIndex;
        this.$chipId = $('#sq' + this.currentChip);
        this.$chipId.css("background-color", this.chipColor);

        this.checkWin();
        this.lockBoard();
      }
      this.changePlayer();
      $(this).css("background-image", "");
      $(this).css("background-color", this.chipColor);
      if (this.chosenCol.length == 6) {
        this.$chip.css("background-color", "#446ccc");
        this.$column.off();
      }
    });

    this.$bomb.click(function(){
      if(this.player === "x" && this.player1Bomb !== "activated")  {
        this.bomb = true;
        this.$p1bomb.replaceWith("<h4 class='activated'>Activated</h4>");
        this.player1Bomb = "activated";
        this.$message.text(" activated the bomb!");
      } else if(this.player === "o" && this.player2Bomb !== "activated") {
        this.bomb = true;
        this.$p2bomb.replaceWith("<h4 class='activated'>Activated</h4>");
        this.player2Bomb = "activated";
        this.$message.text(" activated the bomb!");
      }
    });
  },

  checkWin: function() {
    winCount: 0,
    //check SWNE Diagonal, retrieve colIndex and chipIndex for position of the chipIndex
    startColumnSW: this.colIndex - (Math.min(this.colIndex,this.chipIndex)),
    startChipIndexSW: this.chipIndex - (Math.min(this.colIndex,this.chipIndex)),
    loopLengthSW: 0,

    if(this.chosenCol[this.chipIndex] !== undefined){
      for (var i = 0; i < 6; i++) {//check column
        if(this.chosenCol[i] === this.chosenCol[this.chipIndex]) {
          this.winCount++;
          if (this.winCount == 4)  {
            this.win = true;
          }
        } else {
          this.winCount = 0;
        }
      }//end check column

      this.winCount = 0;
      for (var j = 0; j < 7; j++) {//check row
        if(this.col[j][this.chipIndex] === this.chosenCol[this.chipIndex])  {
          this.winCount++;
          if(this.winCount == 4) {
            this.win = true;
          }
        } else {
          this.winCount = 0;
        }
      }// end check row


      this.winCount = 0;

      //determine length of loop for SWNE diagonal check
      if(this.startColumnSW <=3 && this.startChipIndexSW <= 2)  {
        if(this.startColumnSW === 0) {
          this.loopLengthSW = 6 - this.startChipIndexSW;
        } else if (this.startChipIndexSW === 0)  {
          this.loopLengthSW = 7 - this.startColumnSW;
        }
        for (var k = 0; k < this.loopLengthSW; k++) {
          if(this.col[this.startColumnSW + k][this.startChipIndexSW + k] === this.chosenCol[this.chipIndex]) {
            this.winCount++;
            if(this.winCount == 4) {
              this.win = true;
            }
          } else {
            this.winCount = 0;
          }
        }
      }//end check SWNE Diagonal

      //check SENW Diagonal
      var startColumnSE = Math.min((parseInt(this.colIndex) + this.chipIndex), 6);
      var startChipIndexSE = Math.max(((parseInt(this.colIndex) + this.chipIndex)-6),0);
      var loopLengthSE = 0;
      this.winCount = 0;

      //determine length of loop for SENW Diagonal check
      if(this.startColumnSE >= 3 && this.startChipIndexSE <=2)  {
        if(this.startColumnSE < 6) {
          this.loopLengthSE = this.startColumnSE + 1;
        } else if (this.startColumnSE == 6)  {
          this.loopLengthSE = this.startColumnSE - this.startChipIndexSE;
        }
        for (var l = 0; l < this.loopLengthSE; l++) {
          if(this.col[this.startColumnSE - l][this.startChipIndexSE + l] === this.chosenCol[this.chipIndex]) {
            this.winCount++;
            if(this.winCount === 4)  {
              this.win = true;
            }
          } else {
            this.winCount = 0;
          }
        }
      }//end check SENW Diagonal
    }//end of check undefined

  },//end of checkWin

  lockBoard: function() {
    if (this.win) {
      this.$chip.off();
      this.$chip.css("background-color", "#446ccc");
      this.$bombMsg.hide();
      this.$message.text(" wins!");
    } else if (this.move === 41) {
      this.$chip.off();
      this.$chip.css("background-color", "#446ccc");
      this.$icon.hide();
      this.$bombMsg.hide();
      this.$message.text("It's a tie!");
    }
  },

  changePlayer: function() {
    if(!this.win)  {
      if (this.player === 'x') {
        this.player = 'o';
        this.chipColor = "blue";
        if(this.player1Bomb === "activated") {
          this.$bombActiveMsg.text("You have already activated your bomb!");
        }
      } else if (this.player === 'o')  {
        this.player = 'x';
        this.chipColor = "red";
        if(this.player2Bomb === "activated") {
          this.$bombActiveMsg.text("You have already activated your bomb!");
        }
      }
      this.$bombActiveMsg.text("Click to activate the bomb!");
      this.$icon.attr("class", this.chipColor);
      this.move++;
    }
  },

});//end of document.ready
