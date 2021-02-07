var $tableRows
var $findBtn
var $createBtn
var $updateBtn
var $clearBtn

var $userNameFld
var $passwordFld
var $firstNameFld
var $lastNameFld
var $roleFld

var userService = new AdminUserServiceClient()
var users = []

var alertClass = {
    WARNING: "alert-warning",
    ERROR: "alert-danger",
    SUCCESS: "alert-success",
    INFO: "alert-info"
}

function showAlert(message, type) {
    $(".wbdv-user-admin-alert")
        .empty()
        .append(`
            <div class='alert ${type} alert-dismissable'>
                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                ${message}
            </div>
        `)
}

function dismissAlert() {
    $(".wbdv-user-admin-alert").empty()
}

function createUser() {
    dismissAlert()

    if (!$userNameFld.val().trim()
        || !$firstNameFld.val().trim()
        || !$lastNameFld.val().trim()
        || !$roleFld.val()) {
        showAlert("Cannot create a new user with <strong>missing values</strong>!", alertClass.WARNING)
        return
    }

    if (users.find(user => user.username === $userNameFld.val().trim())) {
        showAlert("<strong>Username unavailable!</strong>", alertClass.WARNING)
        return
    }

    var newUser = {
        username: $userNameFld.val().trim(),
        password: $passwordFld.val().trim(),
        firstName: $firstNameFld.val().trim(),
        lastName: $lastNameFld.val().trim(),
        role: $roleFld.val()
    }

    userService.createUser(newUser)
        .then(actualUser => {
            users.push(actualUser)
            clearAndRenderUsers(users)
        })
}

var userToUpdate = null

function editUser(event) {
    var id = $(event.currentTarget).attr("id").split("::")[1]
    userToUpdate = users.find(user => user._id === id)

    $userNameFld.val(userToUpdate.username)
    // $passwordFld.val(userToUpdate.firstName)
    $firstNameFld.val(userToUpdate.firstName)
    $lastNameFld.val(userToUpdate.lastName)
    $roleFld.val(userToUpdate.role)

    $updateBtn.prop('disabled', false);
}

function updateUser() {
    dismissAlert()

    if (!userToUpdate) {
        showAlert("Cannot update a <strong>nonexistent user</strong>!", alertClass.WARNING)
        return
    }

    if (users.find(user => user._id !== userToUpdate._id && user.username === $userNameFld.val().trim())) {
        showAlert("<strong>Username unavailable!</strong>", alertClass.WARNING)
        return
    }

    userToUpdate.username = $userNameFld.val().trim()
    userToUpdate.password = $passwordFld.val().trim()
    userToUpdate.firstName = $firstNameFld.val().trim()
    userToUpdate.lastName = $lastNameFld.val().trim()
    userToUpdate.role = $roleFld.val()

    userService.findUserById(userToUpdate._id)
        .then(retrievedUser => {
            if (retrievedUser.username === userToUpdate.username
                && retrievedUser.password === userToUpdate.password
                && retrievedUser.firstName === userToUpdate.firstName
                && retrievedUser.lastName === userToUpdate.lastName
                && retrievedUser.role === userToUpdate.role) {
                showAlert("Nothing to update.", alertClass.INFO)
                return
            }
            userService.updateUser(retrievedUser._id, userToUpdate)
                .then(updatedUser => {
                    var index = users.find(user => user._id === updatedUser._id)
                    users[index] = updatedUser
                    clearAndRenderUsers(users)
                    showAlert("<strong>User updated successfully!</strong>", alertClass.SUCCESS)
                })
        }).catch(error => {
        showAlert("User could <strong>not</strong> be <strong>found</strong>!", alertClass.ERROR)
    })
}

function deleteUser(event) {
    var id = $(event.currentTarget).attr("id").split("::")[1]

    userService.deleteUser(id)
        .then(status => {
            users = users.filter(user => user._id !== id)
            clearAndRenderUsers(users)
        })
}

function findUser() {
    filteredUsers = []

    for (var i = 0; i < users.length; i++) {
        var includeUser = true

        if ($userNameFld.val().trim() && $userNameFld.val().trim() !== users[i].username) includeUser = false
        if ($firstNameFld.val().trim() && $firstNameFld.val().trim() !== users[i].firstName) includeUser = false
        if ($lastNameFld.val().trim() && $lastNameFld.val().trim() !== users[i].lastName) includeUser = false
        if ($roleFld.val() && $roleFld.val() !== users[i].role) includeUser = false

        if (includeUser) filteredUsers.push(users[i])
    }
    renderUsers(filteredUsers)
}

function clearAndRenderUsers() {
    userToUpdate = null
    $userNameFld.val('')
    $passwordFld.val('')
    $firstNameFld.val('')
    $lastNameFld.val('')
    $roleFld.val('')
    $updateBtn.prop('disabled', true);

    renderUsers(users)
}

function renderUsers(users) {
    $tableRows.empty()

    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        $tableRows.prepend(`
            <tr class="border-top border-bottom">
                <td>${user.username}</td>
                <td></td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.role}</td>
                <td class="text-right">
                    <button id="edit::${user._id}" class="wbdv-edit-btn btn p-1">
                        <i class="fas fa-pencil-alt fa-2x wbdv-fas-color"></i>
                    </button>
                    <button id="del::${user._id}" class="wbdv-delete-btn btn p-1">
                        <i class="fas fa-minus-circle fa-2x wbdv-fas-delete-color"></i>
                    </button>
                </td>
            </tr>
        `)
    }

    $(".wbdv-edit-btn").click(editUser)
    $(".wbdv-delete-btn").click(deleteUser)
}

function init() {
    $tableRows = $(".wbdv-table-rows")
    $findBtn = $(".wbdv-find-btn")
    $createBtn = $(".wbdv-create-btn")
    $updateBtn = $(".wbdv-update-btn")
    $clearBtn = $(".wbdv-clear-btn")

    $userNameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-password-fld")
    $firstNameFld = $(".wbdv-first-name-fld")
    $lastNameFld = $(".wbdv-last-name-fld")
    $roleFld = $(".wbdv-role-fld")

    $findBtn.click(findUser)
    $createBtn.click(createUser)
    $updateBtn.prop('disabled', true);
    $updateBtn.click(updateUser)
    $clearBtn.click(clearAndRenderUsers)

    userService.findAllUsers().then(function (retrievedUsers) {
        users = retrievedUsers
        renderUsers(users)
    })
}

$(init)