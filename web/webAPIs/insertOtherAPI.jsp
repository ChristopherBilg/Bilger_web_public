<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.other.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringDataOther errorMsgs = new StringDataOther();

    String jsonInsertData = request.getParameter("jsonData");

    if (jsonInsertData == null) {
        errorMsgs.errorMsg = "Cannot insert -- no data was received";
        System.out.println(errorMsgs.errorMsg);
    } else { // URL parameter data was received
        System.out.println("insertData received and is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
            System.out.println("DB connection OK to proceed");

            // Must use gson to convert JSON (that the user provided as part of the url, the insertData. 
            // Convert from JSON (JS object notation) to POJO (plain old java object).
            StringDataOther insertData = gson.fromJson(jsonInsertData, StringDataOther.class);

            // Validation - field by field, check what's in insertData and put error message (if any) 
            // into corresponding field of errorMsgs.
            errorMsgs.todoListId = ValidationUtils.integerValidationMsg(insertData.todoListId, true);
            errorMsgs.webUserId = ValidationUtils.integerValidationMsg(insertData.webUserId, true);
            errorMsgs.url = ValidationUtils.stringValidationMsg(insertData.url, 256, true);
            
            errorMsgs.creationDate = ValidationUtils.dateValidationMsg(insertData.creationDate, false);
            errorMsgs.todoListDesc = ValidationUtils.stringValidationMsg(insertData.todoListDesc, 4096, false);
            
            if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                errorMsgs.errorMsg = "Please try again. (1)";

            } else { // all fields passed validation

                /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
                 */
                // Start preparing SQL statement
                String sql = "INSERT INTO other (todo_list_id, web_user_id, url, creation_date, todo_list_description) "
                        + "values (?,?,?,?,?)";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encode string values into the prepared statement (wrapper class).
                pStatement.setInt(1, ValidationUtils.integerConversion(insertData.todoListId));
                pStatement.setInt(2, ValidationUtils.integerConversion(insertData.webUserId));
                pStatement.setString(3, insertData.url);
                pStatement.setDate(4, ValidationUtils.dateConversion(insertData.creationDate));
                pStatement.setString(5, insertData.todoListDesc);

                // here the SQL statement is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                errorMsgs.errorMsg = pStatement.getErrorMsg();
                if (errorMsgs.errorMsg.length() == 0) {
                    if (numRows == 1) {
                        errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                } else if (errorMsgs.errorMsg.contains("todo_list_id_UNIQUE")) {
                    errorMsgs.errorMsg = "Please enter your unique todo list id.";
                } else if (errorMsgs.errorMsg.contains("url_UNIQUE")) {
                    errorMsgs.errorMsg = "Please enter a unique url.";
                } else if (errorMsgs.errorMsg.contains("a foreign key constraint fails")) {
                    errorMsgs.errorMsg = "Please enter a valid web user id.";
                }

            } // all fields passed validation

        } // db connection OK
    } // URL parameter data was received.

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>

