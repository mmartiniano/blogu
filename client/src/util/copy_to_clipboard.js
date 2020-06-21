export default function copyToClipboard(text) {
    const element = document.createElement('textarea')
    element.value = text
    element.select()
    element.setSelectionRange(0, 99999)
    document.execCommand('copy')
}