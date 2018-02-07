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
    ["CAST AWAY", , ],
    ["FORREST GUMP", , ],
    ["BIG", ,],
    ["SULLY", ,],
    ["CATCH ME IF YOU CAN", ,], 
    ["SAVING PRIVATE RYAN", ,],
    ["GREEN MILE", ,],
    ["CAPTAIN PHILLIPS", ,], 
    ["TOY STORY", ,],
    ["SAVING MR BANKS", ,],
    ["BRIDGE OF SPIES", ,],
    ["PHILADELPHIA", ,],
    ["THAT THING YOU DO", ,],
    ["JOE VERSUS THE VOLCANO", ,],
    ["THE BONFIRE OF THE VANITIES", ,],
    ["A LEAGUE OF THEIR OWN", ,],
    ["SLEEPLESS IN SEATTLE", , ]
];

//initialize values
var winCount = 0;
var totalNumGuesses = 10;
var diffLevel = ["Easy", "Hard", "MovieBuff"];

//gameboard setup - display wins, hide guessed letters, hide letter/blanks of movie

function Game {
    this.movieIndex = rand();
    this.movie = movieList[movieIndex];
    this.movieName = movie[0];  //movie name for guessing
    this.movieSound = movie[1]; //path for movie sound
    this.movieCliip = movie[2]; //path for movie clip
    this.currentWordState = "";
    this.guessedLetters=[];
    this.numGuesses=totalNumGuesses;

    function initCurrentWordtate() {
        var step;
        foreach (step = 0, step < this.movieName.length, step++) {
            // Runs 5 times, with values of step 0 through 4.
            if movieName[step] != " " {
                currentWordState = currentWordState + ("_");
            }
            else {
                currentWordState = currentWordState + ("_");
            }
        }
    }

    function writeCurrentWordState() {
        document.write (currentWordState);
    }

    function findLetter(letter) {
        //convert letter to uppercase
        var guessedLetter = letter.toUpper();
        var index = 0;
        var found = false;
        //while not end of word search movieName for index of guessed letter
        //forloop word index
        if (index != -1) { 
            found = true;
            //set currentWordState index to guessed letter
            //search from foundIndex for additional indeces of guessed letter
        }
        //return found
    }

    function updateCurrentWordState (letter, index){
        //while not end of word search movieName for index of guessed letter
        //forloop word index
    }

    function processGuessedLetter(letter){
       //if letter was found
        if findLetter(letter){
            updateCurrentWordState();    
            writeCurrentWordState();
            //if the movie name and the current word state match - they won!
            if (this.movieName === this.currentWordState) {
                //play sound and audio clip
            }
            else {
                //display good job message and keep going
            }
        }
        //letter was not found
        else {
            //decrease remaining guesses
            numGuesses -= 1;
            if (numGuesses > 0){
                //display guesses letters
                //display guess again message
            }
            else {
                //display game over and play sound
            }
                
        }
        
    }
}
//While not (ESC) 
//Start- upon key enter get rand() movie object from movie list
//initiate game - calculate blanks and spaces from movie.Name
//display blanks and spaces
//1. prompt user to guess a letter
//2. if letter is in movie.Name replace blanks with guessed letter 
//  else show letter in guessed letters and subtract 1 from guesses remaining
//3.if win (puzzle solved) play song / video
//  else if not lose (guesses remaining) loop to 1. prompt user to guess letter
//  else play loser song



