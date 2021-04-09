import './assets/styles.css'
import { createElement } from 'react'
import { render } from 'react-dom'
import { Home } from './Home'

const container = document.getElementById('react')
const home = createElement(Home)
render(home, container)
