$(document).ready(function () {
    $(".btn-action").click(function () {
        chrome.runtime.sendMessage({ type: "CLICKED_ACTION" }, function (response) {
            console.log(response);
        });
    });
});
