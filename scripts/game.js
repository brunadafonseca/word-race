if ('serviceWorker' in navigator) {
  console.log('serviceworker in navigator')
  navigator.serviceWorker
           .register('service-worker.js')
           .then(() => { console.log('Service Worker Registered') })
           .catch((err) => { console.log(err.message) })
}

const list = [
  {
    en: "one",
    pt: "um"
  },
  {
    en: "two",
    pt: "dois"
  },
  {
    en: "three",
    pt: "tres"
  },
  {
    en: "four",
    pt: "quatro"
  },
  {
    en: "five",
    pt: "cinco"
  },
  {
    en: "six",
    pt: "seis"
  },
  {
    en: "seven",
    pt: "sete"
  },
  {
    en: "eight",
    pt: "oito"
  },
  {
    en: "nine",
    pt: "nove"
  },
  {
    en: "ten",
    pt: "dez"
  }
]

const newGame = {
  points: 0,
  wordList: list,
  duration: 10,
  seconds: 10,
  word: null,
  timerThread: null,
}

let game = newGame

function setNewWord() {
  const index = Math.floor(Math.random()*game.wordList.length)
  game.word = game.wordList[index]
  game.wordList = game.wordList.filter(word => word !== game.word)
  
  const p = document.getElementById('word')
  p.innerHTML = game.word.en
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

function checkWord(e) {
  if (game.word.pt === e.target.value.trim().toLowerCase()) {
    game.points = game.points + 1
    e.target.value = ''
    e.target.classList.remove('wrong')
    
    

    return start()
  }

  e.target.classList.add('wrong')
}

function setTimer() {
  game.seconds = game.duration
  document.getElementById('timer').innerHTML = game.seconds;
}

function start() {
  clearInterval(game.timerThread)

  if (!game.wordList.length) {
    if (isWinner()) {
      updateUserLevel("intermediary")
      console.log('winner')
      
      return window.alert('Points: ' + game.points)
    }

    if (window.confirm('You lost. Play again?')) {
      game.wordList = list
      game.points = 0
      start()
    }
  } else {
    setTimer()
    setNewWord()
    startTimer()
  }
}

function isWinner() {
  return game.points === list.length
}

let user = getUser() || {}

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
    const intro = document.getElementById('intro')
    intro.classList.add('hide')
    const gameWrapper = document.getElementById('game')
    gameWrapper.classList.remove('hide')
    document.getElementById('guessed-word').focus()
    play()
  }
})

const btn = document.getElementsByClassName('btn-start')
btn.addEventListener('touchstart', play)

function play() {
  start()

  const guessedWord = document.getElementById('guessed-word')
  guessedWord.addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode
    if (key === 13) {
      checkWord(e)
    }
  })
}

