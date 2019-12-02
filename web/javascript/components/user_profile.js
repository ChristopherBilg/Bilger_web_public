"use strict";

var user_profile = {};

user_profile.UI = function (id) {
    var contentDOM = document.getElementById(id);
    var content = `<div id='profile'></div>`;
    contentDOM.innerHTML = content;
    user_profile.runUI("profile");
};

user_profile.runUI = function (targetId) {
    var myUrl = "webAPIs/profileAPI.jsp";
    var targetDOM = document.getElementById(targetId);
    
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: targetId
    });


    function success(obj) {

        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            targetDOM.innerHTML += "user_logon.findById (success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log("user_logon.findById (success private fn): the obj passed in by ajax2 is on next line.");
        console.log(obj);

        if (obj.dbError.length > 0) {
            targetDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        } else if (obj.webUserList.length === 0 ) {
            targetDOM.innerHTML = "You are not currently logged in.";
        } else {
            var msg = "Found Web User with Id: " + obj.webUserList[0].webUserId;
            msg += "<br/> &nbsp; Birthday: " +  obj.webUserList[0].birthday;
            msg += "<br/> &nbsp; MembershipFee: " +  obj.webUserList[0].membershipFee;
            msg += "<br/> &nbsp; User Role Id: " +  obj.webUserList[0].userRoleId;
            msg += "<br/> <img src ='" +  obj.webUserList[0].image + "'>";
            targetDOM.innerHTML = msg;
        }

    } // end of function success
}