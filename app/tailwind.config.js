/** @type {import('tailwindcss').Config} */
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
                "amber-500": "#E2B950",
            },
        },
    },
    plugins: [],
}
