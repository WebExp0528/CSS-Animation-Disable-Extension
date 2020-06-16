var EXTENSION_STYLESHEET_ID = "extension_stylesheet";

function loadCSS() {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("assets/css/content.css");
    link.id = EXTENSION_STYLESHEET_ID;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function unloadCSS() {
    var cssNode = document.getElementById(EXTENSION_STYLESHEET_ID);
    cssNode && cssNode.parentNode.removeChild(cssNode);
}

function validateCSS() {
    var cssNode = document.getElementById(EXTENSION_STYLESHEET_ID);
    console.log("~~~~~~~~~~~~~~~~~~ cssnode", cssNode);
    return cssNode ? true : false;
}

function onRequest(message, sender, reply) {
    switch (message.type) {
        case "VALIDATE_CSS": {
            reply(validateCSS());
            break;
        }
        case "LOAD_CSS": {
            loadCSS();
            reply(true);
            break;
        }
        case "UNLOAD_CSS": {
            unloadCSS();
            reply(true);
            break;
        }
    }
    return true;
}

loadCSS();
chrome.runtime.onMessage.addListener(onRequest);
