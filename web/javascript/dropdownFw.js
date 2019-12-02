"use strict";

function dropdownFw(paramsIn) {
    var params = paramsIn || {};

    var dropHeaderStyle = params.dropHeaderStyle || "dropHeader";

    var dropContentStyle = params.dropContentStyle || "dropContent";

    var hiddenRight = params.hiddenRight || "-500px";

    var headerList = document.getElementsByClassName(dropHeaderStyle);
    for (var i = 0; i < headerList.length; i++) {
        headerList[i].onclick = function () {
            var parent = this.parentElement; // "this" means clicked DOM element.
            var dContent = parent.getElementsByClassName(dropContentStyle)[0];

            var dropContentList = document.getElementsByClassName(dropContentStyle);
            for (var i = 0; i < dropContentList.length; i++) {
                if (dropContentList[i] !== dContent) {
                    hide(dropContentList[i]);
                }
            }

            if (dContent.style.visibility === "visible") {
                hide(dContent);
            } else {
                show(dContent);
            }

        };
    }


    function hide(ele) {
        ele.style.right = hiddenRight;
        ele.style.visibility = "hidden";
    }

    function show(ele) {
        ele.style.visibility = "visible";
        ele.style.right = "0px";
    }

    function hideAllDropContents() {
        var dropContentList = document.getElementsByClassName(dropContentStyle);
        for (var i = 0; i < dropContentList.length; i++) {
            hide(dropContentList[i]);
        }
    }


    window.onclick = function (event) {
        if (!event.target.matches('.' + dropHeaderStyle)) {
            hideAllDropContents();
        }
    };

}