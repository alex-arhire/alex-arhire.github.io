//Dealing with potential global scope issues by using closure
(() => {
    var firstName = document.getElementById('firstname');
    var lastName = document.getElementById('lastname');
    var confirmPass = document.getElementById('confirm-password');
    var form = document.getElementById('login-form');
    var nameRegEx = /[a-zA-Z]+/g;

    function validateFirstName() {
        if (firstName.value.match(nameRegEx)) {
            validate('<span class="iconify" data-icon="ant-design:check-circle-outlined" data-inline="false" style="color: green;"></span> First Name validated', 'green', null);
        } else {
            validate('<span class="iconify" data-icon="clarity:remove-line" data-inline="false" style="color: red;"></span> Invalid First Name', 'red', true);
        }
    }

    firstName.addEventListener('keyup', validateFirstName);

    function validateLastName() {
        if (lastName.value.match(nameRegEx)) {
            validate('<span class="iconify" data-icon="ant-design:check-circle-outlined" data-inline="false" style="color: green;"></span> Last Name validated', 'green', null);
        } else {
            validate('<span class="iconify" data-icon="clarity:remove-line" data-inline="false" style="color: red;"></span> Invalid Last Name', 'red', true);
        }
    }

    lastName.addEventListener('keyup', validateLastName);

    function validatePasswordMatch() {
        if (password.value !== confirmPass.value) {
            validate( `<span class=\"iconify\" data-icon=\"clarity:remove-line\" data-inline=\"false\" style=\"color: red;\"></span> Passwords don't match`, 'red', true);
        } else {
            validate('', null, null);
            submitButton.style.backgroundColor = '#fc5500';
        }
    }

    confirmPass.addEventListener("keyup", validatePasswordMatch);

})();
