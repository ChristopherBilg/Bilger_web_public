<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="java.sql.PreparedStatement" %> 
<%@page language="java" import="java.sql.ResultSet" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    session.removeAttribute("email");
    session.removeAttribute("password");
    
    StringDataList list = new StringDataList();
    list.add(new StringData());
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>