'use strict'

const store = require('../store')
const showNavbarUserTemplate = require('../templates/navbar-user.handlebars'
)
const authapi = require('./authapi')

const signUpSuccess = (data) => {
  $('#sign-up-fail-message').hide()
  $('#sign-up-form').modal('hide')
  // Used to clear out login data
  $('#sign-up-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
}

const signUpFailure = () => {
  $('#sign-up-fail-message').show()
  $('#sign-up-fail-message').text('Sorry there was an issue with sign-up.  Please try again.')
}

const showUserDropdown = (response) => {
  const showUserHtml = showNavbarUserTemplate({ user: response.user })
  $('#user-dropdown').html(showUserHtml)
}

const onSignOut = function (event) {
  event.preventDefault()
  authapi.signOut()
    .then(signOutSuccess)
    .catch(signOutFailure)
}

const signInSuccess = (response) => {
  $('#sign-in-message').text('Sign In to Load Files')
  $('#sign-in-email').removeData()
  $('#sign-in-password').val('')
  $('#sign-in-form').modal('hide')
  $('#sign-in-link').hide()
  $('#sign-up-link').hide()
  $('#change-password-link').show()
  $('#create-ads-link').show()
  $('#manage-ads-link').show()
  $('#sign-in-fail-message').hide()
  showUserDropdown(response)
  // Used to clear out login data
  $('#sign-in-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  store.user = response.user
  $('#get-pets').trigger('click')
  $('#sign-out-link').on('click', onSignOut)
  $('#user-dropdown').show()
}

const signInFailure = () => {
  $('#sign-in-fail-message').show()
  $('#sign-in-fail-message').text('Sorry there was an issue signing in.  Please try again.')
}

const changePasswordSuccess = () => {
  $('#change-password-fail-message').hide()
  $('#change-password-form').modal('hide')
  // Used to clear out login data
  $('#change-password-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
}

const changePasswordFailure = () => {
  $('#change-password-fail-message').show()
  $('#change-password-fail-message').text('Sorry there was an issue changing your password. Please try again.')
}

const initializeForm = () => {
  $('#sign-in-link').show()
  $('#sign-up-link').show()
  $('#sign-in-message').text('Please Sign In To Get Started')
  $('#sign-in-form').modal('show')
  store.user = null
  $('#get-pets').hide()
  $('#get-appointments').hide()
  $('#new-appointment').hide()
  $('#pet-list').hide()
  $('#appointment-list').hide()
  $('#pet-dropdown').hide()
  $('#pets-dropdown-link').hide()
  $('#user-dropdown').hide()
  $('#pet-list').val('')
  $('#appointment-list').val('')
  $('#landing-page-message').hide()
  $('#show-one-pet').hide()
}

const signOutSuccess = () => {
  initializeForm()
}

const signOutFailure = () => {
}

module.exports = {
  initializeForm,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
