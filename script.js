'use strict'

let authBtn = document.querySelector('#auth')
let registrBtn = document.querySelector('#registration')
const inputEmail = document.querySelector('#inputEmail')
const inputPassword = document.querySelector('#inputPassword')

//массив пользователей для записи и чтения при регистрации/входе]
let users = []
//пользователь, записываемый в  localStorage при удачном входе
let currentUser
let registrationDate

const getNowDate = function () {
    let nowDate;
    let hours, minutes, seconds, date, month, month2, year, day;
    let endingOfSeconds, endingOfMinutes, endingOfHours;

    nowDate = new Date();

    year = nowDate.getFullYear().toString().padStart(2, '0');
    month = nowDate.getMonth();
    date = nowDate.getDate().toString().padStart(2, '0');
    day = nowDate.getDay();

    const getMonthName = function (monthName) {
        switch (true) {
            case monthName === 0:
                month = '01';
                month2 = 'января';
                break;
            case monthName === 1:
                month = '02';
                month2 = 'февраля';
                break;
            case monthName === 2:
                month = '03';
                month2 = 'марта';
                break;
            case monthName === 3:
                month = '04';
                month2 = 'апреля';
                break;
            case monthName === 4:
                month = '05';
                month2 = 'мая';
                break;
            case monthName === 5:
                month = '06';
                month2 = 'июня';
                break;
            case monthName === 6:
                month = '07';
                month2 = 'июля';
                break;
            case monthName === 7:
                month = '08';
                month2 = 'августа';
                break;
            case monthName === 8:
                month = '09';
                month2 = 'сентября';
                break;
            case monthName === 9:
                month = '10';
                month2 = 'октября';
                break;
            case monthName === 10:
                month = '11';
                month2 = 'ноября';
                break;
            case monthName === 11:
                month = '12';
                month2 = 'декабря';
                break;
        }
    }

    const getDayName = function (dayName) {
        switch (true) {
            case dayName === 0:
                day = 'Воскрессенье';
                break;
            case dayName === 1:
                day = 'Понедельник';
                break;
            case dayName === 2:
                day = 'Вторник';
                break;
            case dayName === 3:
                day = 'Среда';
                break;
            case dayName === 4:
                day = 'Четверг';
                break;
            case dayName === 5:
                day = 'Пятница';
                break;
            case dayName === 6:
                day = 'Суббота';
                break;

        }
    }

    getMonthName(month);
    getDayName(day);
    registrationDate = `${date}.${month}.${year}`
}

//функция регистрации пользователя
const getRegistration = () => {
    console.log(inputEmail.value)
    console.log(inputPassword.value)
    //вызов функции для определения времени регистрации
    getNowDate()

    const user = {
        email: inputEmail.value,
        password: inputPassword.value,
        regDate: registrationDate
    }

    if (inputEmail.value.trim() !== '') {
        users.push(user)
        localStorage.setItem(user.email, JSON.stringify(user))
    } else {
        alert('Необходимо ввестси имя пользователя')
    }

    inputEmail.value = ''
    inputPassword.value = ''
}
//функция идентификации пользователя
const getAuth = () => {
    let i, count = 0
    let usersFromLocalStorage = []

    for (let [key, value] of Object.entries(localStorage)) {
        usersFromLocalStorage.push(JSON.parse(value))
        usersFromLocalStorage[i] = JSON.parse(value)
        // console.log(usersFromLocalStorage[i])
        //проверка пользователя в localStorage
        if (inputEmail.value === usersFromLocalStorage[i].email && inputPassword.value === usersFromLocalStorage[i].password) {
            //запись даннх вошедшего пользователя
            currentUser = {
                email: usersFromLocalStorage[i].email,
                password: usersFromLocalStorage[i].password,
                regDate: usersFromLocalStorage[i].regDate

            }
            //запись вошёдшего пользователя в LocalStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            //перенос на вторую страницу
            window.location.href = './userPanel.html'
        } else if (inputEmail.value === usersFromLocalStorage[i].email && inputPassword.value !== usersFromLocalStorage[i].password) {
            alert('Неправильно введён пароль!')
        } else if (inputEmail.value !== usersFromLocalStorage[i].email) {
            count++
        }
        i++
    }
    //вывод на экран в случае, если email не был обнаружен в localStorage
    if (count === usersFromLocalStorage.length) {
        alert('Неверно введён email или такой email не существует в базе данных!')
    }
    // console.log(usersFromLocalStorage)
    usersFromLocalStorage = []
}
// функция для автоматического перехода в личный кабинет, если пользователь уже залогинился
const getAuthAuto = () => {
    let currentUser
    currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
        window.location.href = './userPanel.html'
    }
}

authBtn.addEventListener('click', getAuth)
registrBtn.addEventListener('click', getRegistration)

getAuthAuto()