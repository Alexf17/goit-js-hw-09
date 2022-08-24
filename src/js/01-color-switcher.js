import '../css/common.css'

const TIMEOUT_CHANGE_COLOR = 1000

const startRandom = document.querySelector('button[data-start]');
const stopRandom = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
startRandom.disabled = false;
stopRandom.disabled = true;

startRandom.addEventListener("click", onStartClick)
stopRandom.addEventListener("click", onStopClick)
  
function onStartClick() {
  startRandom.setAttribute("disabled", "disabled");
  stopRandom.disabled = false
  timerId = setInterval(() => {
    let randomColor = getRandomHexColor()
    body.style.backgroundColor = randomColor
  }, TIMEOUT_CHANGE_COLOR);
}


function onStopClick() {
  clearInterval(timerId);
  startRandom.removeAttribute("disabled")
  stopRandom.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

