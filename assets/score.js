let scores = JSON.parse(localStorage.getItem("highscr")) || [];
let scoreBoardEl = document.getElementById("score-board");
// console.log(scores);
let insertEl = "";
scores.forEach(score => {
    insertEl += `<li class="hover:scale-125">${score.name} - ${score.scoreOfstu}</li>`
});
// console.log(insertEl);

scoreBoardEl.innerHTML = insertEl;

