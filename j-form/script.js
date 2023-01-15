"use strict"

$(document).ready(() => {
    $('#login-form').on('submit', (event) => {
        event.preventDefault()

        let username = $('#username').val()
        let password = $('#password').val()

        const usernameError = $('#username-error')
        const passwordError = $('#password-error')

        const pattern = /^[a-zA-Z0-9_. ]{6,32}$/

        usernameError.empty()
        passwordError.empty()

        if (!pattern.test(username)) {
            usernameError.text("The length of username must be between 6 and 32 alphanumeric characters")
        }

        else if (!pattern.test(password)) {
            passwordError.text("The length of password must be between 6 and 32 alphanumeric characters")
        }

        else {
            $.post("http://localhost:63342/j-form/data.json", {
            }, (res) => {
                $('#alert-success').remove()
                $('#alert-danger').remove()

                if (res.username !== username || res.password !== password) {
                    $('#login-form .card-body').append('<div class="alert alert-danger" id="alert-danger"><span>Invalid credentials!</span></div>')
                    $('#password').val("")
                } else {
                    $('#login-form .card-body').append('<div class="alert alert-success" id="alert-success"><span>Welcome</span></div>')
                    $('#username').val("")
                    $('#password').val("")
                }
            })
        }
    })
})
