package model.webUser;

import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringData logonFind(String email, String password, DbConn dbc) {
        StringData foundData = new StringData();

        if ((email == null) || (password == null)) {
            foundData.errorMsg = "User name and user password must both be non-null.";
            return foundData;
        }

        try {
            String sql = "select * from web_user "
                    + "where user_email = ? "
                    + "and user_password = ?";

            System.out.println("*** Ready to prepare statement. Sql is: " + sql);
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            stmt.setString(1, email);
            stmt.setString(2, password);
            
            System.out.println("SQL:: " + stmt);

            ResultSet results = stmt.executeQuery();
            if (results.next()) {
                return new StringData(results);
            } else {
                foundData.errorMsg = "Username and/or password not found in the database.";
                return foundData;
            }
        } catch (Exception e) {
            foundData.errorMsg = "Database error, check DbConn settings.";
            System.out.println("ERR: " + foundData.errorMsg);
            return foundData;
        }
    }
    
    public static String delete(String userId, DbConn dbc) {

        if (userId == null) {
            return "Error in modelwebUser.DbMods.delete: cannot delete web_user record because 'userId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM web_user WHERE web_user_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, userId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with web_user_id " + userId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.webUser.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }
}
