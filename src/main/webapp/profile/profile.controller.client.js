$("#profile-form").submit(function (e) {
    // $("#save-success-alert").addClass('show');
    $("#save-success-alert").empty().append(
        "<div class='alert alert-success alert-dismissable'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
        "<strong>Profile saved successfully!</strong>" +
        "</div>"
    )
    e.preventDefault();
});