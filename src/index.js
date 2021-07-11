import './global.css'

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
