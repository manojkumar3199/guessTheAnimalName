const pickAnswer = ["dog", "cat", "fox", "jaguar", "panda"];
let ans = pickAnswer[Math.floor(Math.random() * pickAnswer.length)];
console.log(ans);

ans = ans.split("").join(" ").split("");

let que = ans.map((item) => {
  let result = item === " " ? " " : "_";
  return result;
});

console.log({ answer: ans, question: que });

const banner = document.createElement("h2");
banner.innerHTML = "guess the animal name ?";
document.body.appendChild(banner);

const h1 = document.createElement("h1");
h1.setAttribute("id", "dashboard");
h1.textContent = que.join("");
document.body.appendChild(h1);

let count = 0;
const h4 = document.createElement("h4");
h4.setAttribute("id", "wrong-guess");
h4.textContent = `wrong guess: ${count} of 4`;
document.body.insertBefore(h4, h1);

const div = document.createElement("div");
div.className = "keyboard";
const alpabets = "abcdefghijklmnopqrstuvwxyz".split("");

alpabets.forEach((item) => {
  const btn = document.createElement("button");
  btn.className = "button";
  btn.textContent = item;
  div.appendChild(btn);

  btn.onclick = function () {
    btn.disabled = true;
    let j = -1;
    if (incrementWrongGuess(btn.textContent)) {
      checkLost();
      return;
    }
    updateLetters(btn.textContent, j);
    checkWin();
  };
});
document.body.appendChild(div);

function checkLost() {
  if (count === 4) {
    alert(
      `You Lost!! The answer was ${[...ans]
        .filter((char) => char != " ")
        .join("")}.`
    );
    const buttons = document.getElementsByClassName("button");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
}

function checkWin() {
  if (JSON.stringify(que) === JSON.stringify(ans)) {
    alert("You Win!!");
    const buttons = document.getElementsByClassName("button");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
}

function incrementWrongGuess(letter) {
  if (ans.indexOf(letter) === -1) {
    count++;
    document.getElementById(
      "wrong-guess"
    ).textContent = `wrong guess: ${count} of 4`;
    return true;
  }
  return false;
}

function updateLetters(letter, index) {
  while (true) {
    index = ans.indexOf(letter, ++index);
    console.log(index);
    if (index === -1) break;
    que[index] = letter;
    console.log(que);
    document.getElementById("dashboard").textContent = `${que.join("")}`;
  }
}

const refreshBtn = document.createElement("button");
refreshBtn.textContent = "restart";
refreshBtn.className = "reload-btn";
refreshBtn.onclick = function () {
  window.location.reload();
};
document.body.appendChild(refreshBtn);
