export function diffForHumans(date) {
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)

    if (diff < 5) return 'Just now'
    if (diff < 60) return `${diff} seconds ago`
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
    return `${Math.floor(diff / 86400)} days ago`
}
