package model.other;

import java.util.ArrayList;
import java.sql.ResultSet;


// The purpose of this class is to have a nice java object that can be converted to JSON 
// to communicate everything necessary to the web page (the array of users plus a possible 
// list level database error message). 
public class StringDataListOther {

    public String dbError = "";
    public ArrayList<StringDataOther> webUserList = new ArrayList();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public StringDataListOther() {
    }

    // Adds one StringData element to the array list of StringData elements
    public void add(StringDataOther stringData) {
        this.webUserList.add(stringData);
    }

    // Adds creates a StringData element from a ResultSet (from SQL select statement), 
    // then adds that new element to the array list of StringData elements.
    public void add(ResultSet results) {
        StringDataOther sd = new StringDataOther(results);
        this.webUserList.add(sd);
    }
}
