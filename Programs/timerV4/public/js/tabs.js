/**
 * Name: Alex Oladele
 * Date: 1/16/17
 * Course CSE 270e
 * Assignment: Timer V4.0
 */

$(document).ready(function () {

    // Switches the Active tab element depending on current page
    if (document.URL.indexOf("/about") >= 0) {
        // If on the about page, then change the active tab to About
        $("#aboutTab").addClass("active");
    } else if (document.URL.indexOf("/loginform") >= 0) {
        // If on login page, then change active tab to Login
        $("#loginTab").addClass("active");
    } else {
        // Default active tab is the home page
        $("#homeTab").addClass("active");
    }
});
