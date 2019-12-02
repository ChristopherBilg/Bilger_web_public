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
    } else {
        System.out.println("insertData received and is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) {
            System.out.println("DB connection OK to proceed");

            StringDataOther insertData = gson.fromJson(jsonInsertData, StringDataOther.class);
            
            errorMsgs.otherId = ValidationUtils.integerValidationMsg(insertData.otherId, true);
            errorMsgs.todoListId = ValidationUtils.integerValidationMsg(insertData.todoListId, true);
            errorMsgs.url = ValidationUtils.stringValidationMsg(insertData.url, 256, true);
            errorMsgs.todoListDesc = ValidationUtils.stringValidationMsg(insertData.todoListDesc, 4096, false);
            errorMsgs.creationDate = ValidationUtils.dateValidationMsg(insertData.creationDate, false);
            errorMsgs.webUserId = ValidationUtils.integerValidationMsg(insertData.webUserId, true);

            if (errorMsgs.getCharacterCount() > 0) {
                errorMsgs.errorMsg = "Please try again";

            } else {
                String sql = "UPDATE other "
                        + "SET todo_list_id = ?, "
                        + "url = ?, "
                        + "todo_list_description = ?, "
                        + "creation_date = ?, "
                        + "web_user_id = ? "
                        + "WHERE other_id = ?;";

                PrepStatement pStatement = new PrepStatement(dbc, sql);

                pStatement.setInt(1, ValidationUtils.integerConversion(insertData.todoListId));
                pStatement.setString(2, insertData.url);
                pStatement.setString(3, insertData.todoListDesc);
                pStatement.setDate(4, ValidationUtils.dateConversion(insertData.creationDate));
                pStatement.setInt(5, ValidationUtils.integerConversion(insertData.webUserId));
                pStatement.setInt(6, ValidationUtils.integerConversion(insertData.otherId));

                int numRows = pStatement.executeUpdate();

                errorMsgs.errorMsg = pStatement.getErrorMsg();
                if (errorMsgs.errorMsg.length() == 0) {
                    if (numRows == 1) {
                        errorMsgs.errorMsg = "";
                    } else {
                        errorMsgs.errorMsg = "Please enter a valid 'Other Id'.";
                    }
                } else if (errorMsgs.errorMsg.contains("foreign key")) {
                    errorMsgs.errorMsg = "Invalid Other Id";
                } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                    errorMsgs.errorMsg = "That todo list id is already taken";
                }

            }

        }
    }

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>

