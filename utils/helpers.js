export const formatUrl = (url) => {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/+$/g, '')
}

export const formatFacebookUrl = (url) => {
    if (!url) return ""
    // Remove http://, https://, www., facebook.com, p/, and trailing slashes
    return url
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "")
        .replace(/^facebook\.com\//i, "")
        .replace(/^p\//i, "")
        .replace(/\/+$/g, "")
}

export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text
    }
    return text.slice(0, maxLength) + '...'
}