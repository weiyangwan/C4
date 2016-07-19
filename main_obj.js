$(document).ready(function(){

  function ConnectFour() {

    this.$dialog = $('#dialog-message');
    this.$chip = $('.chip');
    this.$message = $('.message');
    this.$icon = $('div.icon');
    this.$bomb = $('.bomb');
    this.$p1bomb = $('.p1bomb');
    this.$p2bomb = $('.p2bomb');
    this.$bombMsg = $('.bombMsg');
    this.$bombActiveMsg = $('.bombActiveMsg');
    this.bomb = false;
    this.player1Bomb = "";
    this.player2Bomb = "";
    this.player = 'x';
    this.chipColor = "red";
    this.numRow = 6;
    this.numCol = 7;
    this.col = []; //refers to each col
    this.colIndex = "";//index of each array col[i]
    this.chosenCol = [];//col of current chip -> col[colIndex]
    this.chipIndex = "";//index of current chip in col
    this.currentChip = "";//position of each chip col[i][chipIndex]
    this.$chipId = ''; //the #id of current chip
    this.$column = "";// the $chip to lock when array is full
    this.move = 1;
    this.win = "";
    this.winSequence = 4;
  }//end of connectFour

  ConnectFour.prototype = {
    constructor: ConnectFour,

    initGame: function() {
      this.$message.text(" Your turn");
      this.$bombActiveMsg.text("Click to activate the bomb!");

      //array for each column to record move
      for (var i = 0; i < this.numCol; i++) {
        this.col[i] = new Array();
      }

      this.$chip.hover(this.hoverAction.bind(this));

      this.$chip.click(this.evalPlay.bind(this));

      this.$bomb.click(this.bombActivated.bind(this));
    },//end of initGame

    hoverAction: function(event) {
      console.log(event);
      if(this.bomb)  {
        event.target.id.css({
          "background-image": "url('assets/black-bomb-icon.png')",
          "background-size": "115%",
          "vertical-align": "bottom",
        });
      } else {
        event.target.css("background-color", this.chipColor);
      }
      }, function(){
      event.target.css("background-image", "");
      event.target.css("background-color", "#446ccc");
    },//end of hoverAction

    evalPlay: function(event)  {
      this.$column = $('#' + event.target.id);
      this.colIndex = event.target.id.slice(4,5);
      this.chosenCol = this.col[this.colIndex];
      if(this.bomb)  {
        // $column.on(); //-----------------------------------------Need to unlock chips to allow bomb for full array.
        for (var i = 0; i < this.chosenCol.length; i++) {
          $('#sq' + (this.colIndex + i)).css("background-color", "white");
        }
        this.col[this.colIndex] = [];
        this.bomb = false;
        this.move -= (this.chosenCol.length + 1);
        this.$message.text(" Your turn");
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
    },//end of evalPlay

    bombActivated: function() {
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
    },//end of bombActivated

    checkWin: function() {
      this.winCount= 0;
      if(this.chosenCol[this.chipIndex] !== undefined){
        this.checkWinCol();
        this.checkWinRow();
        this.checkWinSWNE();
        this.checkWinSENW();
      }//end of check undefined
    },//end of checkWin

    checkWinCol: function() {
      for (var i = 0; i < this.numRow; i++) {
        if(this.chosenCol[i] === this.chosenCol[this.chipIndex]) {
          this.winCount++;
          if (this.winCount == this.winSequence)  {
            this.win = true;
          }
        } else {
          this.winCount = 0;
        }
      }
    },

    checkWinRow: function() {
      this.winCount = 0;
      for (var j = 0; j < this.numCol; j++) {
        if(this.col[j][this.chipIndex] === this.chosenCol[this.chipIndex])  {
          this.winCount++;
          if(this.winCount == this.winSequence) {
            this.win = true;
          }
        } else {
          this.winCount = 0;
        }
      }
    },

    checkWinSWNE: function()  {
      this.winCount = 0;
      //Retrieve colIndex and chipIndex for position of the chipIndex
      startColumnSW = this.colIndex - (Math.min(this.colIndex,this.chipIndex));
      startChipIndexSW = this.chipIndex - (Math.min(this.colIndex,this.chipIndex));
      loopLengthSW = 0;
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
            if(this.winCount == this.winSequence) {
              this.win = true;
            }
          } else {
            this.winCount = 0;
          }
        }
      }
    },

    checkWinSENW: function()  {
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
            if(this.winCount === this.winSequence)  {
              this.win = true;
            }
          } else {
            this.winCount = 0;
          }
        }
      }
    },

    lockBoard: function() {
      if (this.win) {
        this.$chip.off();
        this.$chip.css("background-color", "#446ccc");
        this.$bombMsg.hide();
        this.$message.text(" wins!");
      } else if (this.move === (this.numRow * this.numCol)) {
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
        } else if (this.player === 'o')  {
          this.player = 'x';
          this.chipColor = "red";
        }
        this.$icon.attr("class", this.chipColor);
        this.move++;
      }
    },

  };//end of ConnectFour.prototype

  var C4 = new ConnectFour();
  C4.initGame();

});//end of document.ready
