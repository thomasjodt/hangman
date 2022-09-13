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
  palabra.forEach((e, index) => {
    $('#word').append(addWordField(e, index))
  })
}

export const addKeyboardListener = () => {
  const $keyboard = $('#keyboard')
  $keyboard.onclick = (e) => {
    if (e.target.innerHTML.length !== 1) return

    e.target.setAttribute('disabled', true)
    const input = e.target.innerHTML
    validateLetter(input, palabra)
  }
}
