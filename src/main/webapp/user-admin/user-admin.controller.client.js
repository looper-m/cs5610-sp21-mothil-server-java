var $tableRows
var $findBtn
var $createBtn
var $updateBtn

var $userNameFld
var $passwordFld
var $firstNameFld
var $lastNameFld
var $roleFld

var userService = new AdminUserServiceClient()

var users = []


function createUser() {
    var newUser = {
        username: $userNameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val()
    }

    userService.createUser(newUser)
        .then(function (actualUser) {
            users.push(actualUser)
            renderUsers(users)
        })
}

var userToUpdate = null
function editUser(event) {
    var id = $(event.currentTarget).attr("id")
    userToUpdate = users.find(user => user._id === id)

    $userNameFld.val(userToUpdate.username)
    // $passwordFld.val(userToUpdate.firstName)
    $firstNameFld.val(userToUpdate.firstName)
    $lastNameFld.val(userToUpdate.lastName)
    $roleFld.val(userToUpdate.role)
}

function updateUser() {
    userToUpdate.username = $userNameFld.val()
    userToUpdate.password = $passwordFld.val()
    userToUpdate.firstName = $firstNameFld.val()
    userToUpdate.lastName = $lastNameFld.val()
    userToUpdate.role = $roleFld.val()

    userService.updateUser(userToUpdate._id, userToUpdate)
        .then(status => {
            var index = users.find(user => user._id === userToUpdate._id)
            users[index] = userToUpdate
            renderUsers(users)
        })
}

function deleteUser(event) {
    var button = $(event.currentTarget)
    var index = button.attr("id")
    var id = users[index]._id

    userService.deleteUser(id)
        .then(function (status) {
            users.splice(index, 1)
            renderUsers(users)
        })
}

function findUser(event) {

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
                <td>
                    <button id="${user._id}" class="wbdv-edit-btn btn p-1"><i class="fas fa-pencil-alt fa-2x"></i></button>
                    <button id="${i}" class="wbdv-delete-btn btn p-1"><i class="fas fa-minus-circle fa-2x"></i></button>
                </td>
            </tr>
        `)
    }

    $(".wbdv-edit-btn").click(editUser)
    $(".wbdv-delete-btn").click(deleteUser)

    $userNameFld.val('')
    $passwordFld.val('')
    $firstNameFld.val('')
    $lastNameFld.val('')
    // $roleFld.val()
}

function main() {
    $tableRows = $(".wbdv-table-rows")
    $findBtn = $(".wbdv-find-btn")
    $createBtn = $(".wbdv-create-btn")
    $updateBtn = $(".wbdv-update-btn")

    $userNameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-password-fld")
    $firstNameFld = $(".wbdv-first-name-fld")
    $lastNameFld = $(".wbdv-last-name-fld")
    $roleFld = $(".wbdv-role-fld")

    $findBtn.click(findUser)
    $createBtn.click(createUser)
    $updateBtn.click(updateUser)

    userService.findAllUsers().then(function (retrievedUsers) {
        users = retrievedUsers
        renderUsers(users)
    })
}
$(main)