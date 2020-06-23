export default function copyToClipboard(text) {
    const element = document.createElement('textarea')
    element.setAttribute('tab-index', '-1')
    element.setAttribute('readonly', 'true')
    element.setAttribute('aria-hidden', 'true')
    element.classList.add('clipboard-textarea')
    document.body.append(element)
    element.value = text
    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)
}