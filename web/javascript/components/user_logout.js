"use strict";

var user_logout = {};

user_logout.UI = function (id) {
    var content = `
        <div class="logout">
        <input type="button" value="Logout" onclick="user_logout.sign_out('logoutMessage')" />
        <br/> <br/>
        <div id="logoutMessage"></div>
        </div>
    `;
    document.getElementById(id).innerHTML = content;
};

user_logout.sign_out = function (targetId) {
    var myUrl = "webAPIs/logoutAPI.jsp";
    var targetDOM = document.getElementById(targetId);

    ajax2({
        url: myUrl,
        successFn: success,
        errorId: targetId
    });


    function success(obj) {
        targetDOM.innerHTML = "You have been successfully logged out.";
    }
};