if ('serviceWorker' in navigator) {
  console.log('serviceworker in navigator')
  navigator.serviceWorker
           .register('service-worker.js')
           .then(() => { console.log('Service Worker Registered') })
           .catch((err) => { console.log(err.message) })
}

// if ('PushManager' in window ) {
//   window.alert('push manager in window xD')
// }

const list = [
  {
    en: "one",
    pt: "um",
    options: [
      "sete",
      "um",
      "quatro"
    ]
  },
  {
    en: "two",
    pt: "dois",
    options: [
      "dois",
      "um",
      "quatro"
    ]
  },
  {
    en: "three",
    pt: "tres",
    options: [
      "tres",
      "um",
      "quatro"
    ]
  }
]

const newGame = {
  points: 0,
  wordList: list,
  duration: 5,
  seconds: 5,
  word: null,
  timerThread: null,
}

let game = { ...newGame }

function setNewWord() {
  const index = Math.floor(Math.random()*game.wordList.length)
  game.word = game.wordList[index]
  console.log('test')
  game.wordList = game.wordList.filter(word => word !== game.word)

  const p = document.getElementById('word')
  p.innerHTML = game.word.en

  const options = game.word.options
  const btns = document.querySelectorAll('.word-option')
  btns[0].innerHTML = options[0]
  btns[1].innerHTML = options[1]
  btns[2].innerHTML = options[2]
  btns[0].setAttribute('value', options[0])
  btns[1].setAttribute('value', options[1])
  btns[2].setAttribute('value', options[2])
}

function startTimer() {
  game.timerThread = setInterval(() => timer(), 1000)
}

function timer() {
  game.seconds = game.seconds - 1
    if (game.seconds <= 0) {
      start()
    }
  document.getElementById('timer').innerHTML = game.seconds;
}

function checkWord(el) {
  el.classList.add('active')
  if (game.word.pt === el.value.toString()) {
    game.points = game.points + 1
  }

  el.classList.remove('active')
  start()
}

function setTimer() {
  game.seconds = game.duration
  document.getElementById('timer').innerHTML = game.seconds;
}

function start() {
  console.log(game.wordList)
  clearInterval(game.timerThread)
  
  if (!game.wordList.length) {
    if (isWinner()) {
      return window.alert('you won! your score is: ', + game.points)
    }
  } 
  
  console.log('hi')
  setTimer()
  setNewWord()
  startTimer()
}

function createNewDiv() {
  return `<div class="test"></div>`
}

function isWinner() {
  return game.points === list.length
}

// user related

let user = getUser() || null
if (!!user) {
  const p = document.createElement('p')
  p.innerHTML = user.name
  document.getElementById('profile').appendChild(p)
}

function registerUser(e) {
  localStorage.removeItem('WordRaceUser')
  user.name = e.target.value
  const newUser = JSON.stringify(user)
  localStorage.setItem('WordRaceUser', newUser)
}

function updateUserLevel(l) {
  user.level = l
  const updatedUser = JSON.stringify(user)
  
  localStorage.setItem('WordRaceUser', updatedUser)
}

function getUser() {
  return JSON.parse(localStorage.getItem('WordRaceUser'))
}

const name = document.getElementById('name')
name.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode
  
  if (key === 13) {
    registerUser(e)
    addClass('intro', 'hide')
    removeClass('game', 'hide')
    game = { ...newGame }
    start()
  }
})

function addClass(id, newClass) {
  const element = document.getElementById(id)
  element.classList.add(newClass)
}

function removeClass(id, oldClass) {
  const element = document.getElementById(id)
  element.classList.remove(oldClass)
}

// const btns = document.querySelectorAll('.word-option').forEach(btn => {
//   btn.addEventListener('touchend', fix)
// })

// function fix() {
//     var el = this;
//     var par = el.parentNode;
//     var next = el.nextSibling;
//     window.alert(el)
//     par.removeChild(el);
//     setTimeout(function() {par.insertBefore(el, next);}, 0)
// }


// const btn = document.getElementsByClassName('btn-start')
// btn.addEventListener('touchstart', play)

// function play() {
//   start()
  

  // const guessedWord = document.getElementById('guessed-word')
  // guessedWord.addEventListener('keypress', (e) => {
  //     const key = e.which || e.keyCode
  //     if (key === 13) {
  //       checkWord(e)
  //   }
  // })
// }


