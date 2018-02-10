//Display press any key to get started
//Show the number of letter guesses remaining
//Show the guessed letters

//Show Wins: (# of times user guessed the word correctly).

//After the user wins / loses the game should automatically choose another word and make the user play it. 

//##### Hangman Game Bonuses 
// //1. Play a sound or song when the user guesses their word correctl
// 2. Write some stylish CSS rules to make a design that fits your game's theme.
// 3. ** HARD MODE:** Organize your game code as an object, except for the key events to get the letter guessed.
//      This will be a challenge if you haven't coded with JavaScript before, but we encourage anyone already familiar with the language to try this out.
// 4. Save your whole game and its properties in an object.
// 5. Save any of your game's functions as methods, and call them underneath your object declaration using event listeners.
// 6. Don't forget to place your global variables and functions above your object.
//     * Remember: global variables, then objects, then calls.
// 7. Definitely talk with a TA or your instructor if you get tripped up during this challenge.

//Create list of movie objects for guessing with properties: name, music, video
var movieList = [
    ["CAST AWAY", 
        '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' , 
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/FiiCxvGnkA8?rel=0&amp;controls=0&amp;showinfo=0&amp;start=120" frameborder="0" allow="autoplay; encrypted-media"></iframe>' ],
    ["FORREST GUMP",
        '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/bLvqoHBptjg?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'],
    ["BIG", 
        '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/9pX1hxYW3YY?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'],
    ["SULLY",
        '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/Yo2PbaiN1tU?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'],
    ["CATCH ME IF YOU CAN",
        '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">',
    ],
    ["SAVING PRIVATE RYAN",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["GREEN MILE",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["CAPTAIN PHILLIPS",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["TOY STORY",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["SAVING MR BANKS", 
    '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["BRIDGE OF SPIES",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["PHILADELPHIA",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["THAT THING YOU DO",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["JOE VERSUS THE VOLCANO",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["THE BONFIRE OF THE VANITIES",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["A LEAGUE OF THEIR OWN",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ],
    ["SLEEPLESS IN SEATTLE",
     '<source src="./assets/audio/old_movie_projector.wav" type="audio/wav">' ,
    ]
];

//initialize values
var winCount = 0,
    gameOver = false,
    isPlaying = false,
    userWon = false,
    totalNumGuesses = [["Easy",10], ["Hard", 8],["MovieBuff", 5]],
    startMessage = "Press any key to begin. Press 'ESC' to exit.",
    userGuess = "",
    currentWordState = [],
    currentWord = "",
    game;


//prompt user to press any key to begin. esc to exit
document.getElementById("gameMessage").textContent = startMessage;

// this function is run whenever the user presses a key - listen for key press to begin game
document.onkeyup = function () {

    userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    console.log("Key entered: " + userGuess);
    console.log("CurrentWordState: " + currentWordState + " isPlaying: " + isPlaying);

    //listen for special character "esc" to end the game
    if (event.keyCode !== 27) {
        //the first keystroke starts the game
        if (!isPlaying) {
            //create a new game
            startNewGame();
        }
        else {
            //process the guessed letter and update gameboard
            processGuessedLetter(game, userGuess);
        }
       
        if (gameOver) {
            isPlaying = false;
            var audioHTML,videoHTML;
            if (userWon) {
                console.log("playing reward");
                audioHTML = game.movieSound;
                videoHTML = game.movieClip;
                document.getElementById("playAudio").innerHTML = audioHTML; 
                document.getElementById("playMovie").innerHTML= videoHTML; 
            }
            //play song and video
            else {
                audioHTML = '<source src="./assets/audio/Tree_Fall_Small.wav" type="audio/wav">';
                document.getElementById("playAudio").innerHTML = audioHTML; 
            } 
            //startNewGame();
        }
    }
    else {
        document.getElementById("gameMessage").textContent = "Thanks for playing!";
    }
}

function startNewGame() {
    //create a new game and init settings
    game = new Game();
    game.initGame();
    game.adjustDifficulty();
    initCurrentWordState(game.movieName);
    //flip the flag to isPlaying so we know not to start a new game on next key up
    isPlaying = true;
    //update the browser window
    document.getElementById("gameMessage").textContent = "Guess a letter in this movie name.";
    document.getElementById("numGuessesLeft").textContent = game.numGuessesLeft;
    document.getElementById("numWins").textContent = winCount;
    document.getElementById("guessedLetters").textContent = "";
    document.getElementById("diffLevel").textContent = totalNumGuesses[game.diffLevel][0];
    displayCurrentWord();
}

//create a game object and call it to begin a new round
function Game() {
    this.movieIndex = Math.floor(Math.random() * movieList.length);
    this.movie = movieList[this.movieIndex];
    this.movieName = this.movie[0];  //movie name for guessing
    this.movieSound = this.movie[1]; //path for movie sound
    this.movieClip = this.movie[2]; //path for movie clip
    this.winningWord = "";
    this.guessedLetters = [];
    this.diffLevel = 0;
    this.numGuessesLeft = totalNumGuesses[this.diffLevel][1];
    this.initGame = initGame;
    this.adjustDifficulty = adjustDifficulty;


    console.log(this.movieName);

    //initialize global values for new game and set current game word with as blanks
    function initGame () {
        gameOver = false;
        userWon = false;
        userGuess = "";
        for (var i = 0; i < this.movieName.length; i++) {
            this.winningWord += this.movieName[i];
            this.winningWord += " ";
        }
        this.winningWord
        console.log("initializing game");
    }

    function adjustDifficulty () {
        var guessIndex = 1;
        //check global win count and adjust num of guesses
        if (winCount < 5){
            this.diffLevel = 0; //easy
        }
        else if (winCount < 10) {
            this.diffLevel = 1; //hard
        }
        else {
            this.diffLevel = 2; //moviebuff
        }
        this.numGuessesLeft = totalNumGuesses[this.diffLevel][guessIndex];
    }
}

//create a gameboard for the current movieName
function initCurrentWordState(movieName) {
    currentWordState = [];
    console.log("init currentWordState" + currentWordState + "for moviename " + movieName);
    for (var i = 0; i < movieName.length; i++) {
        // Runs 5 times, with values of step 0 through 4.
        if (movieName[i] != " ") {
            currentWordState.push(["_"]);
        }
        else {
            currentWordState.push([" "]);
        }
    }
    displayCurrentWord();
    console.log("init currentWordState" + currentWordState);
}

//utility function to determine if guessed letter is in the array  
function findLetter(array, letter) {
    //letter converted to uppercase in on key up method
    var found = false;
    if (array != "") {
        var index = array.indexOf(letter);
        if (index != -1) {
            found = true;
            console.log("found it at index: " + index);
        }
    }
    return found;
}

// if game is in progress, call this function after onKeyUp() to handle the turn    
function processGuessedLetter(gameSession, letter) {
    //if letter was found
    var word = gameSession.movieName;
    if (findLetter(word, letter)) {
        console.log("found it");
        updateCurrentWord(letter);

        //if all of the blanks have been turned - they won!
        if (!findLetter(currentWord,"_")) {
            winCount++;
            userWon = true;
            gameOver = true;
            //play display message
            document.getElementById("gameMessage").textContent = "Winner Winner Chicken Dinner!";
            document.getElementById("numWins").textContent = winCount;
        }
        else {
            //display good job message and keep going
            document.getElementById("gameMessage").textContent = "Good Guess! Keep up the good guessing!";
        }
    }
    //letter was not found
    else {
        console.log("numguesses= " + gameSession.numGuessesLeft + " NOT FOUND");
        //check to see if they've already guessed this letter
        if (!findLetter(gameSession.guessedLetters, letter)) {
            //decrease remaining guesses and add to list of guessed letters
            processWrongGuess();
        }
        else {
            document.getElementById("gameMessage").textContent = "You've already guessed that letter. Try again.";
        }

    }


    function processWrongGuess() {
        gameSession.numGuessesLeft--;
        console.log("now numguesses= " + gameSession.numGuessesLeft);
        //update the screen with the number of Guesses left
        document.getElementById("numGuessesLeft").textContent = gameSession.numGuessesLeft;
        if (gameSession.numGuessesLeft > 0) {
            gameSession.guessedLetters.push(letter);
            //display guesses letters
            document.getElementById("guessedLetters").textContent = formatArrayToString(gameSession.guessedLetters);
            //display guess again message
            var msg = "Ouch! You're not hung yet. Only " + gameSession.numGuessesLeft + " guesses left.";
            if (gameSession.numGuessesLeft === 1){
                msg = "Be careful! Guess wrong and you're hung.";
            }
            document.getElementById("gameMessage").textContent = msg;
        }
        else {
            //display game over and play sound
            document.getElementById("gameMessage").textContent = "Ouch! HANGMAN! Press any key to play again.";
            gameOver = true;
        }
    }
}



//update the current word state in the background and update the browser to reveal the guessed letter 
function updateCurrentWord(letter) {

    console.log("update: " + currentWordState + " with " + letter);
    for (var i = 0; i < game.movieName.length; i++) {
        if (game.movieName.indexOf(letter, i) === i) {
            console.log("Found letter at index " + i + ". Updating current word.");
            currentWordState[i] = [letter];
            console.log("updated index letter: " + currentWordState[i]);
        }
    }

    console.log("updated current word: " + currentWordState);
    displayCurrentWord();
}




//utility function that converts the commas separated array of letters into a string
function formatArrayToString(array) {
    //clear global current string
    var word = "";
    //build string from current guessed letters
    for (var i = 0; i < array.length; i++) {
        word += array[i];
    }
    return word;
}

//create html string to format word on browser
function displayCurrentWord(){
    currentWord = formatArrayToString(currentWordState);
    var html = "<span> <strong>";
    for (var i= 0; i < currentWord.length; i++){
        
        if(currentWord[i] !== " "){
            html += currentWord[i] + " "
        }
        else {
            html += "&nbsp";
        }
    }
    html += "</strong></span>";
    document.getElementById("currentWord").innerHTML = html;
}



