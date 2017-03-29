/**
 * Name: Alex Oladele
 * Date: 1/14/17
 * Course CSE 270e
 * Assignment: Timer V4.0
 */

// Hide and show the info on button click
$(document).ready(function () {
    // Initially hides the buttons
    $(".toHide").hide();

    // Shows and Hides the Author and Course buttons whenever clicked
    $("button").click(function () {
        $(this).siblings(".toHide").toggle();
    });
});