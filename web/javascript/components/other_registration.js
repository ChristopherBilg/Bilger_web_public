"use strict";

var other_registration = {};

other_registration.UI = function (id) {
    var contentDOM = document.getElementById(id);
    var content = `
        <div id="insertArea">
            <table>
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
            <td><button onclick="other_registration.insertOther('recordError')">Register</button></td>
            <td id="recordError" class="error"></td>
            <td></td>
        </tr>
        </table>
        </div>
    `;
    contentDOM.innerHTML = content + content2;
};

other_registration.insertOther = function (id) {
    console.log("Running insertOther");
    
    var otherInputObj = {
        "otherId": "",
        "todoListId": document.getElementById("todoListId").value,
        "url": document.getElementById("url").value,
        "todoListDescription": document.getElementById("todoListDescription").value,
        "creationDate": document.getElementById("creationDate").value,
        "webUserId": document.getElementById("webUserId").value,
        "errorMsg": ""
    };
    console.log(otherInputObj);
    
    var myData = escape(JSON.stringify(otherInputObj));
    var url = "webAPIs/insertOtherAPI.jsp?jsonData=" + myData;
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

        document.getElementById("todoListIdError").innerHTML = jsonObj.todoListId;
        document.getElementById("urlError").innerHTML = jsonObj.url;
        document.getElementById("todoListDescriptionError").innerHTML = jsonObj.todoListDesc;
        document.getElementById("creationDateError").innerHTML = jsonObj.creationDate;
        document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;

        if (jsonObj.errorMsg.length === 0) { // success
            jsonObj.errorMsg = "You have successfully registered a new 'other' account!";
        }
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }
};