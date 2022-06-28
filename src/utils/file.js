export async function copyToClipboard(content) {
    const textToCopy = JSON.stringify(content)
    await navigator.clipboard.writeText(textToCopy)
}

export function saveToJsonFile(json) {
    //from https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file/48612128#48612128
    //FIXME review the code
    // maybe use : https://github.com/eligrey/FileSaver.js/

    const fileName = json.hasOwnProperty('name') ? json.name : 'uropa-json'
    const today = (new Date()).toISOString().substring(0, 10) // Or the date you'd like converted.
    const data = JSON.stringify(json)

    const blob = new Blob([data], {type: 'text/plain'})
    const e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
    a.download = `${fileName}-${today}.json`
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}
