import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import './font.css'
import './global.css'
import './home.css'
import './about.css'
import './contact.css'
import './portfolio.css'

// HANDLERS

const email = document.getElementById('email')
const email_input = document.getElementById('email-input')
const github = document.getElementById('github')

const copy_email = (_) => {
    // @ts-ignore
    email_input.select()
    document.execCommand('copy')
}

email.addEventListener('click', copy_email)

// GSAP SKEW ANIMATION

gsap.registerPlugin(ScrollTrigger)

let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter('.skew', 'skewY', 'deg'),
    clamp = gsap.utils.clamp(-5, 5)

ScrollTrigger.create({
    onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300)
        // Only do something if the skew is MORE severe.
        // Remember, we're always tweening back to 0, so if the user slows their scrolling quickly,
        // it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew
            gsap.to(proxy, {
                skew: 0,
                duration: 0.7,
                ease: 'expo',
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew)
            })
        }
    }
})

// Make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set('.skew', { transformOrigin: 'right center', force3D: true })
