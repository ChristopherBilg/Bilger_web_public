"user strict";

function MakeSlideShowOther(params) {
    var slideShow = document.getElementById(params.ssID);
    var objList = params.objList;
    var picPropName = params.picPropName;
    var webUserId = params.webUserId;
    var webUserElement = params.webUserElement;

    var div = document.createElement("div");
    slideShow.appendChild(div);

    var backButton = document.createElement("button");
    backButton.innerHTML = " &lt; ";
    slideShow.appendChild(backButton);
    var fwdButton = document.createElement("button");
    fwdButton.innerHTML = " &gt; ";
    slideShow.appendChild(fwdButton);
    
    var myImage = document.createElement("img");
    div.append(myImage);

    var picNum = 0;
    updatePic();

    function nextPic() {
        picNum++;
        if (picNum >= objList.length) {
            picNum = 0;
        }			
        updatePic();
    }

    function prevPic() {
        picNum--;
        if (picNum < 0) {
            picNum = objList.length - 1;
        }				
        updatePic();
    }

    backButton.onclick = prevPic;
    fwdButton.onclick = nextPic;

    slideShow.setPicNum = function (newNum) {
        if ((newNum >= 0) && (newNum < objList.length)) {
            picNum = newNum;			
            updatePic();
        }
    };

    function updatePic() {
        var obj = objList[picNum];
        myImage.src = obj[picPropName];
        document.getElementById(webUserElement).innerHTML = "<span style='font-weight: bold;'>Web User Id: </span>" + obj[webUserId];
    }

    return slideShow;
}