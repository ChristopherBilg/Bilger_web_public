

var userCRUD = {};

userCRUD.list = function (targetId) {

    var contentDOM = document.getElementById(targetId);

    contentDOM.innerHTML = "";

    ajax("webAPIs/listUsersAPI.jsp", success, targetId);

    function success(hreq) {

        console.log(hreq);
        var obj = JSON.parse(hreq.responseText);
        if (!obj) {
            contentDOM.innerHTML += "Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log(obj);

        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var div = document.createElement("div");
        div.style.textAlign = "center";
        contentDOM.appendChild(div);
        div.innerHTML = `
            <h2>Web User List</h2>
            Search Filter:
        `;

        var searchBox = document.createElement("input");
        searchBox.setAttribute("type", "text");
        div.appendChild(searchBox);

        var tableDiv = document.createElement("div");
        contentDOM.appendChild(tableDiv);

        var userList = [];
        for (var i = 0; i < obj.webUserList.length; i++) {
            userList[i] = {}; // add new empty object to array
            userList[i].userCredentials = obj.webUserList[i].userEmail + "<br/> PW (to test Logon): " +
                    obj.webUserList[i].userPassword;
            userList[i].image = obj.webUserList[i].image;
            userList[i].birthday = obj.webUserList[i].birthday;
            userList[i].membershipFee = obj.webUserList[i].membershipFee;
            userList[i].role = obj.webUserList[i].userRoleId + "&nbsp;" +
                    obj.webUserList[i].userRoleType;
            userList[i].userId = obj.webUserList[i].webUserId;
            userList[i].delete = "<button type=button onclick='userCRUD.delete(" +
                    userList[i].userId + ",this)' >Delete</button>";
        }

        tableBuilder.build({
            list: userList,
            searchKeyElem: searchBox,
            style: "data",
            imgWidth: "50px",
            target: tableDiv,
            orderPropName: "userEmail",
            reverse: false
        });
    } // end of function success
};

userCRUD.delete = function (userId, icon) {
    var dataRow = icon.parentNode.parentNode;
    var rowIndex = dataRow.rowIndex - 1;
    var dataTable = dataRow.parentNode;
    dataTable.deleteRow(rowIndex);
    
    var targetId = "NULL";
    
    ajax("webAPIs/deleteUserAPI.jsp?deleteId=" + userId, success, targetId);
    
    function success() { }
};