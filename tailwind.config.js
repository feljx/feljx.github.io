// tailwind.config.js
module.exports = {
    purge: [ './src/**/*.html', './src/**/*.vue', './src/**/*.jsx', './src/**/*.tsx' ],
    theme: { colors: Colors() },
    variants: {},
    plugins: []
}

function Colors () {
    const a = '#FF6A92'
    const b = '#553772'
    const c = '#8f3b76'
    const d = '#c7417b'
    const e = '#f5487f'

    const M = '#eaeef0'

    const X = '#4d7f80'
    const Y = '#2f444b'
    const Z = '#22282a'

    const v = '#eb6115'
    const w = '#f79e0c'
    return {
        transparent: 'transparent',
        current: 'currentColor',
        red: {
            light: '#ed2158',
            DEFAULT: '#e53463',
            dark: '#db3d67'
        },
        green: {
            light: '#118c8d',
            DEFAULT: '#2c5766',
            dark: '#163842'
        },
        yellow: {
            lightest: '#ffbe57',
            light: '#fea10b',
            DEFAULT: '#f8983f',
            dark: '#e26940'
        },
        gray: {
            lightest: '#868da2',
            lighter: '#6e758c',
            light: '#586079',
            DEFAULT: '#36384a',
            dark: '#242433',
            darker: '#1b1b26',
            darkest: '#11111a'
        },
        stone: {
            light: '#eef3f6',
            DEFAULT: '#acb9c3',
            dark: '#a5b2c0'
        }
    }
}
