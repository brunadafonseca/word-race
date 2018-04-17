if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('service-worker.js')
           .then(() => { console.log('Service Worker Registered') })
           .catch((err) => { console.log(err.message) })
}

const beginnerList = {
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
      en: 'cabbage',
      pt: 'alface',
      options: [
        'alface',
        'cenoura',
        'acelga'
      ]
    },
    {
      en: 'cucumber',
      pt: 'pepino',
      options: [
        'alface',
        'pepino',
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
      en: 'cherry',
      pt: 'cereja',
      options: [
        'abacate',
        'laranja',
        'cereja'
      ]
    },
    {
      en: 'avocado',
      pt: 'abacate',
      options: [
        'abacate',
        'laranja',
        'cereja'
      ]
    }
  ]
}
const intermediaryList = {
  random: [
    {
      en: 'flower',
      pt: 'flor',
      options: [
        'flor',
        'folha',
        'terra'
      ]
    },
    {
      en: 'fridge',
      pt: 'geladeira',
      options: [
        'cadeira',
        'frigideira',
        'geladeira'
      ]
    },
    {
      en: 'table',
      pt: 'mesa',
      options: [
        'almofada',
        'pano',
        'mesa'
      ]
    }
  ],
  colors: [
    {
      en: 'blue',
      pt: 'azul',
      options: [
        'amarelo',
        'azul',
        'verde'
      ]
    },
    {
      en: 'green',
      pt: 'verde',
      options: [
        'amarelo',
        'branco',
        'verde'
      ]
    },
    {
      en: 'black',
      pt: 'preto',
      options: [
        'branco',
        'preto',
        'marrom'
      ]
    },
  ],
  clothing: [
    {
      en: 't-shirt',
      pt: 'camiseta',
      options: [
        'camiseta',
        'vestido',
        'saia'
      ]
    },
    {
      en: 'skirt',
      pt: 'saia',
      options: [
        'vestido',
        'saia',
        'sapato'
      ]
    },
    {
      en: 'bag',
      pt: 'bolsa',
      options: [
        'sapato',
        'blusa',
        'bolsa'
      ]
    }
  ]
}
const advancedList = {
  random: [
    {
      en: 'window',
      pt: 'janela',
      options: [
        'planta',
        'vidro',
        'janela'
      ]
    },
    {
      en: 'wall',
      pt: 'parede',
      options: [
        'parede',
        'telhado',
        'porta'
      ]
    },
    {
      en: 'roof',
      pt: 'telhado',
      options: [
        'janela',
        'porta',
        'telhado'
      ]
    }
  ],
  objects: [
    {
      en: 'pen',
      pt: 'caneta',
      options: [
        'papel',
        'caneta',
        'garrafa'
      ]
    },
    {
      en: 'bottle',
      pt: 'garrafa',
      options: [
        'vidro',
        'vaso',
        'garrafa'
      ]
    },
    {
      en: 'keyboard',
      pt: 'teclado',
      options: [
        'teclado',
        'almofada',
        'planta'
      ]
    },
  ],
  body: [
    {
      en: 'leg',
      pt: 'perna',
      options: [
        'perna',
        'olho',
        'nariz'
      ]
    },
    {
      en: 'ear',
      pt: 'orelha',
      options: [
        'olho',
        'orelha',
        'boca'
      ]
    },
    {
      en: 'finger',
      pt: 'dedo',
      options: [
        'boca',
        'dedo',
        'unha'
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
let lastCategory = ''


// user related

function registerUser() {
  const input = document.getElementById('name')
  user.name = input.value
  user.points = 0
  
  const newUser = JSON.stringify(user)
  localStorage.setItem('WordRaceUser', newUser)
  
  showCategories()
}

function updateUserPoints() {
  user.points = user.points + 10
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

  for (i = 0; i < btns.length; i++) {
    btns[i].innerHTML = options[i]
    btns[i].setAttribute('value', options[i])
  }
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
      newWord()
    }
  document.getElementById('timer').innerHTML = game.seconds;
}

function checkWord(el) {
  if (game.word.pt === el.value.toString()) {
    game.points = game.points + 1
  }
  const p = document.getElementById('user-points')
  p.innerHTML = game.points

  newWord()
}

function showCategories() {
  if (!user.name) {
    return
  }

  clearInterval(game.timerThread)
  
  showSection('game-categories')
}

function newWord() {
  clearInterval(game.timerThread)
  
  if (!game.wordList.length) {
    if (isWinner()) {
      showSection('game-results')
      removeClass('winner', 'hidden')
      updateUserPoints()
      
      game = { ...newGame }
      
      return
    }

    showSection('game-results')
    removeClass('loser', 'hidden')
    
    return 
  } 
  
  setNewWord()
  showSection('game')
  setTimer()
  startTimer()
}

function isWinner() {
  return game.points === 3
}

function startGame(el) {
  game = { ...newGame }
  game.wordList = beginnerList[el.value]
  lastCategory = el.value
  
  newWord()
}

function playAgain() {
  game = { ...newGame }
  game.wordList = beginnerList[lastCategory]
  
  newWord()
}

function next() {
  console.log('to do...')
}

function addClass(id, newClass) {
  const element = document.getElementById(id)
  element.classList.add(newClass)
}

function removeClass(id, oldClass) {
  const element = document.getElementById(id)
  element.classList.remove(oldClass)
}

function showSection(show) {
  const allIds = ['intro', 'game', 'game-categories', 'game-results']
  const hide = allIds.filter(id => id !== show)
  hide.map(id => {
    addClass(id, 'hidden')
  })

  removeClass(show, 'hidden')
}

if (!!user.name) {
  showSection('game-categories')
  const p = document.createElement('p')
  p.innerHTML = user.name
  document.getElementById('profile').appendChild(p)
}

const nameInput = document.getElementById('name')
nameInput.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode
  
  if (key === 13) {
    registerUser(e)
    showSection('game-categories')
  }
})
