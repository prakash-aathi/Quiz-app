let scoreEl = document.getElementById("score");
let usernameEl = document.getElementById("username");
let submitbtn = document.getElementById("submitbtn");
let currentscore = localStorage.getItem("currentscore") 

scoreEl.innerText = currentscore;

const highscr = JSON.parse(localStorage.getItem("highscr")) || [];
// console.log(highscr);

usernameEl.addEventListener("input", () => {
    submitbtn.disabled = usernameEl.value.length == 0 ? true : false;
})

submitbtn.addEventListener("click", (e) => {
    e.preventDefault();

    const scr = {
        scoreOfstu: currentscore,
        name: usernameEl.value
    };
    highscr.push(scr);

    highscr.sort((a, b) => b.scoreOfstu - a.scoreOfstu);
    highscr.splice(5);
    localStorage.setItem("highscr", JSON.stringify(highscr));
    // console.log(scr);
    window.location.assign("/");
})
