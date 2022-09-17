import { data } from './data'
import { addKeyboardListener, addWordSpaces, loadInitialPaint } from './paintLayout'
import { $, generateRandomNumber, removeAccents } from './utils'

export let lives = 11
export let palabra = []

export const getWord = () => {
  const word = data[generateRandomNumber(0, data.length)]
  const spelledWord = [...removeAccents(word.toLowerCase())]
  palabra.push(...spelledWord)
}

const addActiveClass = (input, spelledWord) => {
  spelledWord.forEach((letter, index) => {
    if (letter === input) {
      const $wordSpace = document.getElementById(`${index}`)
      $wordSpace.classList.add('active')
    }
  })
}

const resetGame = () => {
  $('#word').innerHTML = null
  lives = 11
  palabra = []
  loadInitialPaint()
  addKeyboardListener()
  getWord()
  addWordSpaces()
}

export const setMessage = (message, state) => {
  const customMessage = document.createElement('p')
  customMessage.innerText = message

  const button = document.createElement('button')
  button.id = 'reset'
  button.innerText = 'Reset'
  button.classList.add(state === 'win' ? 'win' : 'loose')
  button.onclick = resetGame

  $('#keyboard').innerHTML = ''
  $('#keyboard').classList.add('message')
  $('#keyboard').append(customMessage, button)
}

export const validateLetter = (input, spelledWord) => {
  const $word = [...$('#word').childNodes]
  const $lives = $('#lives')
  const lowerInput = input.toLowerCase()
  if (spelledWord.includes(lowerInput)) {
    addActiveClass(lowerInput, spelledWord)

    if ($word.every(e => e.classList.contains('active'))) {
      setMessage('Felicidades, has ganado.', 'win')
    }
    return
  }
  if (lives > 1) {
    lives -= 1
    $lives.innerText = lives
    if (lives === 10) {
      const img = document.createElement('img')
      img.src = './assets/Step10.svg'
      img.alt = 'hangman status'
      img.id = 'hangman-status'
      $('.hangman-pic').append(img)
      return
    }
    $('#hangman-status').src = `./assets/Step${lives}.svg`
    return
  }
  if (lives === 1) {
    $lives.innerText = 0
    setMessage('Has perdido, la palabra era: ' + spelledWord.join(''))
  }
}
