"use strict";

function slideshow(id) {
    var content = `
        <div id="users">
            <div id="users_email"></div>
            <div id="users_image"></div>
        </div>
        <div id="other">
            <div id="other_id"></div>
            <div id="other_image"></div>
        </div>
    `;
    document.getElementById(id).innerHTML = content;

    function successUsers(obj) {
        var temp1 = MakeSlideShowUsers({
            ssID: "users_image", // id in which to render slideshow,
            objList: obj.webUserList, // array of objects with image and caption
            picPropName: "image",
            userEmail: "userEmail",
            emailElement: "users_email"
        });
    }

    function successOther(obj2) {
        var temp2 = MakeSlideShowOther({
            ssID: "other_image",
            objList: obj2.webUserList,
            picPropName: "image",
            webUserId: "webUserId",
            webUserElement: "other_id"
        });
    }
    
    ajax2({url: "webAPIs/listUsersAPI.jsp", successFn: successUsers, errorId: "users_image"});
    ajax2({url: "webAPIs/listOtherAPI.jsp", successFn: successOther, errorId: "other_image"});
}