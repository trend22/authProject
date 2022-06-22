//для получения информации о текущем пользователе
const currentUserEmail = document.querySelector('#currentUserEmail')
const exitUserBtn = document.querySelector('#exitUser')
const changePasswordBtn = document.querySelector('#changePassword')
let tableUsers = document.querySelectorAll('tbody')
let dataUsers = document.querySelectorAll('#dataUsers')
//для работы с модальным окном
let modal = document.querySelector('.modal')
let body = document.querySelector('body')
let modalBtnClose = modal.querySelector('.btn-close')
let modalBtnSecondaryClose = modal.querySelector('.btn-secondary')
let modalBtnChangePassword = modal.querySelector('.btn-primary')
let modalInputOldPassword = modal.querySelector('#oldPassword')
let modalInputNewPassword = modal.querySelector('#newPassword')

const getCurrentUserEmail = () => {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'))
  // console.log(currentUser)
  currentUserEmail.innerText = `Пользователь: ${currentUser.email}\nДата регистрации: ${currentUser.regDate}`
  // currentUserEmail.sty
}

const getExitUser = () => {
  localStorage.removeItem('currentUser')
  window.location.href = './index.html'
}

const getDataUsers = () => {
  //переменная для перебора пользователей в localStorage
  let i = 0
  //переменная для вывода номера пользователя в таблице
  let count = 0
  // переменная для записи данных пользователя из localStorage
  let usersFromLocalStorage = []

  //перемебор пользователй
  for (let [key, value] of Object.entries(localStorage)) {
    //достаём данные
    if (key !== 'currentUser') {
      usersFromLocalStorage.push(JSON.parse(value))
    } else continue

    //проверка пользователя в localStorage на того, кто залогинился
    if (key !== 'currentUser') {
      // если это первый пользователь, то записываем данные
      if (i === 0) {
        dataUsers[i].innerHTML =
          `<th scope = "row" id = "numElem" >${count + 1}</th>` +
          `<td id = "emailUser" >${usersFromLocalStorage[i].email}</td>` +
          `<td id = "dataRegistrUser" >${usersFromLocalStorage[i].regDate}</td>` +
          `<td id = "note" > - </td>`
      } else {
        //следующие пользователи добавляются методом клонирования.
        let cloneElem = dataUsers[0].cloneNode()
        cloneElem.innerHTML =
          `<th scope = "row" id = "numElem" >${count + 1}</th>` +
          `<td id = "emailUser" >${usersFromLocalStorage[i].email}</td>` +
          `<td id = "dataRegistrUser" >${usersFromLocalStorage[i].regDate}</td>` +
          `<td id = "note" > - </td>`
        tableUsers[0].append(cloneElem)
      }
    } else {
      //уменьшаем значение в случае если тз localStorage достали залогининного пользователя
      //выводить в таблицу его не нужно, т.к. тогда данные будут дублироваться
      count--
    }
    i++
    count++
  }

  console.log(usersFromLocalStorage)
}

const getChangePassword = () => {
  modal.style.display = 'contents'
  document.body.style.backgroundColor = 'LightGrey'
  modal.style.marginTop = '1em'
}

const getModalBtnClose = () => {
  modal.style.display = 'none'
  document.body.style.backgroundColor = 'white'
}

const changePasswordUser = () => {
  let currentUser
  let userLocalStorage

  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  userLocalStorage = JSON.parse(localStorage.getItem(currentUser.email))

  console.log(modalInputOldPassword.value)
  console.log(currentUser.password)
  if (modalInputOldPassword.value === userLocalStorage.password) {
    currentUser.password = modalInputNewPassword.value
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    //изменям пароль user в localstorage
    userLocalStorage.password = modalInputNewPassword.value
    localStorage.setItem(currentUser.email, JSON.stringify(userLocalStorage))
  }

  //и закрываем модальное окно
  modal.style.display = 'none'
  document.body.style.backgroundColor = 'white'
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentUserEmail()
  getDataUsers()
})
exitUserBtn.addEventListener('click', getExitUser)
changePasswordBtn.addEventListener('click', getChangePassword)
modalBtnClose.addEventListener('click', getModalBtnClose)
modalBtnSecondaryClose.addEventListener('click', getModalBtnClose)
modalBtnChangePassword.addEventListener('click', changePasswordUser)