export const COLORS = [
    '#00C853', // Green
    '#00B8D4', // Blue
    '#FFAB00', // Yellow
    '#D50000', // Red
    '#000000' // Primary
]

export const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? COLORS[4] : '#ced4da',
        boxShadow: state.isFocused ? `0 0 0 0.3rem ${COLORS[4]}40` : null,
        '&:hover': {
            borderColor: 'none'
        },
        borderRadius: '0.35rem'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? COLORS[4] : state.isFocused ? `${COLORS[4]}10` : null,
        color: state.isSelected ? '#fff' : COLORS[4]
    }),
    singleValue: (provided) => ({
        ...provided,
        color: COLORS[4]
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#6c757d'
    })
}
