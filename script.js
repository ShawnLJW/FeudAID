var question_set = {
    "can you eat wild": [
        "strawberries",
        "garlic",
        "blackberries",
        "boar",
        "cherries",
        "rhubarb",
        "carrots",
        "raspberries",
        "turkey",
        "grapes"
    ],
    "restaurants near me that sell": [
        "alcohol",
        "soup",
        "fish",
        "breakfast",
        "salads",
        "lamb chops",
        "steak",
        "fufu",
        "crab legs",
        "pasta"
    ]
};

var currentQuestion, currentAnswer;
var points, guesses_remaining;
var wrong = document.getElementById("wrong");

// Function to initialize the game
function initializeGame() {
    document.getElementById("guess").disabled = false;
    var questions = Object.keys(question_set);
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    currentAnswers = question_set[currentQuestion]

    guesses_remaining = 4;
    points = 0;

    document.getElementById("question").innerHTML = currentQuestion;
    document.getElementById("guesses").innerHTML = 4;
    document.getElementById("points").innerHTML = 0;

    var answersList = document.getElementById("answers");
    answersList.innerHTML = ""; // Clear previous list

    // Create list items for each answer
    currentAnswers.forEach(function(answer) {
        var listItem = document.createElement("li");

        var listQuestion = document.createElement("div");
        listQuestion.textContent = currentQuestion;

        var listAnswer = document.createElement("div");
        listAnswer.textContent = answer;
        listAnswer.classList.add("hidden");

        listItem.appendChild(listQuestion);
        listItem.appendChild(listAnswer);
        answersList.appendChild(listItem);
    });
}

// Function to check the user's guess
function checkGuess() {
    var guess = document.getElementById("guess").value.toLowerCase();
    document.getElementById("guess").value = "";

    search_position = currentAnswers.indexOf(guess)
    console.log(search_position)
    if (search_position != -1) {
        var listAnswers = document.querySelectorAll("#answers li div:nth-child(2)");
        listAnswers[search_position].classList.remove("hidden");

        points = points + search_position * -1000 + 10000
        document.getElementById("points").innerHTML = points;
    } else {
        guesses_remaining -= 1;
        console.log(guesses_remaining);
        document.getElementById("guesses").innerHTML = guesses_remaining;
        wrong.style.display = "block";
        setTimeout(function() {
            wrong.style.display = "none";
        }, 500);
    }

    if (guesses_remaining <= 0) {
        document.getElementById("guess").disabled = true;
        var listAnswers = document.querySelectorAll("#answers li div:nth-child(2)");
        listAnswers.forEach(function(answer) {
            answer.classList.remove("hidden");
        });
    }
}

// Event listener for the input field
document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess();
    }
});

// Function to move to the next question
function nextQuestion() {
    document.getElementById("guess").value = "";
    initializeGame();
}

// Event listener for the next button
document.getElementById("next").addEventListener("click", nextQuestion);

// Initialize the game when the page loads
window.addEventListener("load", initializeGame);