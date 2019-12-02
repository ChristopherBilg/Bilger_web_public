"use strict";

var user_registration = {};

user_registration.UI = function (id) {
    var contentDOM = document.getElementById(id);
    var content = `
        <div id="insertArea">
            <table>
                <tr>
                    <td>Email Address</td>
                    <td><input type="text"  id="userEmail" /></td>
                    <td id="userEmailError" class="error"></td> 
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password"  id="userPassword" /></td>
                    <td id="userPasswordError" class="error"></td>
                </tr>
                <tr>
                    <td>Retype Your Password</td>
                    <td><input type="password" id="userPassword2" /></td>
                    <td id="userPassword2Error" class="error"></td>
                </tr>
    `;
    var content2 = `
        <tr>
            <td>Birthday</td>
            <td><input type="text" id="birthday" /></td>
            <td id="birthdayError" class="error"></td> 
        </tr>
        <tr>
            <td>Membership Fee</td>
            <td><input type="text" id="membershipFee" /></td>
            <td id="membershipFeeError" class="error"></td>
        </tr>
        <tr>
            <td>User Role</td>
            <td>
                <select id='userRoleId' name=role>
                    <option value='3'>View Only</option>
                    <option value='2'>Member</option>
                    <option value='1'>Admin</option>
                </select>
            </td>
            <td id="userRoleIdError" class="error"></td>
        </tr>
        <tr>
            <td><button onclick="user_registration.insertUser('recordError')">Register</button></td>
            <td id="recordError" class="error"></td>
            <td></td>
        </tr>
        </table>
        </div>
    `;
    contentDOM.innerHTML = content + content2;
};

user_registration.insertUser = function (id) {
    console.log("Running insertUser");

    var userInputObj = {
        "webUserId": "",
        "userEmail": document.getElementById("userEmail").value,
        "userPassword": document.getElementById("userPassword").value,
        "userPassword2": document.getElementById("userPassword2").value,
        "birthday": document.getElementById("birthday").value,
        "membershipFee": document.getElementById("membershipFee").value,
        "userRoleId": document.getElementById("userRoleId").value,
        "userRoleType": "",
        "errorMsg": ""
    };
    console.log(userInputObj);

    var myData = escape(JSON.stringify(userInputObj));
    var url = "webAPIs/insertUserAPI.jsp?jsonData=" + myData;
    ajax2({
        url: url,
        successFn: success,
        errorId: id
    });

    function success(httpRequest) {
        // Running this function does not mean insert success. It just means that the Web API
        // call (to insert the record) was successful.
        console.log("insertReqGood was called here is httpRequest.");
        console.log(httpRequest);

        // the server prints out a JSON string of an object that holds field level error 
        // messages. The error message object (conveniently) has its fiels named exactly 
        // the same as the input data was named. 
        var jsonObj = httpRequest; // convert from JSON to JS Object.
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
        document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
        document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
        document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
        document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
        document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;

        if (jsonObj.errorMsg.length === 0) { // success
            jsonObj.errorMsg = "You have successfully registered a new web user account!";
        }
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }
};
