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
    // Define the base URL
    const baseUrl = `${SERVER_URL}/p/`;

    // Check if the URL starts with the base URL
    if (url.startsWith(baseUrl)) {
        // Extract the path following the base URL
        let path = url.slice(baseUrl.length);

        // Remove any query parameters
        const questionMarkIndex = path.indexOf('?');
        if (questionMarkIndex !== -1) {
            path = path.slice(0, questionMarkIndex);
        }

        return path; // Return the cleaned path
    }
    
    return null; // Return null if the URL doesn't match
}

function rel2abs(link, originalURL) {
    const baseUrl = `${SERVER_URL}/p/`;

    // Check if the link is a valid non-empty string
    if (link && typeof link === 'string') {
        try {
            // Check if the link is absolute
            const url = new URL(link);
            // If it's absolute, return it as is
            return url.toString(); 
        } catch {
            // If it's not a valid absolute URL, proceed to treat it as a relative path
            // Create the absolute URL
            const newBaseURL = new URL(originalURL, baseUrl).toString();
            const absoluteUrl = new URL(link, newBaseURL).toString();

            // Before returning, cut off any query parameters
            const questionMarkIndex = absoluteUrl.indexOf('?');
            if (questionMarkIndex !== -1) {
                return absoluteUrl.slice(0, questionMarkIndex); // Return the URL before the '?'
            }

            return absoluteUrl; // Return the full absolute URL if no query
        }
    }

    return null; // Return null for invalid inputs
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
                        return response.json(); // Parse tFUCK YOU FUCK YOU FUCK YOU KYS KYS KYS
                    })
                    .then(data => {
                        console.log('Success:', data); // Handle the response data
                        doc.open();
                        doc.write(data);
                        doc.close();
                    })
                    .catch(error => {
                        console.error('Error:', error); // Handle errors
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