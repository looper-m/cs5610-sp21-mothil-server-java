function successAlert(event) {
    $(".wbdv-save-alert")
        .empty()
        .append(`
            <div class='alert alert-success alert-dismissable'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                <strong>Profile saved successfully!</strong>
            </div>
        `)
    event.preventDefault();
}


function init() {
    $(".wbdv-profile-form").submit(successAlert);
}

$(init)