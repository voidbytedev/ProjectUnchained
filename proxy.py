from flask import Flask, Response, request, redirect
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re
import random
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

app = Flask(__name__)

headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:145.0) Gecko/20100101 Firefox/145.0"
}

with open("link.txt", "r") as f:
    SERVER_URL = f.read().strip()

FILTERS = {
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

def filter_text(text):
    def replace_char(match):
        char = match.group().lower()
        return FILTERS.get(char, char) + "​"
    return re.sub(r'[a-zA-Z]', replace_char, text, flags=re.IGNORECASE)

def get_driver():
    return webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

def filter_soup(soup, url):
    logginginfo = ""

    try:
        with open("inject/style.css", "r") as f:
            css = f.read()
        with open("inject/script.js", "r") as f:
            js = f.read()
    except Exception as e:
        print(f"Error reading CSS/JS files: {e}")
        css = ""
        js = ""

    for element in soup.find_all():
        logginginfo += element.name + "\n"
        try:
            if element.name == "div" and (element.find_all() or not element.get_text(strip=True)):
                continue

            if element.string and element.string.strip() and not element.name in ["html", "body", "style", "script", "title", "head"]:
                original_text = element.get_text(strip=True)
                if original_text:
                    new_content = filter_text(original_text[::-1])
                    element.clear()
                    for char in new_content:
                        span = soup.new_tag('span', attrs={'class': 'nbvb55124429char'})
                        span.string = char if char != " " else "​ ​"
                        element.append(span)
                    element["class"] = element.get("class", []) + ["nbvb55124429"]

            if element.name == "input" and element.get("value"):
                original_value = element.get("value")
                element["value"] = filter_text(original_value)
            
            if element.name == "input" and element.get("placeholder"):
                original_value = element.get("placeholder")
                element["placeholder"] = filter_text(original_value)

        except Exception as e:
            print(f"Error processing element {element.name}: {e}")

    for e in soup.find_all("img"):
        e["alt"] = "Free Math Learning for All!"

    for e in soup.find_all("meta"):
        e["content"] = "Free Math Learning for All!"

    title_tag = soup.find("title")
    if title_tag:
        title_tag.string = "Free Math Learning for All!"

    for tag in soup.find_all('a', href=True):
        original_href = tag['href']
        new_url = urljoin(url, original_href)
        final_url = ''.join([i + ('~' * random.randint(1, 5) if random.random() >= 0.25 else '') for i in new_url])
        tag['href'] = f"{SERVER_URL}/p/{final_url}"

    for tag in soup.find_all(['link', 'script'], src=True):
        original_src = tag['src']
        new_url = urljoin(url, original_src)
        response = requests.get(new_url)
        
        if tag.name == "link" and tag.get("rel", "") == "stylesheet":
            style_tag = soup.new_tag('style')
            style_tag.string = response.content.strip()
            tag.replace_with(style_tag)
        
        if tag.name == "script":
            script_tag = soup.new_tag('script')
            script_tag.string = response.content.strip()
            tag.replace_with(script_tag)

    for element in soup.find_all("iframe"):
        try:
            if "http" in element["src"]:
                original_src = element["src"]
                final_url = ''.join([i + ('~' * random.randint(1, 5) if random.random() >= 0.25 else '') for i in original_src])
                element["src"] = f"{SERVER_URL}/p/{final_url}"
            else:
                data = {"html": element.get_text(strip=True)}
                responseHTML = requests.post(f"{SERVER_URL}/h/", json=data)
                element.clear()
                element.append(BeautifulSoup(responseHTML.text, 'html.parser'))
        except Exception as e:
            print(f"Error with iframe processing: {e}")

    return str(soup) + f"<style>{css}</style><script>{js}</script>"

@app.route("/p/<path:url>", methods=["GET"])
def proxy(url):
    url = url.replace("~", "")
    params = request.args.to_dict()

    params_string = '&'.join(f"{k}={v}" for k, v in params.items()).replace("~", "")

    driver = get_driver()
    try:
        driver.get(url + "?" + params_string)
        # response = requests.get(url, headers=headers, params=request.args.to_dict())
        soup = BeautifulSoup(driver.page_source, 'html.parser')
    finally:
        # pass
        driver.quit()

    return filter_soup(soup, url)

@app.route("/h/", methods=["POST"])
def html():     
    html_content = request.json.get("html")
    soup = BeautifulSoup(html_content, 'html.parser')
    return filter_soup(soup, "")

@app.route("/o/<path:url>", methods=["GET"])
def original(url):
    url = url.replace("~", "")
    params = request.args.to_dict()

    params_string = '&'.join(f"{k}={v}" for k, v in params.items()).replace("~", "")

    driver = get_driver()
    try:
        driver.get(url + "?" + params_string)
        # response = requests.get(url, headers=headers, params=request.args.to_dict())
        final = driver.page_source
    finally:
        # pass
        driver.quit()
    
    return final

@app.route("/t/", methods=["POST"])
def text():     
    return filter_text(request.json.get("text"))

if __name__ == '__main__':
    app.run(debug=True, port=6767)