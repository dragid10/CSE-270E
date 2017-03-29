/**
 * Name: Alex Oladele
 * Date: 1/15/17
 * Course CSE 270e
 * Assignment: Timer V4.0
 */

// Waits until document has finished loading before using Jquery
$(document).ready(function () {
    // Initialize variables to be used in the doc
    var username = null,
        password = null,
        formObj = {};

    // Assigns the values of username and password to their respectful variables when anything is typed in fields
    $("#username, #password").keyup(function () {
        username = $("#username").val().replace("<script>", "").replace("</script>", "").replace(/<.*?>/g, '');
        password = $("#password").val().replace("<script>", "").replace("</script>", "").replace(/<.*?>/g, '');

        // Just logging out the variables to make sure data is being entered correctly
        console.log("Username = " + username);
        console.log("Password = " + password);

        // Puts the data into an object for the post method
        formObj = {
            "username": username,
            "password": password
        };

        console.log("form obj: ");
        console.log(formObj);
    });

    // Checks to see if the username field is already filled, if so, then puts focus on the password field
    if ($(".alert-danger").is(":visible")) {
        $("#password").focus();
    } else {
        $("#username").focus();
    }

    $("#loginform").submit(function (event) {
        // When the form is submitted, prevent the default behavior, and instead make a post request
        event.preventDefault();

        $.post("http://127.0.0.1:3610/loginform", formObj, function (data, status) {
            console.log("Being sent:");
            console.log(formObj);

            // If the status is ok, then print this out to console
            if (status === "ok") {
                console.log("Stats was okay!");
                console.log("Post request went through");
            }
        }, "json").error(function () {
            // If an error occurs, then prints this out tothe console
            console.error("Could not submit post data!");
        });
    });

});