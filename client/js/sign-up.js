let firstName = document.getElementById('firstname');
let lastName = document.getElementById('lastname');
let confirmPass = document.getElementById('confirm-password');
let signUpForm = document.getElementById('signup-form');
let nameRegEx = /[a-zA-Z]+/g;

window.onload = function () {
    signUpForm.reset();
};

signUpForm.addEventListener('submit', function (event) {
    event.preventDefault();

    fetch('http://localhost:3000/signUp', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value
        })
    })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('token', data.token);
            window.location.assign('../../home.html');
        })
});

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
        validate(`<span class=\"iconify\" data-icon=\"clarity:remove-line\" data-inline=\"false\" style=\"color: red;\"></span> Passwords don't match`, 'red', true);
    } else {
        validate('', null, null);
        submitButton.style.backgroundColor = '#fc5500';
    }
}

confirmPass.addEventListener("keyup", validatePasswordMatch);

