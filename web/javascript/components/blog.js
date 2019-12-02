"use strict";

function blog(id) {
    var content = `
        <h2>HW 1 Home Page</h2>
        <p>
            Currently, my web development experience consists of projects that I
            have worked on privately, on my own. I have an example webpage
            that I made in high school to help with my web dev. practice as well
            as some physics practice. I link to that project can be found here:
            <a href="https://github.com/ChristopherBilg/PhysicsPracticeWebpage">
            Physics Practice Webpage on GitHub</a>
        </p>
        <p>
            I found all of this homework to be fairly easy and straight forward.
            That said, it took me a little bit of time to start to remember the 
            HTML, CSS, and JS languages as well as their respective syntax
            and quirks. My interest in web development is being re-ignited
            by this course.
        </p>
    
        <h2>HW 2 Routing & Databases</h2>
        <p>
            I think that I am semi-knowledgable in MySQL Workbench and with MySQL.
            Two years ago I took a database design course, at Bucks County
            Community College, where we made the entire monopoly game using
            tables, linking those tables, and then feeding it to a webpage
            to be displayed to users.
        </p>
        <p>
            I learned how to connect to remote servers for file transfer using
            FileZilla and I learned how to remotely access Temple's database
            servers in order to access my database hosted by Temple. I found
            the guide that you gave us to be extremely helpful and easy to
            follow along with. I didn't find that there was much of a learning
            curve with this lab; however, at the beginning of the lab, Temple
            blocked some students from accessing the databases so the T.A. had
            to correct that. It took all of 5 minutes to be corrected and we
            were on our way to finishing the lab.
        </p>
        <p>
            <ul>
                <li>
                    In order to access this page, you know that my routing works
                    but if you'd like to play around then click:
                    the home icon, then the blog icon to get back here
                </li>
                <li>
                    If you'd like to read my backend database work then click 
                    <a href="external_files/database_hw2.pdf">here</a>
                </li>
            </ul>
        </p>
    
        <h2>HW 3 Web APIs</h2>
        <p>
            I have experience writting database backend code for a project in
            my Computer Science Java III course. We made a Monopoly clone with
            the use of tables and relationship links between them, and then used
            AJAX calls in order to display the state of the game in a web browser.
            I learned more about the intricate nature of AJAX calls, and that
            they can easily be written incorrectly, which can in turn create a
            slew of other problems.
        </p>
        <p>
            <ul>
                <li>
                    To see how I recreated some common database errors as well as
                    how I handled those errors, click
                    <a href="external_files/Homework_3.pdf">here</a>
                </li>
                <li>
                    If you'd like to see some API calls for the 'user_role' table,
                    click <a href="webAPIs/listUsersAPI.jsp">here</a>
                </li>
                <li>
                    If you'd like to see some API calls for the 'other' table,
                    click <a href="webAPIs/listOtherAPI.jsp">here</a>
                </li>
            </ul>
        </p>
    
        <h2>HW 4 Display Data</h2>
        <p>
            I learned, so far, the most from this homework than from the previous
            homework assignments. I have never worked with connection the fronend
            with the backend before so this was a challenge for me. I learned alot
            of new concepts such as AJAX, searching for input, and filtering
            data to display nicely to the user. I would say that the easier part of
            this homework was the routing, and AJAX calls; whereas the harder part
            was wrapping my head around the logic of sorting the tables and making
            this display nicely on the webpage.
        </p>
        <p>
            <ul>
                <li>
                    Click on the search icon above and choose either "Users"
                    or "Other" in order to see the tables and play around with them.
                </li>
            </ul>
        </p>
    
        <h2>HW 5 JavaScript SlideShow</h2>
        <p>
            I never thought that I would learn how to create complex JavaScript
            webpages, let alone a slideshow that takes links from a database,
            parses them into meaningful information, and then displays those
            links in the form of images to the user. I had some difficulty when
            it came to understanding the inner-workings of the slideshow itself;
            however once I understand that portion of this homework assignment I
            didn't have too much trouble moving forward. I like that, later on,
            we can theoretically have a user submit image links on the webpage
            and the slideshow will automatically display them, without needing
            any further changes. It grabs all links and then displays them, whether
            that is 5 or 500.
        </p>
        <p>
            <ul>
                <li>
                    If you'd like to see my implementation of the two slideshows
                    then click the search icon above, and then click 'Slideshow'
                </li>
            </ul>
        </p>
    
        <h2>HW 6 Logon</h2>
        <p>
            This was by far my favorite homework assignment to date. I have been
            waiting for this, so that I would be able to learn how to implement
            user login. I had a fair bit of difficulty in understanding the
            assignment itself and how I would implement it in my own web app.
            The follow bullet list gives some direction on how to use the login
            functionality on this website.
        </p>
        <p>
            <ol>
                <li>
                    To login, click on the user icon and then click "Log In".
                </li>
                <li>
                    To view the currently logged in user's profile, click on the
                    user icon and then click "Profile".
                </li>
                <li>
                    To log out, click on the user icon, and then click "Log Out".
                    After this, click on the "Log Out" button.
                </li>
            </ol>
        </p>
    
        <h2>HW 7 Delete</h2>
        <p>
            This purpose of this homework assignment was to build the user account
            delete functionality into our web application. When I read the directions
            for this homework assignment I figured that it would be fairly straight
            forward, and it ended up being just that. While yes, I have never implemented
            database functionality to delete rows from a table, it was essentially
            the same as reading rows from a table, except that we changed the
            PreparedStatement to delete a certain result. I had some trouble with the
            delete.png icon so I ended up using an HTML 'button' for the user input.
        </p>
        <p>
            In order to test the functionality of the delete buttons, feel free
            to click on the Search Icon above, and then click on 'Users' or 'Other'.
            Please only delete one or two rows at a time as to not remove all functionality
            of the web application.
        </p>
    
        <h2>HW 8 Insert</h2>
        <p>
            This lab was one of the more difficult labs; however, incredibly interesting
            at the same time. As I've said in pervious blog posts, user login's for web
            applications is an interest of mine. Keeping them secure and the best
            practices surrounding that. I really enjoyed being able to see the final
            step of user accounts; that being the registration side. So far we've
            seen registration, logging in, viewing profiles, logging out, and deleting
            accounts.
        </p>
        <p>
            In order to test the functionality of registering for a user account,
            click on the user icon above and then on "Register". The same goes for
            testing the functionality of registering an 'other' account; click
            on the search icon above and then on "Other Registration".
        </p>
    
        <h2>HW 9 Update</h2>
        <p>
            In this lab I was able to get all of the update functionality completed apart
            from the addition of having the data for each textbox prepopulated.
            I know how to implement that feature but I was not able to before
            the homework due date because I didn't want to look at the sample code too much.
        </p>
        <p>
            In order to test the functionality of updating records, feel free to
            click on the user icon above and then "Update User", or for the 'other'
            table click on search icon above and then "Update Other".
        </p>
        `;
    document.getElementById(id).innerHTML = content;
}