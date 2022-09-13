const letters = [
  [...'qwertyuiop'],
  [...'asdfghjklñ'],
  [...'zxcvbnm']
]

const addButtons = (letters) => {
  const button = letters.map(e => `<button class='key'>${e}</button>`).join('')
  return button
}

export const keyboard = () => `
  <div id='keyboard'>
    <div class='top layer'>${addButtons(letters[0])}</div>
    <div class='middle layer'>${addButtons(letters[1])}</div>
    <div class='bottom layer'>${addButtons(letters[2])}</div>
  </div>
`
