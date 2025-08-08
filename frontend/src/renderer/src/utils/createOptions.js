export const createOptions = (list, key) =>
    [...new Set(list.map((item) => item[key]).filter(Boolean))].map((value) => ({
        value,
        label: value
    }))
