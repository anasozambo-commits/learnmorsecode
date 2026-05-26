
const morse = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".",
  F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---",
  P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--",
  Z: "--..",
  0: "-----",1:".----",2:"..---",3:"...--",4:"....-",
  5:".....",6:"-....",7:"--...",8:"---..",9:"----."
};

// ---------------- NAV ----------------

function show(id){
  document.querySelectorAll(".section").forEach(s => s.style.display="none");
  document.getElementById(id).style.display="block";
}

// ---------------- TRANSLATOR ----------------

function textToMorse(){
  const t = document.getElementById("input").value.toUpperCase();
  document.getElementById("output").textContent =
    t.split("").map(c => morse[c] || "/").join(" ");
}

function morseToText(){
  const t = document.getElementById("input").value.trim().split(" ");
  let res = "";

  for(let code of t){
    for(let k in morse){
      if(morse[k] === code) res += k;
    }
  }

  document.getElementById("output").textContent = res;
}

// ---------------- ALPHABET ----------------

const list = document.getElementById("alphabetList");
for(let k in morse){
  list.innerHTML += `<p>${k} = ${morse[k]}</p>`;
}

// ---------------- SOUND ----------------

function beep(ms){
  const ctx = new AudioContext();
  const o = ctx.createOscillator();
  o.frequency.value = 800;
  o.connect(ctx.destination);
  o.start();
  setTimeout(()=>{o.stop(); ctx.close();}, ms);
}

// ---------------- GAME ----------------

let xp = 0;
let level = 1;
let lives = 3;
let combo = 0;
let time = 10;
let answer = "";
let timer;

function letters(){
  return Object.keys(morse);
}

function randomLetter(){
  const l = letters();
  return l[Math.floor(Math.random()*l.length)];
}

function generate(){

  let q = "";

  if(level === 1){
    answer = randomLetter();
    q = morse[answer];
  }

  else if(level === 2){
    answer = randomLetter() + randomLetter();
    q = answer.split("").map(x=>morse[x]).join(" / ");
  }

  else if(level === 3){
    answer = randomLetter()+randomLetter()+randomLetter();
    q = answer.split("").map(x=>morse[x]).join(" / ");
  }

  else{
    answer = "HELLO";
    q = answer.split("").map(x=>morse[x]).join(" / ");
  }

  document.getElementById("question").textContent = q;

  resetTimer();
}

function resetTimer(){
  time = 10;
  document.getElementById("time").textContent = time;

  clearInterval(timer);

  timer = setInterval(()=>{
    time--;
    document.getElementById("time").textContent = time;

    if(time <= 0){
      lives--;
      combo = 0;
      beep(100);
      generate();
    }

    if(lives <= 0){
      alert("Game Over 💀");

      xp = 0;
      level = 1;
      lives = 3;
      combo = 0;
    }

    updateUI();
  },1000);
}

function check(){

  const val = document.getElementById("answer").value.trim().toUpperCase();

  if(val === answer){

    xp += 10;
    combo++;

    beep(200);

    if(combo % 3 === 0) level++;

    document.getElementById("result").textContent = "Correct 🎉";
  }

  else{
    lives--;
    combo = 0;
    beep(80);
    document.getElementById("result").textContent = "Wrong 😭";
  }

  document.getElementById("answer").value = "";

  generate();
  updateUI();
}

function updateUI(){

  document.getElementById("xp").textContent = xp;
  document.getElementById("level").textContent = level;
  document.getElementById("lives").textContent = lives;
  document.getElementById("combo").textContent = combo;

  let percent = (xp % 30) * 3.33;
  document.getElementById("barFill").style.width = percent + "%";
}

generate();
updateUI();
