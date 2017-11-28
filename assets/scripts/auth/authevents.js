'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const authapi = require('./authapi')
const authui = require('./authui')

const onSignInFormShow = function (event) {
  event.preventDefault()
  $('#sign-up-form').modal('hide')
}

const onSignUpFormShow = function (event) {
  console.log('hittng onSignUpFormShow')
  event.preventDefault()
  $('#sign-in-form').modal('hide')
}

const onSignUp = function (event) {
  console.log('hitting onSignUp authevents.js')
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

const onSignOut = function (event) {
  event.preventDefault()
  authapi.signOut()
    .then(authui.signOutSuccess)
    .catch(authui.signOutFailure)
}

const addAuthHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-link').on('click', onSignOut)
  $('#sign-in-form').on('focus', onSignInFormShow)
  $('#sign-up-form').on('focus', onSignUpFormShow)
  $('#sign-up-form').trigger('reset')
  authui.initializeForm()
  $('.close-modal').on('click', function () {
    $('#change-password').trigger('reset')
  })
  $('.close-modal').on('click', function () {
    $('#sign-up').trigger('reset')
  })
  $('.close-modal').on('click', function () {
    $('#sign-in').trigger('reset')
  })
  $('.close-modal').on('click', function () {
    $('#add-pet').trigger('reset')
  })
  $('.close-modal').on('click', function () {
    $('#add-appointment').trigger('reset')
  })
  $('.close-modal').on('click', function () {
    $('#update-pet').trigger('reset')
  })
  $('.close-modal').on('click', function () {
    $('#update-appointment').trigger('reset')
  })
}

module.exports = {
  addAuthHandlers
}
