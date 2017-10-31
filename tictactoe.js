// Variables Defined
var board = document.getElementsByTagName("td");
var gameon = false;

var repeatcount = 0;
var player1name = "";
var player2name = "";
var player1symbol = "";
var player2symbol = "";

var player1wins = 0;
var player2wins = 0;
var gamestied = 0;
var gamemessage = document.querySelector("#gamemessage");
var turn //1 is player1 turn and 2 is player2 turn
var tdheight = board[0].offsetHeight;
var tdwidth = board[0].offsetWidth;
var winsound = new Audio("win.mp3")
var intializesymbol = "+";
var flashinterval = 200;
var timeoutinterval = 2000;
var flashrepeatcountlimit = 10;

var fadeintime = 500;
var delaytime = 200;
var textfadeout = 500;


// fadein elements of page
$("h2").fadeIn(fadeintime, function () {
    $("hr").fadeIn(fadeintime, function () {
        $("table").fadeIn(fadeintime, function () {

            $("#gameinfo").fadeIn(fadeintime, function () {

                $("#gameinfo span").each(function () {

                    $(this).delay(delaytime).fadeIn(fadeintime);
                    delaytime += 100;
                })

                $("#playerinfo").fadeIn(fadeintime);
            })

        })

    })

});


intializeboard();
var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

//buttonhover
var buttons = document.querySelectorAll("button")
//for touch screen
if (supportsTouch) {
    for (var i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("touchstart", function () {

            this.classList.add('buttonhovercolor');

        })

    }

    for (var i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("touchend", function () {

            this.classList.remove('buttonhovercolor');

        })

    }
}
    else{
    //for mouse
    for (var i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("mouseover", function () {

            this.classList.add('buttonhovercolor');

        })

    }

    for (var i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("mouseout", function () {

            this.classList.remove('buttonhovercolor');

        })

    }
}

//Hover over table
//for touch screen
if (supportsTouch) {

    for (var i = 0; i < board.length; i++) {

        board[i].addEventListener("touchstart", function () {

            this.classList.add('hovercolor');

        })

    }

    for (var i = 0; i < board.length; i++) {

        board[i].addEventListener("touchend", function () {

            this.classList.remove('hovercolor');

        })

    }
}

else {
    //for mouse
    for (var i = 0; i < board.length; i++) {

        board[i].addEventListener("mouseover", function () {

            this.classList.add('hovercolor');

        })

    }

    for (var i = 0; i < board.length; i++) {

        board[i].addEventListener("mouseout", function () {

            this.classList.remove('hovercolor');

        })

    }
}
//Click Sound Effects
var audio = new Audio('click.mp3');
$('td').click(function () {
    audio.play(); // that will do the trick !!
})

//Player1 selects name
var player1nameinputform = document.querySelector("#player1name");


player1nameinputform.addEventListener("change", function () {

    player1name = player1nameinputform.value;
    $("#gamemessage").fadeOut(textfadeout,function () {
        $("#gamemessage").text("Player1 choose your symbol").fadeIn(textfadeout)

    })
   

})

//Player1 symbol choose and player2 automatically gets other symbol

var player1buttonx = document.querySelector("#player1buttonx");
var player1buttono = document.querySelector("#player1buttono");
var player2buttonx = document.querySelector("#player2buttonx");
var player2buttono = document.querySelector("#player2buttono");


//player1 clicks x
player1buttonx.addEventListener("click", function () {
    if (player1symbol === "") {
        player1symbol = "X";
        player2symbol = 'O';
    }

    player1buttono.style.visibility = 'hidden';
    player2buttonx.style.visibility = 'hidden';
    if (player1name === "") {

        $("#gamemessage").fadeOut(textfadeout, function () {
            $("#gamemessage").text("Player1 please type your name too. Player2 your symbol is O, please type your name").fadeIn(textfadeout)

        })
       
    }
    else {
        $("#gamemessage").fadeOut(textfadeout, function () {
            $("#gamemessage").text("Player2 your symbol is O, please type your name").fadeIn(textfadeout)

        })

        
    }



})

//player1 clicks o
player1buttono.addEventListener("click", function () {
    if (player1symbol === "") {
        player1symbol = "O";
        player2symbol = 'X';
    }

    player1buttonx.style.visibility = 'hidden';
    player2buttono.style.visibility = 'hidden';

    if (player1name === "") {

        $("#gamemessage").fadeOut(textfadeout, function () {
            $("#gamemessage").text("Player1 please type your name too. Player2 your symbol is X, please type your name").fadeIn(textfadeout)

        })


        
    }
    else {

        $("#gamemessage").fadeOut(textfadeout, function () {
            $("#gamemessage").text("Player2 your symbol is X, please type your name").fadeIn(textfadeout)

        })

        
    }
})


