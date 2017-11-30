'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const authapi = require('./authapi')
const authui = require('./authui')

const onSignInFormShow = function (event) {
  event.preventDefault()
  $('#sign-up-form').modal('hide')
  $('#sign-up-fail-message').hide()
  $('#sign-up').trigger('reset')
}

const onSignUpFormShow = function (event) {
  event.preventDefault()
  $('#sign-in-form').modal('hide')
  $('#sign-in-fail-message').hide()
  $('#sign-in').trigger('reset')
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  authapi.signUp(data)
    .then(authui.signUpSuccess)
    .then(authapi.signUpSignIn)
    .then(authui.signInSuccess)
    .catch(authui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  authapi.signIn(data)
    .then(authui.signInSuccess)
    .catch(authui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  authapi.changePassword(data)
    .then(authui.changePasswordSuccess)
    .catch(authui.changePasswordFailure)
}

const addAuthHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-in-form').on('focus', onSignInFormShow)
  $('#sign-up-form').on('focus', onSignUpFormShow)
  $('#sign-up-form').trigger('reset')
  authui.initializeForm()
  $('.close-modal').on('click', function () {
    $('#change-password').trigger('reset')
    $('#change-password-fail-message').hide()
  })
  $('.close-modal').on('click', function () {
    $('#sign-up').trigger('reset')
    $('#sign-up-fail-message').hide()
  })
  $('.close-modal').on('click', function () {
    $('#sign-in').trigger('reset')
    $('#sign-in-fail-message').hide()
  })
  $('.close-modal').on('click', function () {
    $('#add-pet').trigger('reset')
    $('#add-pet-fail-message').hide()
  })
  $('.close-modal').on('click', function () {
    $('#add-appointment').trigger('reset')
    $('#add-appt-fail-message').hide()
  })
  $('.close-modal').on('click', function () {
    $('#update-pet').trigger('reset')
    $('#edit-pet-fail-message').hide()
  })
  $('.close-modal').on('click', function () {
    $('#update-appointment').trigger('reset')
    $('#edit-appt-fail-message').hide()
  })
}

module.exports = {
  addAuthHandlers
}
