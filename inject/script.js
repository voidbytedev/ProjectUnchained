const SERVER_URL = "http://127.0.0.1:6767";

const FILTERS = {
    "a": "Α",
    "b": "Β",
    "c": "Ϲ",
    "d": "Ⅾ",
    "e": "ⴹ",
    "f": "𝙵",
    "g": "𝖦",
    "h": "ꓧ",
    "i": "ߊ",
    "j": "ᒍ",
    "k": "Κ",
    "l": "ᒪ",
    "m": "𝖬",
    "n": "ꓠ",
    "o": "೦",
    "p": "Р",
    "q": "𝚀",
    "r": "ꓣ",
    "s": "𝖲",
    "t": "Т",
    "u": "Ս",
    "v": "Ⅴ",
    "w": "ꓪ",
    "x": "Ⅹ",
    "y": "Υ",
    "z": "Ꮓ"
}

function filterInputValues() {
            const inputs = document.querySelectorAll('input[role="button"]');

            inputs.forEach(input => {
                if (input.value) {
                    let filteredValue = '';
                    for (const char of input.value.toLowerCase()) {
                        filteredValue += FILTERS[char] || char;
                    }
                    input.value = filteredValue;
                }

                if (input.placeholder) {
                    let filteredPlaceholder = '';
                    for (const char of input.placeholder.toLowerCase()) {
                        filteredPlaceholder += FILTERS[char] || char;
                    }
                    input.placeholder = filteredPlaceholder;
                }
            });
        }

function getPath(url) {
    const baseUrl = `${SERVER_URL}/p/`;

    if (url.startsWith(baseUrl)) {
        let path = url.slice(baseUrl.length);

        const questionMarkIndex = path.indexOf('?');
        if (questionMarkIndex !== -1) {
            path = path.slice(0, questionMarkIndex);
        }

        return path;
    }
    
    return null;
}

function rel2abs(link, originalURL) {
    const baseUrl = `${SERVER_URL}/p/`;

    if (link && typeof link === 'string') {
        try {
            const url = new URL(link);
            return url.toString(); 
        } catch {
            const newBaseURL = new URL(originalURL, baseUrl).toString();
            const absoluteUrl = new URL(link, newBaseURL).toString();

            const questionMarkIndex = absoluteUrl.indexOf('?');
            if (questionMarkIndex !== -1) {
                return absoluteUrl.slice(0, questionMarkIndex);
            }

            return absoluteUrl;
        }
    }

    return null;
}

function filterIFrame(e) {
    const doc = e.contentWindow.document;
                if (true) {
                    data = {
                        "html": document.documentElement.outerHTML
                    }

                    fetch(`${SERVER_URL}/h`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Success:', data);
                        doc.open();
                        doc.write(data);
                        doc.close();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
}

function filterIFrames() {
    const elements = document.querySelectorAll('input[role="button"]');
    console.log(elements);
    elements.forEach(e => {
        console.log(e);
                e.addEventListener("load", function(){
                    console.log(e);
                    filterIFrame(e);
                });
            });
}

function onload_glob() {
    filterInputValues();
    filterIFrames();
    /*
    if (document.location.contains("http")) {
        console.log("moving to blob");
        console.log("blobl");
        const content = document.documentElement.outerHTML;
        const blob = new Blob([content], {type: "text/html"});
        const blobUrl = URL.createObjectURL(blob);
        document.location = blobUrl;
    }
        */
}

document.addEventListener("DOMContentLoaded", onload_glob);
