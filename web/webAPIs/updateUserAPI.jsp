<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();

    String jsonInsertData = request.getParameter("jsonData");

    if (jsonInsertData == null) {
        errorMsgs.errorMsg = "Cannot insert -- no data was received";
        System.out.println(errorMsgs.errorMsg);
    } else {
        System.out.println("insertData received and is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) {
            System.out.println("DB connection OK to proceed");
            
            StringData insertData = gson.fromJson(jsonInsertData, StringData.class);
            
            errorMsgs.webUserId = ValidationUtils.integerValidationMsg(insertData.webUserId, true);
            errorMsgs.userEmail = ValidationUtils.stringValidationMsg(insertData.userEmail, 45, true);
            errorMsgs.userPassword = ValidationUtils.stringValidationMsg(insertData.userPassword, 45, true);

            if (insertData.userPassword.compareTo(insertData.userPassword2) != 0) {
                errorMsgs.userPassword2 = "Both passwords must match";
            }

            errorMsgs.birthday = ValidationUtils.dateValidationMsg(insertData.birthday, false);
            errorMsgs.membershipFee = ValidationUtils.decimalValidationMsg(insertData.membershipFee, false);
            errorMsgs.userRoleId = ValidationUtils.integerValidationMsg(insertData.userRoleId, true);

            if (errorMsgs.getCharacterCount() > 0) {
                errorMsgs.errorMsg = "Please try again";

            } else {
                String sql = "UPDATE web_user "
                        + "SET user_email = ?, "
                        + "user_password = ?, "
                        + "membership_fee = ?, "
                        + "birthday = ?, "
                        + "user_role_id = ? "
                        + "WHERE web_user_id = ?;";

                PrepStatement pStatement = new PrepStatement(dbc, sql);

                pStatement.setString(1, insertData.userEmail);
                pStatement.setString(2, insertData.userPassword);
                pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(insertData.membershipFee));
                pStatement.setDate(4, ValidationUtils.dateConversion(insertData.birthday));
                pStatement.setInt(5, ValidationUtils.integerConversion(insertData.userRoleId));
                pStatement.setInt(6, ValidationUtils.integerConversion(insertData.webUserId));

                int numRows = pStatement.executeUpdate();

                errorMsgs.errorMsg = pStatement.getErrorMsg();
                if (errorMsgs.errorMsg.length() == 0) {
                    if (numRows == 1) {
                        errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                    } else {
                        errorMsgs.errorMsg = "Please enter a valid 'Web User Id'.";
                    }
                } else if (errorMsgs.errorMsg.contains("foreign key")) {
                    errorMsgs.errorMsg = "Invalid User Role Id";
                } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                    errorMsgs.errorMsg = "That email address is already taken";
                }

            }

        }
    }

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>

