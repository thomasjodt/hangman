import './main.css'
import { getWord } from './modules/gameLogic'
import { addKeyboardListener, addWordSpaces, loadInitialPaint } from './modules/paintLayout'

loadInitialPaint()
addKeyboardListener()
getWord()
addWordSpaces()
