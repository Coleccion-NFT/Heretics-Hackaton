/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    mode: "all",
    theme: {
        extend: {
            colors: {
                "gray-100": "hsla(0, 0%, 0%, 0.02)",
                "gray-200": "hsla(0, 0%, 0%, 0.2)",
                "gray-300": "hsla(0, 0%, 0%, 0.1)",
                "amber-500": "#E2B950",
                "orange-100": "hsla(43, 72%, 60%, 0.4)",
                "green-100": "hsla(94, 72%, 60%, 1)",
                "red-100": "hsla(0, 72%, 60%, 1)",
            },
            fontFamily: {
                sans: ["var(--font-poppins)", ...fontFamily.sans],
            },
        },
    },
    plugins: [],
}
