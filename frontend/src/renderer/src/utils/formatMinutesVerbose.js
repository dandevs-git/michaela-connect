export function formatMinutesVerbose(minutes) {
    if (minutes === null || minutes === undefined || minutes === 0) return '0 min'

    minutes = Math.abs(minutes)

    let seconds = 0
    if (minutes < 1) {
        seconds = Math.round(minutes * 60)
    }

    const totalMinutes = minutes >= 1 ? Math.round(minutes) : 0
    const hours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60

    const parts = []

    if (hours > 0) {
        parts.push(`${hours} hr${hours !== 1 ? 's' : ''}`)
    }
    if (remainingMinutes > 0 || (hours === 0 && seconds === 0)) {
        parts.push(`${remainingMinutes} min${remainingMinutes !== 1 ? 's' : ''}`)
    }
    if (seconds > 0) {
        parts.push(`${seconds} sec${seconds !== 1 ? 's' : ''}`)
    }

    return parts.join(' ')
}
