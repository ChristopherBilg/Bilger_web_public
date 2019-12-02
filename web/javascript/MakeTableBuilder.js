function MakeTableBuilder (sortIcon) {

    var tableBuilder = {};  // globally available object, provides sort, convert, compare,and buildTable functionality

// ********************** function tableBuilder.build ***********************************
// Builds an HTML table from an array of objects (using object property names as column heading names). 
// This version has "click sortable" columns.
// 
// params.list: an array of objects that are to be built into an HTML table.
// params.target: reference to DOM object where HTML table is to be placed (by buildTable) -- 
//         (this is not the id string but actual reference like you get from method getElementById()
// params.orderPropName (string): name of property (of objects in list) by which to sort
// params.reverse (boolean): if true sort high to low, else sort low to high.
// params.style: classname that will be added to (DOM object) target (so that the HTML coder can define CSS styles by that name.
// params.imgWidth: how wide you want images to be within the HTML table.

    tableBuilder.build = function (params) {

        // The "main program" for this build function is after the private methods (like prettyColumnHeading, 
        // align, and a couple more...)

        // prettyColumnHeading (private function). Create a nice looking column heading 
        // (to be used in HTML table) based on propName which was probably a property name 
        // from a JSON string. 
        // Capitalize the first letter, then insert space before every subsequent capitalized letter. 
        // Example:  "userEmail" --> "User Email"
        function prettyColumnHeading(propName) {

            if (propName.length === 0) {
                return "";
            }

            var newHdg = "<img src='" + sortIcon + "'>";
            newHdg += " ";
            // capitalize first letter
            newHdg += propName.charAt(0).toUpperCase();
            // iterate through all characters, inserting space before any capital letters.
            for (var i = 1; i < propName.length; i++) {
                if (propName.charAt(i) < "a") {
                    newHdg += " ";
                }
                newHdg += propName.charAt(i);
            }
            return newHdg;
        } // prettyColumnHeading


        // right justify HTML table data (DOM object, a table cell) if it contains a number
        // center the value if it contains an image.
        function align(tableData) {

            var cellContent = tableData.innerHTML;
            if (cellContent.includes(".jpg") || cellContent.includes(".png")) {
                tableData.innerHTML = "<img width='" + imgWidth + "' src='" + cellContent + "'>";
                tableData.style.textAlign = "center";
            }
            if (!isNaN(cellContent) || // if numeric 
                    ((cellContent.length > 0) && (cellContent.charAt(0) === "$"))) { // or dollar amt
                tableData.style.textAlign = "right";
                //console.log("right alligning " + cellContent);
            }
        } // align 


        // build the column headings for the HTML table, basing column heading names 
        // from the property names of the first element in array 'list'.
        function buildColHeadings(newTable, list) {

            // Create a header ("thead" DOM element) and attach the header to the table. 
            // Then put a rwo into the table header
            var tableHead = document.createElement("thead");
            newTable.appendChild(tableHead);
            var tableHeadRow = document.createElement("tr");
            tableHead.appendChild(tableHeadRow);

            // put first object (from array of objects) into a 
            // plain object (to avoid needing multi-dimensional array).
            // Extract property names from the object and use them 
            // as column headings.
            var data = list[0];
            for (var prop in data) {
                var tableHeadDetail = document.createElement("th");
                tableHeadRow.appendChild(tableHeadDetail);
                tableHeadDetail.innerHTML = prettyColumnHeading(prop);
                tableHeadDetail.sortOrder = prop; // add custom property to DOM element
                tableHeadDetail.sortReverse = false; // add custom property to DOM element

                tableHeadDetail.onclick = function () {
                    // the keyword 'this' means the DOM element that was clicked.
                    console.log("SORTING by " + this.sortOrder + " -  this.sortReverse is " + this.sortReverse);
                    tableBuilder.sort(list, this.sortOrder, this.sortReverse);
                    fillRows(newTable, list); // places sorted data from list into tbody of table.
                    this.sortReverse = !this.sortReverse;
                    console.log("SORTed sortReverse is now " + this.sortReverse);
                };
            }
        } // buildColHeadings


        // return true if any property of obj contains searchKey. Else return false.
        function isToShow(obj, searchKey) {
            if (!searchKey || searchKey.length === 0) {
                return true; // show the object if searchKey is empty
            }
            var searchKeyUpper = searchKey.toUpperCase();
            for (var prop in obj) {
                var propVal = obj[prop]; // associative array, using property name as if index. 
                console.log("checking if " + searchKeyUpper + " is in " + propVal);
                var propValUpper = propVal.toUpperCase();
                if (propValUpper.includes(searchKeyUpper)) {
                    console.log("yes it is inside");
                    return true;
                }
            }
            console.log("no it is not inside");
            return false;
        } // isToShow


        // Add a new "tbody" (DOM object)" to replace any exisiting tbody of table newTable.
        // Then add one row (to HTML table) for element in array 'list'. 
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        function fillRows(newTable, list, searchValue) {

            // remove old tbody element if there is one 
            // (else you'll get sorted rows added to end of the rows already there).
            var oldBody = newTable.getElementsByTagName("tbody");
            if (oldBody[0]) {
                console.log("ready to remove oldBody");
                newTable.removeChild(oldBody[0]);
            }

            // create new tbody element and populate that with rows and cells. 
            var tableBody = document.createElement("tbody");
            newTable.appendChild(tableBody);

            for (var i in list) {
                var data = list[i];
                if (isToShow(data, searchValue)) {

                    var tableRow = document.createElement("tr");
                    tableBody.appendChild(tableRow);

                    // "prop" iterates over the properties in object "data"
                    for (var prop in data) {
                        var tableData = document.createElement("td");
                        tableRow.appendChild(tableData);
                        tableData.innerHTML = data[prop];
                        align(tableData); // I/O parameter
                    }
                } // if isToShow...
            }
        } // fillRows



        // MAIN PROGRAM of tableBuilder.build function (execution starts here).

        // param properties: list, target, sortIcon, orderPropName, reverse, style
        if (!params || !params.list || params.list.length < 1) {
            alert("Must supply input parameter object with 'list' property that holds an array with at least one element.");
            return;
        }
        var list = params.list;
        var target = params.target;
        if (!params.target) {
            alert("Must supply input parameter object with 'target' property " +
                    "that references a valid DOM object (where HTML table is to be placed).");
            return;
        }

        var orderPropName = params.orderPropName || ""; // optional, if not supplied, no sort applied. 

        var reverse = params.reverse || false; // optional property to pass in (default value is false)

        var style = params.style || "dataList"; // optional, if not supplied classname "dataList" will be added
        target.classList.add(style);

        var imgWidth = params.imgWidth || "100px"; // optional, if not supplied images will be 100px wide

        // list is like an I/O parameter. the order of elements in array list becomes changed.
        if (orderPropName && orderPropName.length > 0) {
            tableBuilder.sort(list, orderPropName, reverse);
            console.log("SORTED LIST NEXT LINE");
            console.log(list);
        }

        // Create a new HTML table (DOM object) and append that into the page. 
        var newTable = document.createElement("table");

        if (params.searchKeyElem) {
            console.log("there is a search key textbox");
            params.searchKeyElem.onkeyup = function () {
                console.log("search key is " + params.searchKeyElem.value);
                fillRows(newTable, list, params.searchKeyElem.value);
            };
        }

        target.innerHTML = ""; // clear out any old content so replacing, not appending.
        target.appendChild(newTable);

        buildColHeadings(newTable, list);
        fillRows(newTable, list, ""); // add <tr> elements into the <tbody> of the <table>. Each <tr> is object from list.

    }; // tableBuilder.build


// function tableBuilder.convert: takes a string, returns proper type (e.g., date, number etc). 

// If the String value in the cell being sorted contains a Date, convert to date type and return that. 
// If the String value contains a number, convert to number and return that (but after removing 
// commas and dollar signs that may be part of formatted numeric values).
// Else return the capitalized version of the String value that came in. 
    tableBuilder.convert = function (s) {

        if (!s || s.length === 0) {
            //console.log("s is null or empty string");
            return -1;
        }

        // a string that holds a date returns true for isNaN(strDate) (it's not a number)  
        // And it returns false for isNaN(Date.parse(strDate))
        var parsedDate = Date.parse(s);
        if (isNaN(s) && !isNaN(parsedDate)) {
            //console.log(s + " is a Date ");
            return parsedDate;
        } else {
            var tmp = s;
            console.log("tmp is " + tmp);
            tmp = tmp.replace("$", ""); // remove dollar signs
            tmp = tmp.replace(",", ""); // remove commas
            if (isNaN(tmp)) { // if not a number, return what was passed in 
                //console.log(s + " is a string - convert to uppercase for sorting purposes");
                return s.toUpperCase();
            } else {
                //console.log(tmp + " is a number");
                return Number(tmp);
            }
        }
    }; // convert 


// compare the value a to b and return 1 (if a>b), or 0 (if values equal), or -1 otherwise.
// a and b are strings coming in. Convert them to their proper type before comparing. 
    tableBuilder.compare = function (a, b, reverse) {

        // convert each 
        var aConverted = tableBuilder.convert(a);
        var bConverted = tableBuilder.convert(b);

        // dates and numbers sort best when null/empty values are represented as -1 (which is what convert already does)
        // but strings/images sort best when null/empty string are represented as "" (empty string)
        if (aConverted === -1 && isNaN(bConverted)) {
            aConverted = "";
            //console.log("1st value was -1 and 2nd was string, changed -1 to empty");
        }
        if (bConverted === -1 && isNaN(aConverted)) {
            bConverted = "";
            //console.log("2nd value was -1 and 1nd was string, changed -1 to empty");
        }

        // come up with comparison value: 1, 0, or -1
        var comparison = 0;
        if (aConverted > bConverted) {
            comparison = 1;
        } else if (aConverted < bConverted) {
            comparison = -1;
        }
        console.log("comparing " + aConverted + " to " + bConverted + " is " + comparison);
        if (reverse) {
            comparison = -comparison;
        }
        return comparison;
    }; // compare 


// function 'tableBuilder.sort' sorts 'list' by property 'byProperty' (a String which is the name of the property).
// Normally, sort from low to high but sort from high to low if boolean 'reverse' is true.
    tableBuilder.sort = function (list, byProperty, reverse) {

        // to use the built-in sort method that is available with every JS array, you must just provide 
        // (as input parameter to array.sort()) a compare function. This compare function must take 
        // two input args (both elements of the array you want to sort - name them as you wish). The compare 
        // function (anonymous function below) must output -1, 0, or 1 depending how the two array elements 
        // compare to each other. 

        // I am naming the list elements q and r just to show there's nothing magical about how you name the two array elements.  
        list.sort(function (q, r) {

            // using JS associative array notation (property name char string used inside square brackets 
            // as it if was an index value). Then pass that to the convert function (returns correct type not string).
            // q and r are objects, 
            // q[byProperty] and r[byProperty] are the value of the sort property of the two objects.
            return tableBuilder.compare(q[byProperty], r[byProperty], reverse);
        });
    }; // sort
    
    return tableBuilder;
}