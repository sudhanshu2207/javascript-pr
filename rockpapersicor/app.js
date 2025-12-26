//step 1 set user and comp score
let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice"); //accessing all choice div
const msg = document.querySelector("#msg");
const userScoreBoard = document.querySelector("#user-score");
const compScoreBoard = document.querySelector("#comp-score");

// step 4 computer random choice function...................
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    // we generate a number which used as index of array
    const randIdx = Math.floor(Math.random()*3);  
    //so basically Math.floor is using to remove decimal and the number is multiplying give less than number than 3
    return options[randIdx];
}

//step 5 draw game function.................
const drawGame = (compChoice,userChoice) => {
    // console.log("Game is draw");
    msg.innerText = `Game is Draw. (Your choice ${userChoice} || Comp choice ${compChoice})`;
    msg.style.backgroundColor = "black";
}

//step 6 show winner
const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin === true) {
        // console.log("You Win");
        userScore++;
        userScoreBoard.innerText = userScore;
        msg.innerText = `You Win! (Your choice ${userChoice} || Comp choice ${compChoice})`;
        msg.style.backgroundColor = "green";
    } else {
        // console.log("you lose");
        compScore++;
        compScoreBoard.innerText = compScore;
        msg.innerText = `You Lose! (Your choice ${userChoice} || Comp choice ${compChoice})`;
        msg.style.backgroundColor = "red";
    }

}

//step 3 user choice function...............
const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    // Generate computer choice
    const compChoice = genCompChoice();
    console.log("comp choice =", compChoice);

    if (userChoice === compChoice) {
        // Draw game
        drawGame(userChoice,compChoice);
    } else {
        let userWin = true;
        if(userChoice === "rock") {
            //comp choces random scissor, paper
            userWin = compChoice ==="paper" ? false : true;
        } else if(userChoice ==="paper"){
            //comp choice random rock, scissors
            userWin = compChoice === "scissors" ? false : true;
        } else{
            //user choice is scissors
            //comp choice random rock , paper
            userWin = compChoice ==="rock" ? false : true;

        }
        showWinner(userWin,userChoice,compChoice);
    }
};

// step 2 to set click event for choice
choices.forEach((choice) => {
    // console.log(choice);  individual choice print
    choice.addEventListener("click", () =>{
        const userChoice = choice.getAttribute("id"); //getting choice id by getAttribute and store it in userchoice variable
        playGame(userChoice);

    });
});


//pehle humne user or comp ke score ko track kiya
//phir humne apne choice ko access kiya 
//phir saare ke saare choices par event listner add kiya ki jese kisi event ko select kiya jaye uss choice ki id aajaye
//phir hum game ko play karein play function se
//so we have user choice then we generate computer choice by creating compgen function jo humne return kiya vo return hoke ayi play game mein
// ab humare paas hai user choice and compgenerate choice
//then humne usko condition mein lagaya ki same hau toh draw userchoice yeh hua toh ture or false 
//uske baad humne showwinner function  ko create karenge jo play game function ke end pe call kiya
//show winner function mein humne check kiya user true hai ya comp true usme humne msg mein inner text laga ke winner lose or draw lagaya 
//show winner mmein hi humne userscoreboard or compscoreboard bhi upgrade kiya
