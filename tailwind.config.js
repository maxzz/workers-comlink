const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: colors.slate,
            }
        },
    },
    plugins: [],
};
