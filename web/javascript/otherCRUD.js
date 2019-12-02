var otherCRUD = {}; // globally available object

otherCRUD.list = function (targetId) {

    var contentDOM = document.getElementById(targetId);

    // clear out whatever may be currently in the content area
    contentDOM.innerHTML = "";

    // ajax parameters: 
    //   url for ajax call (Web API)
    //   name of callback function to run if ajax call successful. 
    //   id where to place error message if ajax call not successful. 
    //   
    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after OK ajax call.
    ajax("webAPIs/listOtherAPI.jsp", success, targetId);

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
            <h2>Other List</h2>
            Search Filter:
        `;

        var searchBox = document.createElement("input");
        searchBox.setAttribute("type", "text");
        div.appendChild(searchBox);

        var tableDiv = document.createElement("div");
        contentDOM.appendChild(tableDiv);

        // tweak obj.webUserList to include only the properties you want - combine, delete, etc. 
        var otherList = [];
        for (var i = 0; i < obj.webUserList.length; i++) {
            otherList[i] = {}; // add new empty object to array
            otherList[i].userId = obj.webUserList[i].webUserId;
            otherList[i].userEmail = obj.webUserList[i].userEmail;
            otherList[i].membershipInfo = obj.webUserList[i].membershipFee + "<br />" + obj.webUserList[i].birthday;
            otherList[i].todoListInfo = obj.webUserList[i].todoListId + "<br /><br />" + obj.webUserList[i].todoListDesc;
            otherList[i].image = obj.webUserList[i].image;
            otherList[i].delete = "<button type=button onclick='otherCRUD.delete(" +
                    obj.webUserList[i].todoListId + ",this)' >Delete</button>";
        }

        tableBuilder.build({
            list: otherList,
            searchKeyElem: searchBox,
            style: "data",
            imgWidth: "50px",
            target: tableDiv,
            orderPropName: "webUserId",
            reverse: false
        });
    } // end of function success
};

otherCRUD.delete = function (userId, icon) {
    var dataRow = icon.parentNode.parentNode;
    var rowIndex = dataRow.rowIndex - 1; // adjust for column header row
    var dataTable = dataRow.parentNode;
    dataTable.deleteRow(rowIndex);
    
    var targetId = "NULL";
    
    ajax("webAPIs/deleteOtherAPI.jsp?deleteId=" + userId, success, targetId);
    
    function success() { /* do nothing but must exist */ }
};