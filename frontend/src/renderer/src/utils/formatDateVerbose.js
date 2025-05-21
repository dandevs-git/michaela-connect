export function formatDateVerbose(isoString) {
    if (!isoString) return ''

    const date = new Date(isoString)

    if (isNaN(date)) return ''

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
}
