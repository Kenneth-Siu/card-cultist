export default function cleanFileName(name) {
    return name.replace(/[\W]/g, '')
}