const { colors } = require('./src/colors')

// tailwind.config.js
module.exports = {
    purge: [ './src/**/*.html', './src/**/*.vue', './src/**/*.jsx', './src/**/*.tsx' ],
    theme: { colors },
    variants: {},
    plugins: []
}
