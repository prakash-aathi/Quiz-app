const question = document.getElementById("question");
const choices = [...document.getElementsByClassName("choice-text")];
let qsnCountEl = document.getElementById("qsncount");
let scoreEl = document.getElementById("score");
let progreesbarEl = document.getElementById("progressbar")

let currentqsn = {};
let acceptinganswer = false;
let score = 0;
let qsncounter = 0;
let availableqsn = [];
let questions = [
    {
        question: "what is HTML ?",
        choice1: "object oriented language",
        choice2: "Scripting language",
        choice3: "programming language",
        choice4: "Advanced frontend Framework",
        answer:2
    },
    {
        question: "what is DOM ?",
        choice1: "document object markup",
        choice2: "document oriented model",
        choice3: "duplicate object model",
        choice4: "document object model",
        answer: 4
    },
    {
        question: "what is react?",
        choice1: "object oriented language",
        choice2: "Scripting language",
        choice3: "programming language",
        choice4: "Advanced frontend Framework",
        answer: 4
    }
]

// 
let bonus = 0;
const max_qsns = 3;

startquiz = () => {
    qsncounter = 0;
    score = 0;
    availableqsn = [...questions]
    // console.log(availableqsn);
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
startquiz();