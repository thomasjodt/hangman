import { lives, palabra, validateLetter } from './gameLogic'
import { keyboard } from './keyboard'
import { $ } from './utils'

export const loadInitialPaint = () => {
  const template = `
    <div id='game-container'>
      <section id='top-section'>
        <h1>Juego del ahorcado</h1>
        <div class='lives'>
          <span id='lives'>${lives}</span>
        </div>
        <div class='hangman-pic'></div>
      </section>
      <section id='bottom-section'>
        <div id='word'></div>
        ${keyboard()}
      </section>
      </div>
      <a
        href='https://github.com/thomasjodt/hangman'
        class='hint'
        target='_blank'
      >
        View the source code here
      </a>
  `
  document.body.innerHTML = template
}

const addWordField = (letter, index) => {
  const container = document.createElement('div')
  container.classList.add('wordSpace')
  container.id = index
  container.innerText = letter

  if (container.innerText === ' ') container.classList.add('active')
  return container
}

export const addWordSpaces = () => {
  palabra.forEach((e, index) => {
    $('#word').append(addWordField(e, index))
  })
}

export const addKeyboardListener = () => {
  $('#keyboard').onclick = (e) => {
    if (e.target.innerHTML.length !== 1) return
    console.log('clic')
    e.target.setAttribute('disabled', true)
    const input = e.target.innerHTML
    validateLetter(input, palabra)
  }
}
