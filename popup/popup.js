$(document).ready(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "VALIDATE_CSS" }, function (response) {
            if (response) {
                $(".btn-action").text("Disable");
            } else {
                $(".btn-action").text("Enable");
            }
        });
    });

    $(".btn-action").click(function () {
        var text = $(this).text();
        if (text === "Enable") {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "LOAD_CSS" }, function (response) {
                    $(".btn-action").text("Disable");
                });
            });
        } else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "UNLOAD_CSS" }, function (response) {
                    $(".btn-action").text("Enable");
                });
            });
        }
    });
});
