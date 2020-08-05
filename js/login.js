var email = document.getElementById('email');
var password = document.getElementById('password');
var inputDiv = document.getElementById('user-inputs');
var submitButton = document.getElementById('submit');
var loginForm = document.getElementById('login-form');
var icon = document.getElementsByClassName('fas fa-eye');
var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10}/g;
var message = document.createElement('p');

window.onload = function () {
    loginForm.reset();
};

function validate(info, msgColor, btnDisabled) {
    message.innerHTML = info;
    message.style.color = msgColor;
    inputDiv.appendChild(message);
    if (btnDisabled === true) {
        submitButton.setAttribute('disabled', 'true');
    } else if (btnDisabled === null) {
        submitButton.removeAttribute('disabled');
    }
}

function validateEmail() {
    if (email.value.match(emailRegEx)) {
        validate('<span class="iconify" data-icon="ant-design:check-circle-outlined" data-inline="false" style="color: green;"></span> Email validated', 'green', null);
    } else {
        validate('<span class="iconify" data-icon="clarity:remove-line" data-inline="false" style="color: red;"></span> Invalid email address', 'red', true);
    }
}

email.addEventListener('keyup', validateEmail);

function validatePassword() {
    if (window.location.href === "http://localhost:8080/login.html") {
        if (password.value.match(passwordRegEx)) {
            validate(`<span class="iconify" data-icon="ant-design:check-circle-outlined" data-inline="false" style="color: green;"></span> Password validated`, 'green', null);
            submitButton.style.backgroundColor = '#fc5500';
        } else {
            validate(`<span class=\"iconify\" data-icon=\"clarity:remove-line\" data-inline=\"false\" style=\"color: red;\"></span> Password should be at least 10 characters long, contain one uppercase, one lowercase and one digit`, 'red', true);
        }
    } else {
        if (password.value.match(passwordRegEx)) {
            validate(`<span class="iconify" data-icon="ant-design:check-circle-outlined" data-inline="false" style="color: green;"></span> Password validated`, 'green', null);
        } else {
            validate(`<span class=\"iconify\" data-icon=\"clarity:remove-line\" data-inline=\"false\" style=\"color: red;\"></span> Password should be at least 10 characters long, contain one uppercase, one lowercase and one digit`, 'red', true);
        }
    }
}

password.addEventListener('keyup', validatePassword);

function togglePasswordVisibility(event, input) {
    if (event.target.tagName === 'I') {
        if (input.getAttribute('type') === "password") {
            input.setAttribute('type', 'text');
        } else {
            input.setAttribute('type', 'password');
        }
    }
}

if (window.location.href === 'http://localhost:8080/login.html') {
    inputDiv.addEventListener('click', function () {
        togglePasswordVisibility(event, password);
    });
} else {
    inputDiv.addEventListener('click', function () {
        togglePasswordVisibility(event, password);
        togglePasswordVisibility(event, confirmPass);
    });
}


