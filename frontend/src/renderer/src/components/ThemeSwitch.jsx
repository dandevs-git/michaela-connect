import { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'

function ThemeSwitch() {
    const { darkMode, toggleDarkTheme } = useContext(ThemeContext)

    return (
        <div className="form-check form-switch d-flex align-items-center">
            <input
                className="form-check-input"
                type="checkbox"
                id="themeSwitch"
                onChange={toggleDarkTheme}
                checked={darkMode}
            />
            <label className="form-check-label fs-5 ps-2" htmlFor="themeSwitch">
                {darkMode ? (
                    <i className="bi bi-moon-fill"></i>
                ) : (
                    <i className="bi bi-brightness-high-fill"></i>
                )}
            </label>
        </div>
    )
}

export default ThemeSwitch
