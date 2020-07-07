var EXTENSION_STYLESHEET_ID = "extension_stylesheet";

function loadCSS() {
    // var link = document.createElement("link");
    // link.href = chrome.extension.getURL("assets/css/content.css");
    // link.id = EXTENSION_STYLESHEET_ID;
    // link.type = "text/css";
    // link.rel = "stylesheet";
    // document.getElementsByTagName("head")[0].appendChild(link);
    var styles = `
    *,
    :before,
    :after {
        /*CSS transitions*/
        -o-transition-property: none !important;
        -moz-transition-property: none !important;
        -ms-transition-property: none !important;
        -webkit-transition-property: none !important;
        transition-property: none !important;
        /*CSS transforms*/
        -o-transform: none !important;
        -moz-transform: none !important;
        -ms-transform: none !important;
        -webkit-transform: none !important;
        transform: none !important;
        /*CSS animations*/
        -webkit-animation: none !important;
        -moz-animation: none !important;
        -o-animation: none !important;
        -ms-animation: none !important;
        animation: none !important;
        animation-play-state: paused !important;
    }
    `;

    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    styleSheet.id = EXTENSION_STYLESHEET_ID;
    document.head.appendChild(styleSheet);
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
