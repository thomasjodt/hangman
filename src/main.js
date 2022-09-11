import './main.css'
import { $ } from './modules/utils'
import { getWord } from './modules/gameLogic'
import { addListenerToInput, addWordSpaces, loadInitialPaint } from './modules/paintLayout'

loadInitialPaint()
addListenerToInput()
await getWord()
addWordSpaces()
$('.inputValidator').focus()
