import { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const storedTheme = localStorage.getItem('theme') === 'dark'
    const [darkMode, setDarkMode] = useState(storedTheme)

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light')
        const htmlElement = document.querySelector('html')
        htmlElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')
    }, [darkMode])

    const toggleDarkTheme = () => {
        setDarkMode((prevMode) => !prevMode)
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
