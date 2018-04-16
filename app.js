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

const INITIAL_STATE = {
  points: 0,
  level: 'beginner',
  wordList: list,
  word: '',
  duration: 10,
  seconds: 10,
  timerThread: null
}

class Game {
  constructor() {
    this.state = INITIAL_STATE
  }

  setNewWord() {
    const index = Math.floor(Math.random()*this.state.wordList.length)
    this.state.word = this.state.wordList[index]
    this.state.wordList = this.state.wordList.filter(word => word !== this.state.word)
    const p = document.getElementById('word')
    p.innerHTML = this.state.word.en
  }

  startTimer() {
    this.state.timerThread = setInterval(() => this.timer(), 1000)
  }

  timer() {
    this.state.seconds = this.state.seconds - 1
      if (this.state.seconds <= 0) {
        this.start()
      }
    document.getElementById('timer').innerHTML = this.state.seconds;
  }

  checkWord(e) {
    if (this.state.word.pt === e.target.value.trim().toLowerCase()) {
      this.state.points = this.state.points + 1
      e.target.value = ''
      e.target.classList.remove('wrong')
      
      return this.start()
    }

    e.target.classList.add('wrong')
  }

  setTimer() {
    this.state.seconds = this.state.duration
    document.getElementById('timer').innerHTML = this.state.seconds;
  }

  start() {
    clearInterval(this.state.timerThread)

    if (!this.state.wordList.length) {
      console.log(this.state.points, list.length)
      console.log('points: ' + this.state.points)
      return
    }

    this.setTimer()
    this.setNewWord()
    this.startTimer()
  }
}

const game = new Game()

const btn = document.getElementsByClassName('btn-start')

btn.addEventListener('touchstart', () => play())

function play() {
  game.start()

  const guessedWord = document.getElementById('guessed-word')
  guessedWord.addEventListener('keypress', (e) => {
      const key = e.which || e.keyCode
      if (key === 13) {
        game.checkWord(e)
    }
  })
}

window.play = play
