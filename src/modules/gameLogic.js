import { addListenerToInput, addWordSpaces, loadInitialPaint } from './paintLayout'
import { $ } from './utils'

const API = 'https://palabras-aleatorias-public-api.herokuapp.com/random'
export let lives = 11
export let palabra = []
export let usedLetters = []

export const getWord = async () => {
  const res = await fetch(API)
  const data = await res.json()
  const word = data.body.Word
  const spelledWord = [...word.toLowerCase()]
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
const resetGame = async () => {
  const $word = $('#word')
  lives = 11
  palabra = []
  usedLetters = []
  loadInitialPaint()
  addListenerToInput()
  $word.innerHTML = ''
  await getWord()
  addWordSpaces()
  $('.inputValidator').focus()
}

export const setMessage = (message, state, hint = true) => {
  const $message = $('.message')

  const customMessage = document.createElement('p')
  customMessage.innerText = message

  const button = document.createElement('button')
  button.id = 'reset'
  button.innerText = 'Reset'
  button.classList.add(state === 'win' ? 'win' : 'loose')
  button.onclick = resetGame

  $message.append(customMessage, button)
}

export const validateLetter = (input, spelledWord) => {
  const $word = [...$('#word').childNodes]
  const $lives = $('#lives')
  const $inputValidator = $('.inputValidator')
  const lowerInput = input.toLowerCase()
  if (spelledWord.includes(lowerInput)) {
    addActiveClass(lowerInput, spelledWord)

    if ($word.every(e => e.classList.contains('active'))) {
      setMessage('Felicidades, has ganado', 'win')
      $inputValidator.setAttribute('readonly', true)
      $('#form').onsubmit = e => e.preventDefault()
    }
    return
  }
  if (lives > 1) {
    lives -= 1
    $lives.innerText = lives
    return
  }
  if (lives === 1) {
    $lives.innerText = 0
    $inputValidator.setAttribute('readonly', true)
    setMessage('Has perdido, la palabra era: ' + spelledWord.join(''))
    $('#form').onsubmit = e => e.preventDefault()
  }
}
