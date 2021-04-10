import './assets/styles.css'
import { createElement } from 'react'
import { render } from 'react-dom'
import { Page } from './Page'

const container = document.getElementById('react')
const home = createElement(Page)
render(home, container)

// Track scroll position as custom CSS variable on document body
window.addEventListener(
    'scroll',
    () => {
        const scroll =
            window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        document.body.style.setProperty('--scroll', scroll.toString())
    },
    false
)
