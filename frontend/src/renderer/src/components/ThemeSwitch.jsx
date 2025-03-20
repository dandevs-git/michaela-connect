import { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'

function ThemeSwitch() {
    const { darkMode, toggleDarkTheme } = useContext(ThemeContext)

    return (
        <div className="d-flex form-check form-switch align-items-center">
            <input
                className="form-check-input bg-light-subtle"
                type="checkbox"
                id="themeSwitch"
                onChange={toggleDarkTheme}
                checked={darkMode}
                style={{ cursor: 'pointer' }}
            />
            <label
                className="form-check-label fs-5 ps-2"
                htmlFor="themeSwitch"
                style={{ cursor: 'pointer' }}
            >
                {darkMode ? (
                    <i className="bi bi-moon-fill"></i>
                ) : (
                    <i className="text-warning bi bi-brightness-high-fill"></i>
                )}
            </label>
        </div>
    )
}

export default ThemeSwitch