//Player2 selects name

var player2nameinputform = document.querySelector("#player2name");

player2nameinputform.addEventListener("change", function () {

    if (player1name === "") {


        $("#gamemessage").fadeOut(textfadeout, function () {
            $("#gamemessage").text("Player1 please type your name first").fadeIn(textfadeout)

        })

        
    }

    else {
        player2name = player2nameinputform.value;


        if (player1name !== "" && player2name !== "" && player1symbol !== "" && player2symbol !== "") {

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text("We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })

            
            // you have to put a delay function here
            var random = getRandomIntInclusive(0, 1);
            window.setTimeout(function () {
                gameon = true;
                if (random === 0) {

                    $("#gamemessage").fadeOut(textfadeout, function () {
                        $("#gamemessage").text(player1name + " it is your turn first").fadeIn(textfadeout)

                    })

                    
                    turn = 1;
                }
                else {

                    $("#gamemessage").fadeOut(textfadeout, function () {
                        $("#gamemessage").text(player2name + " it is your turn first").fadeIn(textfadeout)

                    })
                    turn = 2;
                }
            }, timeoutinterval);


        }
    }

})

//function to bind events on page load

    //intialize board
    function intializeboard() {
        for (var i = 0; i < board.length; i++) {

            board[i].innerHTML = intializesymbol;
           

           

        }
    }
     //boardclick
    $("td").click(function () {
        handleFunction(this);
    });
    function handleFunction(elem) {

        if (elem.innerHTML === intializesymbol && gameon === true) {

            if (turn === 1) {

                elem.innerHTML = player1symbol;
                elem.style.color = "whitesmoke";
                elem.style.textAlign = "center";
                if (win() === true) {
                    var random = getRandomIntInclusive(0, 1);
                    window.setTimeout(function () {
                        gameon = true;
                        if (random === 0) {

                            $("#gamemessage").fadeOut(textfadeout, function () {
                                $("#gamemessage").text(player1name + " it is your turn first").fadeIn(textfadeout)

                            })

                            
                            turn = 1;
                        }
                        else {
                            $("#gamemessage").fadeOut(textfadeout, function () {
                                $("#gamemessage").text(player2name + " it is your turn first").fadeIn(textfadeout)

                            })

                            turn = 2;
                        }
                    }, timeoutinterval);
                }
                else if (tie() === true) {

                    //call clear board function

                    intializeboard();
                    //randomize turn again

                    $("#gamemessage").fadeOut(textfadeout, function () {
                        $("#gamemessage").text("This Game is tied. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

                    })

                   // you have to put a delay function here
                    var random = getRandomIntInclusive(0, 1);
                    window.setTimeout(function () {
                        gameon = true;
                        if (random === 0) {
                            $("#gamemessage").fadeOut(textfadeout, function () {
                                $("#gamemessage").text(player1name + " it is your turn first").fadeIn(textfadeout)

                            })

                            turn = 1;
                        }
                        else {
                            $("#gamemessage").fadeOut(textfadeout, function () {
                                $("#gamemessage").text(player2name + " it is your turn first").fadeIn(textfadeout)

                            })

                            turn = 2;
                        }
                    }, timeoutinterval);

                }
                else {
                    turn = 2;
                    $("#gamemessage").fadeOut(textfadeout, function () {
                        $("#gamemessage").text(player2name + " it is your turn").fadeIn(textfadeout)

                    })

                }
                

            }

            else {

                elem.innerHTML = player2symbol;
                elem.style.color = "whitesmoke";
                elem.style.textAlign = "center";
               
                if (win() === true) {
                    var random = getRandomIntInclusive(0, 1);
                    window.setTimeout(function () {
                        gameon = true;
                        if (random === 0) {

                            $("#gamemessage").fadeOut(textfadeout, function () {
                                $("#gamemessage").text(player1name + " it is your turn first").fadeIn(textfadeout)

                            })
                            turn = 1;
                        }
                        else {
                            $("#gamemessage").fadeOut(textfadeout, function () {
                                $("#gamemessage").text(player2name + " it is your turn first").fadeIn(textfadeout)

                            })

                            turn = 2;
                        }
                    }, timeoutinterval);
                }
                else if (tie() === true) {

                    //call clear board function

                    intializeboard();
                    //randomize turn again
                    $("#gamemessage").fadeOut(textfadeout, function () {
                        $("#gamemessage").text("This Game is tied. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

                    })

                    
                    // you have to put a delay function here
                    var random = getRandomIntInclusive(0, 1);
                    window.setTimeout(function () {
                        gameon = true;
                        if (random === 0) {
                            $("#gamemessage").fadeOut(textfadeout, function () {
                                $("#gamemessage").text(player1name + " it is your turn first").fadeIn(textfadeout)

                            })
                            turn = 1;
                        }
                        else {
                            $("#gamemessage").fadeOut(textfadeout, function () {
                                $("#gamemessage").text(player2name + " it is your turn first").fadeIn(textfadeout)

                            })

                            turn = 2;
                        }
                    }, timeoutinterval);

                }
                else {
                    turn = 1;
                    $("#gamemessage").fadeOut(textfadeout, function () {
                        $("#gamemessage").text(player1name + " it is your turn").fadeIn(textfadeout)

                    })

                }

            }
        }

    }




//Random turn selector function
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}





//Winnng Function

function win() {
    //1st row
    if ((board[0].innerHTML === 'X' && board[1].innerHTML === 'X' && board[2].innerHTML === 'X') || (board[0].innerHTML === 'O' && board[1].innerHTML === 'O' && board[2].innerHTML === 'O')) {
        if (board[0].innerHTML === player1symbol) {
            
            player1wins++;
            $("#player1wins").fadeOut(textfadeout, function () {
                $("#player1wins").text(player1wins).fadeIn(textfadeout)

            })

           
            // display winning board animation
            
            winsound.play();
            
            var refreshintervalid = window.setInterval(function () {
               

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[0].style.visibility = "visible"
                    board[1].style.visibility = "visible"
                    board[2].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[0].style.visibility === "hidden") {
                    board[0].style.visibility = "visible"
                    board[1].style.visibility = "visible"
                    board[2].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[0].style.visibility = "hidden"
                    board[1].style.visibility = "hidden"
                    board[2].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player1name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            
            
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
            // you have to put a delay function here

            }, timeoutinterval);


           
           
        }

        else {
            
            player2wins++;

            $("#player2wins").fadeOut(textfadeout, function () {
                $("#player2wins").text(player2wins).fadeIn(textfadeout)

            })

            
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[0].style.visibility = "visible"
                    board[1].style.visibility = "visible"
                    board[2].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[0].style.visibility === "hidden") {
                    board[0].style.visibility = "visible"
                    board[1].style.visibility = "visible"
                    board[2].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[0].style.visibility = "hidden"
                    board[1].style.visibility = "hidden"
                    board[2].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player2name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);
            


        }

        return true;
    }

    //2ndrow
   else if ((board[3].innerHTML === 'X' && board[4].innerHTML === 'X' && board[5].innerHTML === 'X') || (board[3].innerHTML === 'O' && board[4].innerHTML === 'O' && board[5].innerHTML === 'O')) {
        if (board[3].innerHTML === player1symbol) {
            
            player1wins++;
            $("#player1wins").fadeOut(textfadeout, function () {
                $("#player1wins").text(player1wins).fadeIn(textfadeout)

            })
            // display winning board animation

            winsound.play();
            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[3].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[5].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[3].style.visibility === "hidden") {
                    board[3].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[5].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[3].style.visibility = "hidden"
                    board[4].style.visibility = "hidden"
                    board[5].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player1name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);
            

        }

        else {
            
            player2wins++;
            $("#player2wins").fadeOut(textfadeout, function () {
                $("#player2wins").text(player2wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[3].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[5].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[3].style.visibility === "hidden") {
                    board[3].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[5].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[3].style.visibility = "hidden"
                    board[4].style.visibility = "hidden"
                    board[5].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);
            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player2name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })

            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);


        }
        return true;
    }

    //3rdrow
   else if ((board[6].innerHTML === 'X' && board[7].innerHTML === 'X' && board[8].innerHTML === 'X') || (board[6].innerHTML === 'O' && board[7].innerHTML === 'O' && board[8].innerHTML === 'O')) {
        if (board[6].innerHTML === player1symbol) {
            
            player1wins++;
            $("#player1wins").fadeOut(textfadeout, function () {
                $("#player1wins").text(player1wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[6].style.visibility = "visible"
                    board[7].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[6].style.visibility === "hidden") {
                    board[6].style.visibility = "visible"
                    board[7].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[6].style.visibility = "hidden"
                    board[7].style.visibility = "hidden"
                    board[8].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player1name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
               
                // you have to put a delay function here
            }, timeoutinterval);
           

        }

        else {
           
            player2wins++;
            $("#player2wins").fadeOut(textfadeout, function () {
                $("#player2wins").text(player2wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[6].style.visibility = "visible"
                    board[7].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[6].style.visibility === "hidden") {
                    board[6].style.visibility = "visible"
                    board[7].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[6].style.visibility = "hidden"
                    board[7].style.visibility = "hidden"
                    board[8].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player2name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);



        }
        return true;
    }

    //1st column
   else if ((board[0].innerHTML === 'X' && board[3].innerHTML === 'X' && board[6].innerHTML === 'X') || (board[0].innerHTML === 'O' && board[3].innerHTML === 'O' && board[6].innerHTML === 'O')) {
        if (board[0].innerHTML === player1symbol) {
            
            player1wins++;
            $("#player1wins").fadeOut(textfadeout, function () {
                $("#player1wins").text(player1wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[0].style.visibility = "visible"
                    board[3].style.visibility = "visible"
                    board[6].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[6].style.visibility === "hidden") {
                    board[0].style.visibility = "visible"
                    board[3].style.visibility = "visible"
                    board[6].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[0].style.visibility = "hidden"
                    board[3].style.visibility = "hidden"
                    board[6].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);
            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player1name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })

            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);

           

        }

        else {
            
            player2wins++;
            $("#player2wins").fadeOut(textfadeout, function () {
                $("#player2wins").text(player2wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[0].style.visibility = "visible"
                    board[3].style.visibility = "visible"
                    board[6].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[6].style.visibility === "hidden") {
                    board[0].style.visibility = "visible"
                    board[3].style.visibility = "visible"
                    board[6].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[0].style.visibility = "hidden"
                    board[3].style.visibility = "hidden"
                    board[6].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player2name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);
            


        }
        return true;
    }

    //2nd column
    else if ((board[1].innerHTML === 'X' && board[4].innerHTML === 'X' && board[7].innerHTML === 'X') || (board[1].innerHTML === 'O' && board[4].innerHTML === 'O' && board[7].innerHTML === 'O')) {
        if (board[1].innerHTML === player1symbol) {
           
            player1wins++;
            $("#player1wins").fadeOut(textfadeout, function () {
                $("#player1wins").text(player1wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[1].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[7].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[1].style.visibility === "hidden") {
                    board[1].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[7].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[1].style.visibility = "hidden"
                    board[4].style.visibility = "hidden"
                    board[7].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);
            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player1name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })

            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);

        }
        else {
           
            player2wins++;
            $("#player2wins").fadeOut(textfadeout, function () {
                $("#player2wins").text(player2wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[1].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[7].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[1].style.visibility === "hidden") {
                    board[1].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[7].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[1].style.visibility = "hidden"
                    board[4].style.visibility = "hidden"
                    board[7].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player2name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);

           


        }
        return true;
    }

    //3rd column
    else if ((board[2].innerHTML === 'X' && board[5].innerHTML === 'X' && board[8].innerHTML === 'X') || (board[2].innerHTML === 'O' && board[5].innerHTML === 'O' && board[8].innerHTML === 'O')) {
        if (board[2].innerHTML === player1symbol) {
            
            player1wins++;
            $("#player1wins").fadeOut(textfadeout, function () {
                $("#player1wins").text(player1wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[2].style.visibility = "visible"
                    board[5].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[2].style.visibility === "hidden") {
                    board[2].style.visibility = "visible"
                    board[5].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[2].style.visibility = "hidden"
                    board[5].style.visibility = "hidden"
                    board[8].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player1name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);

           

        }

        else {
            
            player2wins++;
            $("#player2wins").fadeOut(textfadeout, function () {
                $("#player2wins").text(player2wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[2].style.visibility = "visible"
                    board[5].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[2].style.visibility === "hidden") {
                    board[2].style.visibility = "visible"
                    board[5].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[2].style.visibility = "hidden"
                    board[5].style.visibility = "hidden"
                    board[8].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player2name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
               
                // you have to put a delay function here
            }, timeoutinterval);
           


        }
        return true;
    }

    //1st diagnol
    else if ((board[0].innerHTML === 'X' && board[4].innerHTML === 'X' && board[8].innerHTML === 'X') || (board[0].innerHTML === 'O' && board[4].innerHTML === 'O' && board[8].innerHTML === 'O')) {
        if (board[0].innerHTML === player1symbol) {
            
            player1wins++;
            $("#player1wins").fadeOut(textfadeout, function () {
                $("#player1wins").text(player1wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[0].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[0].style.visibility === "hidden") {
                    board[0].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[0].style.visibility = "hidden"
                    board[4].style.visibility = "hidden"
                    board[8].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);
            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player1name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })

            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);
            

        }
        else {
            
            player2wins++;
            $("#player2wins").fadeOut(textfadeout, function () {
                $("#player2wins").text(player2wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[0].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[0].style.visibility === "hidden") {
                    board[0].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[8].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[0].style.visibility = "hidden"
                    board[4].style.visibility = "hidden"
                    board[8].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player2name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);
           


        }
        return true;
    }

    //2nd diagnol
    else if ((board[2].innerHTML === 'X' && board[4].innerHTML === 'X' && board[6].innerHTML === 'X') || (board[2].innerHTML === 'O' && board[4].innerHTML === 'O' && board[6].innerHTML === 'O')) {
        if (board[2].innerHTML === player1symbol) {
            
            player1wins++;
            $("#player1wins").fadeOut(textfadeout, function () {
                $("#player1wins").text(player1wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[2].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[6].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[2].style.visibility === "hidden") {
                    board[2].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[6].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[2].style.visibility = "hidden"
                    board[4].style.visibility = "hidden"
                    board[6].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);

            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player1name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })
            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);
            

        }
        else{ 

            player2wins++;
            $("#player2wins").fadeOut(textfadeout, function () {
                $("#player2wins").text(player2wins).fadeIn(textfadeout)

            })
            // display winning board animation
            winsound.play();

            var refreshintervalid = window.setInterval(function () {

                if (repeatcount === flashrepeatcountlimit) {
                    clearInterval(refreshintervalid);
                    board[2].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[6].style.visibility = "visible"
                    repeatcount = 0;

                }


                else if (board[2].style.visibility === "hidden") {
                    board[2].style.visibility = "visible"
                    board[4].style.visibility = "visible"
                    board[6].style.visibility = "visible"
                    repeatcount++;
                }
                else {
                    board[2].style.visibility = "hidden"
                    board[4].style.visibility = "hidden"
                    board[6].style.visibility = "hidden"
                    repeatcount++;

                }

            }, flashinterval);
            $("#gamemessage").fadeOut(textfadeout, function () {
                $("#gamemessage").text(player2name + " won this game. We are all set to start the game. Running random turn algorithm").fadeIn(textfadeout)

            })

            window.setTimeout(function () {
                //call clear board function
                intializeboard();
                //randomize turn again
                
                // you have to put a delay function here
            }, timeoutinterval);


        }
        return true;
    }
    

}


//Tie Function

function tie() {

    for (var i = 0; i < board.length; i++) {

        if (board[i].innerHTML === intializesymbol) {
            return false;
        }

        

    }
    gamestied++;

    $("#gamestied").fadeOut(textfadeout, function () {
        $("#gamestied").text(gamestied).fadeIn(textfadeout)

    })

    
       
    return true;

}

//Reset Button
var resetbutton = document.querySelector("#reset")
resetbutton.addEventListener("click", function () {

    gameon = false;
    $("#gamemessage").fadeOut(textfadeout, function () {
        $("#gamemessage").text("Welcome to Tic Tac Toe").fadeIn(textfadeout)

    })

    
    intializeboard();
    player1name = "";
    player2name = "";
    player1symbol = "";
    player2symbol = "";

    player1wins = 0;
    player2wins = 0;
    gamestied = 0;
    player1nameinputform.value = "Enter your Name";
    player2nameinputform.value = "Enter your Name";
    player1buttono.style.visibility = 'visible';
    player1buttonx.style.visibility = 'visible';
    player2buttono.style.visibility = 'visible';
    player2buttonx.style.visibility = 'visible';
    

    $("#player1wins").fadeOut(textfadeout, function () {
        $("#player1wins").text(player1wins).fadeIn(textfadeout)

    })

    $("#player2wins").fadeOut(textfadeout, function () {
        $("#player2wins").text(player2wins).fadeIn(textfadeout)

    })



    $("#gamestied").fadeOut(textfadeout, function () {
        $("#gamestied").text(gamestied).fadeIn(textfadeout)

    })




})

