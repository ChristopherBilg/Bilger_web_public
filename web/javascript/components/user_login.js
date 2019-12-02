"use strict";

var user_login = {};

user_login.UI = function (id) {
    var contentDOM = document.getElementById(id);
    var content = `
        <div class='logon'>
            <br/>
            Enter Email <input type="text" id="findEmail"/>
            <br />
            Enter Password <input type="password" id="findPassword"/>
            &nbsp;
            <input type="button" value="Submit" onclick="user_login.findById('findEmail', 'findPassword','userProfile')"/>
            <br/> <br/>
            <div id="userProfile"></div> 
        </div>
    `;
    contentDOM.innerHTML = content;
};

user_login.findById = function (email, password, targetId) {
    // clear out any previous values in the targetId area
    var targetDOM = document.getElementById(targetId);
    targetDOM.innerHTML = "";
    
    // the JS escape function cleans input so it can be used as a URL paramenter
    var desiredEmail = escape(document.getElementById(email).value);
    console.log(desiredEmail);
    var desiredPassword = escape(document.getElementById(password).value);
    console.log(desiredPassword);
    
    var myUrl = "webAPIs/logonAPI.jsp?email=" + desiredEmail + "&password=" + desiredPassword;

    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
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
            targetDOM.innerHTML = "No Web User with email/password was found in the database.";
        } else {
            var msg = "Found Web User " + obj.webUserList[0].webUserId;
            msg += "<br/> &nbsp; Birthday: " +  obj.webUserList[0].birthday;
            msg += "<br/> &nbsp; MembershipFee: " +  obj.webUserList[0].membershipFee;
            msg += "<br/> &nbsp; User Role Id: " +  obj.webUserList[0].userRoleId;
            msg += "<br/> <img src ='" +  obj.webUserList[0].image + "'>";
            targetDOM.innerHTML = msg;
            
            //targetDOM.innerHTML = "You have been logged in.";
        }

    } // end of function success
};  // users.findUI