export function formatDateAndTimeVerbose(isoString) {
    if (!isoString) return ''

    const date = new Date(isoString)
    if (isNaN(date)) return ''

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true }

    const formattedDate = date.toLocaleDateString(undefined, dateOptions)
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions)

    return `${formattedDate} at ${formattedTime}`
}
