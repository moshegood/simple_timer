
const container = document.querySelector(".container")
const total = document.querySelector("#total")
const current = document.querySelector("#current")
const start = document.querySelector("#start")
const active = document.querySelector(".active")
const inactive = document.querySelector(".inactive")

const msToDuration = (ms) => {
  secs = Math.floor(Number(ms)/1000)
  mins = Math.floor(secs/60)
  hours = Math.floor(mins/60)
  secs = Math.floor(secs - mins * 60)
  mins = Math.floor(mins - hours * 60)
  return hours + ":" + mins.toString().padStart(2,'0') + ":" + secs.toString().padStart(2,'0') 
}

const showTimers = () => {
  now = new Date().getTime()
  started = localStorage.getItem('started')
  total.innerText = msToDuration(localStorage.getItem('total')) 
  isRunning = localStorage.getItem('running') == "true"
  console.log(isRunning)
  active.style.display = isRunning ? "block" : "none"
  inactive.style.display = !isRunning ? "block" : "none"
  current.innerText = msToDuration(now - started)
  start.innerText = new Date(Number(started)).toTimeString()
}

const refreshTimers = () => {
  showTimers()
  setInterval(showTimers, 1000)
}

const resetTotal = () => {
  localStorage.setItem('total', 0)
  showTimers()
}
const startTimer = () => {
  localStorage.setItem('running', true)
  localStorage.setItem('started', new Date().getTime())
  showTimers()
}
const stopTimer = () => {
  localStorage.setItem('running', false)
  newTotal = Number(localStorage.getItem('total')) +
    new Date().getTime() -
    Number(localStorage.getItem('started'))
  localStorage.setItem('total', newTotal)
  showTimers()
}

document.addEventListener("DOMContentLoaded", refreshTimers)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/simple_timer/serviceWorker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed :-( ', err);
    });
  });
}

if (!localStorage.getItem('total')) {
  localStorage.setItem('total', 0)
}
if (!localStorage.getItem('running')) {
  localStorage.setItem('running', false)
}
