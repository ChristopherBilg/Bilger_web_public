<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="java.sql.PreparedStatement" %> 
<%@page language="java" import="java.sql.ResultSet" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringDataList list = new StringDataList();

    String email = request.getParameter("email");
    String password = request.getParameter("password");
    
    if ((email == null) || (password == null)) {
        System.out.println("Cannot search for user - email and password must be set");
    } else {

        DbConn dbc = new DbConn();
        list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        
        if (list.dbError.length() == 0) { // if got good DB connection,
            System.out.println("Found the user '" + email + "'");
            list.add(DbMods.logonFind(email, password, dbc));
        }
        else {
            list.dbError = "Could not create a database connection.";
            System.out.println("Could not create a database connection.");
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
    if (email != null)
        session.setAttribute("email", email);
    if (password != null)
        session.setAttribute("password", password);
%>