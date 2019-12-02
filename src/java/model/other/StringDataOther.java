package model.other;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringDataOther {

    public String otherId = "";
    public String webUserId = "";
    public String userEmail = "";
    public String userPassword = "";
    public String birthday = "";
    public String membershipFee = "";
    public String userRoleId = "";   // Foreign Key
    public String todoListId = "";
    public String url = "";
    public String todoListDesc = "";
    public String creationDate = "";
    public String image = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringDataOther() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringDataOther(ResultSet results) {
        try {
            this.otherId = FormatUtils.formatInteger(results.getObject("other_id"));
            this.webUserId = FormatUtils.formatInteger(results.getObject("web_user_id"));
            this.userEmail = FormatUtils.formatString(results.getObject("user_email"));
            this.userPassword = FormatUtils.formatString(results.getObject("user_password"));
            this.birthday = FormatUtils.formatDate(results.getObject("birthday"));
            this.membershipFee = FormatUtils.formatDollar(results.getObject("membership_fee"));
            this.userRoleId = FormatUtils.formatInteger(results.getObject("web_user.user_role_id"));
            this.todoListId = FormatUtils.formatInteger(results.getObject("todo_list_id"));
            this.url = FormatUtils.formatString(results.getObject("url"));
            this.todoListDesc = FormatUtils.formatString(results.getObject("todo_list_description"));
            this.creationDate = FormatUtils.formatDate(results.getObject("creation_date"));
            this.image = FormatUtils.formatString(results.getObject("image"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.webUser.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.webUserId + this.userEmail + this.userPassword + this.birthday
                + this.membershipFee + this.userRoleId + this.todoListId + this.url
                + this.todoListDesc + this.creationDate + this.image;
        return s.length();
    }

    public String toString() {
        return "Web User Id: " + this.webUserId
                + ", User Email: " + this.userEmail
                + ", User Password: " + this.userPassword
                + ", Birthday: " + this.birthday
                + ", Membership Fee: " + this.membershipFee
                + ", User Role Id: " + this.userRoleId
                + ", Todo List Id: " + this.todoListId
                + ", URL: " + this.url
                + ", Todo List Description: " + this.todoListDesc
                + ", Creation Date: " + this.creationDate
                + ", Image: " + this.image;
    }
}
