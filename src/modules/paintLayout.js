import { lives, palabra, validateLetter } from './gameLogic'
import { keyboard } from './keyboard'
import { $ } from './utils'

export const loadInitialPaint = () => {
  const template = `
    <div id='game-container'>
      <section id='top-section'>
        <h1>Juego del ahorcado</h1>
        <div class='lives'>
          <span>Vidas restantes: </span>
          <span id='lives'>${lives}</span>
        </div>
      </section>
      <section id='bottom-section'>
        <div id='word'></div>
        ${keyboard()}
        <div class='message'></div>
      </section>
    </div>
  `
  document.body.innerHTML = template
}

const addWordField = (letter, index) => {
  const container = document.createElement('div')
  container.classList.add('wordSpace')
  container.id = index
  container.innerText = letter
  return container
}

export const addWordSpaces = () => {
  const $word = $('#word')
  palabra.forEach((e, index) => {
    $word.append(addWordField(e, index))
  })
}

export const addKeyboardListener = () => {
  const $keyboard = $('#keyboard')
  $keyboard.onclick = (e) => {
    $('.message').innerHTML = ''
    e.target.setAttribute('disabled', true)
    if (e.target.innerHTML.length !== 1) return
    const input = e.target.innerHTML
    validateLetter(input, palabra)
  }
}
