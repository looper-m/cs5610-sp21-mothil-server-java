$("#profileForm").submit(function (e) {
    // $("#saveSuccessAlert").addClass('show');
    $("#saveSuccessAlert").empty().append(
        "<div class='alert alert-success alert-dismissable'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
        "<strong>Profile saved successfully!</strong>" +
        "</div>"
    )
    e.preventDefault();
});