export const formatUrl = (url) => {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
}

export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text
    }
    return text.slice(0, maxLength) + '...'
}