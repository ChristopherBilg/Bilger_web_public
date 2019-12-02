"use strict";

var other_update = {};

other_update.UI = function (id) {
    var contentDOM = document.getElementById(id);
    var content0 = `
        <div id="insertArea">
            <table>
                <tr>
                    <td>Other ID</td>
                    <td><input type="text"  id="otherId" /></td>
                    <td id="otherIdError" class="error"></td> 
                </tr>
    `;
    var content1 = `
                <tr>
                    <td>Todo List ID</td>
                    <td><input type="text"  id="todoListId" /></td>
                    <td id="todoListIdError" class="error"></td> 
                </tr>
                <tr>
                    <td>URL</td>
                    <td><input type="text"  id="url" /></td>
                    <td id="urlError" class="error"></td>
                </tr>
                <tr>
                    <td>Todo List Description</td>
                    <td><input type="text" id="todoListDescription" /></td>
                    <td id="todoListDescriptionError" class="error"></td>
                </tr>
    `;
    var content2 = `
        <tr>
            <td>Creation Date</td>
            <td><input type="text" id="creationDate" /></td>
            <td id="creationDateError" class="error"></td> 
        </tr>
        <tr>
            <td>Web User ID</td>
            <td><input type="text" id="webUserId" /></td>
            <td id="webUserIdError" class="error"></td>
        </tr>
        <tr>
            <td><button onclick="other_update.updateOther('recordError')">Update</button></td>
            <td id="recordError" class="error"></td>
            <td></td>
        </tr>
        </table>
        </div>
    `;
    contentDOM.innerHTML = content0 + content1 + content2;
};

other_update.updateOther = function (id) {
    console.log("Running updateOther");

    var userInputObj = {
        "otherId": document.getElementById("otherId").value,
        "todoListId": document.getElementById("todoListId").value,
        "url": document.getElementById("url").value,
        "todoListDescription": document.getElementById("todoListDescription").value,
        "creationDate": document.getElementById("creationDate").value,
        "webUserId": document.getElementById("webUserId").value,
        "errorMsg": ""
    };
    console.log(userInputObj);

    var myData = escape(JSON.stringify(userInputObj));
    var url = "webAPIs/updateOtherAPI.jsp?jsonData=" + myData;
    ajax2({
        url: url,
        successFn: success,
        errorId: id
    });

    function success(httpRequest) {
        console.log("insertReqGood was called here is httpRequest.");
        console.log(httpRequest);

        var jsonObj = httpRequest; // convert from JSON to JS Object.
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("otherIdError").innerHTML = jsonObj.otherId;
        document.getElementById("todoListIdError").innerHTML = jsonObj.todoListId;
        document.getElementById("urlError").innerHTML = jsonObj.url;
        document.getElementById("todoListDescriptionError").innerHTML = jsonObj.todoListDesc;
        document.getElementById("creationDateError").innerHTML = jsonObj.creationDate;
        document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;

        if (jsonObj.errorMsg.length === 0) { // success
            jsonObj.errorMsg = "You have successfully update the other account!";
        }
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }
};