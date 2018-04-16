// let user = getUser() || {}

// function registerUser(e) {
//   localStorage.removeItem('WordRaceUser')
//   user.name = e.target.value
//   const newUser = JSON.stringify(user)
//   localStorage.setItem('WordRaceUser', newUser)
// }

// function updateUserLevel(l) {
//   user.level = l
//   const updatedUser = JSON.stringify(user)
//   localStorage.setItem('WordRaceUser', updatedUser)
// }

// function getUser() {
//   return JSON.parse(localStorage.getItem('WordRaceUser'))
// }

// const name = document.getElementById('name')
// name.addEventListener('keypress', (e) => {
//   const key = e.which || e.keyCode
//   if (key === 13) {
//     registerUser(e)
//     addClass('intro', 'hide')
//     removeClass('game', 'hide')
//   }
// })

// function addClass(id, newClass) {
//   const element = document.getElementById(id)
//   element.classList.add(newClass)
// }

// function removeClass(id, oldClass) {
//   const element = document.getElementById(id)
//   element.classList.remove(oldClass)
// }
