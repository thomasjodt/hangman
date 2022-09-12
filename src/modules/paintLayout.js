import { lives, palabra, usedLetters, validateLetter } from './gameLogic'
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
        <form id='form'>
          <input class='inputValidator' maxlength='1' placeholder='Aa' />
        </form>
        <div id='word'></div>
        <div class='message'></div>
      </section>
    </div>
  `
  document.body.innerHTML = template
}

export const addListenerToInput = () => {
  const $form = $('#form')
  $form.onsubmit = (e) => {
    e.preventDefault()

    const input = e.target.children[0].value
    validateLetter(input, palabra)
    if (!usedLetters.includes(input)) {
      usedLetters.push(input)
    } else if (lives > 1 && palabra.includes(input)) {
      $('.message').innerHTML = '<p>Ya has usado esa letra, prueba con otra.</p>'
    }

    e.target.children[0].onchange = () => { $('.message').innerHTML = null }
    e.target.reset()
    e.target.children[0].focus()
  }
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
