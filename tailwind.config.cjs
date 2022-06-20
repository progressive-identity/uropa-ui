const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './public/index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'primary': colors.indigo,
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
    ]
}
