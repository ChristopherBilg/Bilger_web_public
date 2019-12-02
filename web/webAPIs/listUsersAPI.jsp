<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="java.sql.PreparedStatement" %> 
<%@page language="java" import="java.sql.ResultSet" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringDataList strDataList = new StringDataList();

    System.out.println("*** Ready to get Db Connection.");
    DbConn dbc = new DbConn();
    strDataList.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
    System.out.println("*** Db Error is this (empty string means all good): " + dbc.getErr());
    if (strDataList.dbError.length() == 0) { // if got good DB connection, 
        try {
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "
                    + "web_user.user_role_id, user_role_type, image "
                    + "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
                    + "ORDER BY web_user_id";

            System.out.println("*** Ready to prepare statement. Sql is: " + sql);
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            System.out.println("*** Ready to execute the sql.");
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                System.out.println("*** Ready to extract one row from the result set.");
                strDataList.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            System.out.println("*** Exception thrown, messages is: " + e.getMessage());
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown, messages is: " + e.getMessage();
            strDataList.add(sd);
        }
    }

    dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(strDataList).trim());
%>