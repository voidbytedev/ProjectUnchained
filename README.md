# ProjectUnchained

## USAGE
**SERVER_URL**: The proxy location (local default is `http://localhost:6767`)

**WEBSITE_URL**: Full HTTP/HTTPS link of the webpage you would like to visit. You can put a tilde (~) in some spots if your environment blocks by the URL. (e.g. `http://example.com/` -> `http://ex~am~ple.com`)

### Most users:
To use the proxy to unblock all parts of a webpage, go to the URL `SERVER_URL/p/WEBSITE_URL/`

To use the proxy to simply visit a webpage with no changes, go to the URL `SERVER_URL/o/WEBSITE_URL/`

### Developers:
To unblock all parts of HTML, send a POST request to `SERVER_URL/h/` with the following JSON:
```
{
    "html": "YOUR_HTML_SOURCE_HERE"
}
```
This can be used for making sites that work in restricted environments without needing a proxy.

To replace the text in a string with unicode lookalikes, send a POST request to `SERVER_URL/t/` with the following JSON:
```
{
    "text": "TEXT HERE"
}
```

# Credits
**voidbytedev** - original project

# NOTE
**I do not hold any responsibility for if your boss or teachers see you on games instead of doing work because of this. Also I can't make readable code lol -voidbytedev**
