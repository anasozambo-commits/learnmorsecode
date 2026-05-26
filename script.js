window.onload = () => {

const morse = {
  A: ".-", B: "-...", C: "-.-.", D: "-..",
  E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",

  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----."
};

// ---------------- NAVIGATION ----------------

window.show = function(id){

  document
    .querySelectorAll(".section")
    .forEach(sec => sec.style.display = "none");

  document
    .getElementById(id)
    .style.display = "block";
};

// ---------------- TRANSLATOR ----------------

window.textToMorse = function(){

  const text =
    document.getElementById("input")
    .value
    .toUpperCase();

  const result =
    text
      .split("")
      .map(c => morse[c] || "/")
      .join(" ");

  document.getElementById("output")
    .textContent = result;
};

window.morseToText = function(){

  const codes =
    document.getElementById("input")
    .value
    .trim()
    .split(" ");

  let result = "";

  codes.forEach(code => {

    for(let key in morse){

      if(morse[key] === code){
        result += key;
      }
    }
  });

  document.getElementById("output")
    .textContent = result;
};

// ---------------- ALPHABET ----------------

const list =
  document.getElementById("alphabetList");

for(let key in morse){

  list.innerHTML +=
    `<p>${key} = ${morse[key]}</p>`;
}

// ---------------- GAME ----------------

let xp = 0;
let level = 1;
let lives = 3;
let combo = 0;
let answer = "";

function randomLetter(){

  const keys =
    Object.keys(morse);

  return keys[
    Math.floor(Math.random() * keys.length)
  ];
}

function generate(){

  let q = "";

  if(level === 1){

    answer = randomLetter();

    q = morse[answer];
  }

  else if(level === 2){

    answer =
      randomLetter() +
      randomLetter();

    q =
      answer
      .split("")
      .map(x => morse[x])
      .join(" / ");
  }

  else {

    answer =
      randomLetter() +
      randomLetter() +
      randomLetter();

    q =
      answer
      .split("")
      .map(x => morse[x])
      .join(" / ");
  }

  document
    .getElementById("question")
    .textContent = q;
}

window.check = function(){

  const val =
    document
      .getElementById("answer")
      .value
      .trim()
      .toUpperCase();

  if(val === answer){

    xp += 10;
    combo++;

    beep(200);

    document
      .getElementById("result")
      .textContent =
        "Correct 🎉";

    if(combo % 3 === 0){
      level++;
    }

  } else {

    lives--;
    combo = 0;

    beep(80);

    document
      .getElementById("result")
      .textContent =
        "Wrong 😭";
  }

  document
    .getElementById("xp")
    .textContent = xp;

  document
    .getElementById("level")
    .textContent = level;

  document
    .getElementById("combo")
    .textContent = combo;

  document
    .getElementById("lives")
    .textContent = lives;

  document
    .getElementById("answer")
    .value = "";

  if(lives <= 0){

    alert("Game Over 💀");

    xp = 0;
    level = 1;
    combo = 0;
    lives = 3;
  }

  generate();
};

generate();

};
