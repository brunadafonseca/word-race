if ('serviceWorker' in navigator) {
  console.log('serviceworker in navigator')
  navigator.serviceWorker
           .register('service-worker.js')
           .then(() => { console.log('Service Worker Registered') })
           .catch((err) => { console.log(err.message) })
}

const list = {
  animals: [
    {
      en: 'cow',
      pt: 'vaca',
      options: [
        'coelho',
        'ovelha',
        'vaca'
      ]
    },
    {
      en: 'rabbit',
      pt: 'coelho',
      options: [
        'coelho',
        'gato',
        'arara'
      ]
    },
    {
      en: 'cat',
      pt: 'gato',
      options: [
        'cachorro',
        'lagarto',
        'gato'
      ]
    }
  ],
  veggies: [
    {
      en: 'carrot',
      pt: 'cenoura',
      options: [
        'alface',
        'cenoura',
        'acelga'
      ]
    },
    {
      en: 'carrot',
      pt: 'cenoura',
      options: [
        'alface',
        'cenoura',
        'acelga'
      ]
    },
    {
      en: 'carrot',
      pt: 'cenoura',
      options: [
        'alface',
        'cenoura',
        'acelga'
      ]
    },
  ],
  fruits: [
    {
      en: 'orange',
      pt: 'laranja',
      options: [
        'abacate',
        'laranja',
        'cereja'
      ]
    },
    {
      en: 'orange',
      pt: 'laranja',
      options: [
        'abacate',
        'laranja',
        'cereja'
      ]
    },
    {
      en: 'orange',
      pt: 'laranja',
      options: [
        'abacate',
        'laranja',
        'cereja'
      ]
    }
  ]
}

const newGame = {
  points: 0,
  wordList: [],
  duration: 5,
  seconds: 5,
  word: null,
  timerThread: null,
}

let game = { ...newGame }
let user = getUser() || {}

// user related

if (!!user.name) {
  addClass('intro', 'hidden')
  removeClass('game-categories', 'hidden')
  const p = document.createElement('p')
  p.innerHTML = user.name
  document.getElementById('profile').appendChild(p)
}

function registerUser(e) {
  localStorage.removeItem('WordRaceUser')
  user.name = e.target.value
  user.level = 'beginner'
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

// game related

function setNewWord() {
  const index = Math.floor(Math.random()*game.wordList.length)
  game.word = game.wordList[index]
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

function setTimer() {
  game.seconds = game.duration
  document.getElementById('timer').innerHTML = game.seconds;
}

function startTimer() {
  game.timerThread = setInterval(() => timer(), 1000)
}

function timer() {
  game.seconds = game.seconds - 1
    if (game.seconds <= 0) {
      startGame()
    }
  document.getElementById('timer').innerHTML = game.seconds;
}

function checkWord(el) {
  if (game.word.pt === el.value.toString()) {
    game.points = game.points + 1
  }

  startGame()
}

function startGame() {
  clearInterval(game.timerThread)
  
  if (!game.wordList.length) {
    if (isWinner()) {
      addClass('game', 'hidden')
      removeClass('game-results', 'hidden')
      window.alert('you won! your score is: ' + game.points)
      game = { ...newGame }
      return
    }
  } 
  
  setNewWord()
  addClass('game-categories', 'hidden')
  removeClass('game', 'hidden')
  setTimer()
  startTimer()
}

function isWinner() {
  return game.points === 3
}

function play(el) {
  game = { ...newGame }
  game.wordList = list[el.value]
  startGame()
}

const name = document.getElementById('name')
name.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode
  
  if (key === 13) {
    registerUser(e)
    addClass('intro', 'hidden')
    removeClass('game-categories', 'hidden')
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

