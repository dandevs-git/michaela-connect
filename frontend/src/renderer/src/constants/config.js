export const COLORS = [
    '#00C853', // Green
    '#00B8D4', // Blue
    '#FFAB00', // Yellow
    '#D50000', // Red
    '#000000' // Primary
]

const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const selectStyles = (isValid) => ({
    control: (provided, state) => ({
        ...provided,
        borderColor: !isValid
            ? COLORS[3] // Red (danger)
            : state.isFocused
              ? COLORS[4] // Primary on focus
              : '#ced4da',
        boxShadow: state.isFocused
            ? !isValid
                ? hexToRgba(COLORS[3], 0.25) // Red shadow
                : `0 0 0 0.25rem ${hexToRgba(COLORS[4], 0.25)}` // Primary shadow
            : null,
        '&:hover': {
            // borderColor: !isValid ? COLORS[3] : COLORS[4]
        },
        borderRadius: '0.375rem',
        minHeight: '38px'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? COLORS[4]
            : state.isFocused
              ? hexToRgba(COLORS[4], 0.1)
              : null,
        color: state.isSelected ? '#fff' : '#212529'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#212529'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#6c757d'
    })
})
