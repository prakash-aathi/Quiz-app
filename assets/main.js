const question = document.getElementById("question");
const choices = [...document.getElementsByClassName("choice-text")];
let qsnCountEl = document.getElementById("qsncount");
let scoreEl = document.getElementById("score");
let progreesbarEl = document.getElementById("progressbar")
let loaderEl = document.getElementById("loader")
let bodyEl = document.getElementById("game")

let currentqsn = {};
let acceptinganswer = false;
let score = 0;
let qsncounter = 0;
let availableqsn = [];
let questions = [];

// fetch("questions.json")
//     .then(result => {
//         // console.log(result);
//         return result.json();
//     })
//     .then(loadedquestions => {
//         // console.log(loadedquestions);
//         questions = loadedquestions;
//         startquiz();
//     })
//     .catch(err => {
//         console.error(err);
//     });

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(result => {
        // console.log(result);
        return result.json();
    })
    .then(loadedquestions => {
        // console.log(loadedquestions.results);
        questions = loadedquestions.results.map(loadedquestion => {
            const frmqsn = {
                question: loadedquestion.question
            };

            const anschoices = [...loadedquestion.incorrect_answers];
            frmqsn.answer = Math.floor(Math.random() * 4) + 1;
            // console.log(frmqsn.answer);
            anschoices.splice(frmqsn.answer - 1, 0, loadedquestion.correct_answer);
            anschoices.forEach((choice ,index) => {
                frmqsn["choice" + (index + 1)] = choice;
            });
            return frmqsn;
        });
        startquiz();
    })
    .catch(err => {
        console.error(err);
    });
// 
let bonus = 0;
let max_qsns = 10;

startquiz = () => {
    qsncounter = 0;
    score = 0;
    availableqsn = [...questions]
    // console.log(availableqsn);
    loaderEl.classList.add("hidden")
    bodyEl.classList.remove("hidden")
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableqsn == 0) {
        localStorage.setItem("currentscore", bonus);
        return window.location.assign("../pages/end.html");
    }

    qsncounter++;
    // dynamically updating question count
    qsnCountEl.innerText = `Question ${qsncounter}/${max_qsns}`;
    // progrees bar
    progreesbarEl.className =  `bg-cyan-400 h-7  w-[${(qsncounter/max_qsns)*100}%]`;
    // console.log(progreesbarEl.classList);


    let index = Math.floor(Math.random() * availableqsn.length);
    currentqsn = availableqsn[index];
    question.innerText = currentqsn.question;
    // console.log(currentqsn);
    choices.forEach(choice => {
        // console.log(choice);
        let number = choice.dataset["number"];
        choice.innerText = currentqsn[`choice${number}`];
    });

    availableqsn.splice(index, 1);
    acceptinganswer = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        if (!acceptinganswer) return;
        acceptinganswer = false;
        const selectedanswer = e.target.dataset.number;

        const evaluate = (selectedanswer == currentqsn.answer)? "!bg-green-400"  : "!bg-red-400";
        // console.log(e.target.classList);
        // updating score
        if (evaluate == "!bg-green-400") scoreinc(); 
        
        e.target.classList.add(evaluate);
        e.target.classList.add("text-white");
        setTimeout(() => {
            e.target.classList.remove(evaluate);
            e.target.classList.remove("text-white");
            getNewQuestion();
        }, 1000);
    })
});

scoreinc = () => {
    bonus += 10;
    scoreEl.innerText = bonus;  
}
