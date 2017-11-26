'use strict'

const store = require('../store')

const alertCallerAuthSuccess = (alertLocation, alertMessage) => {
  $('#' + alertLocation).addClass('alert alert-success').html(alertMessage)
  setTimeout(function () {
    $('#' + alertLocation).removeClass('alert alert-success').html('')
  }, 1500)
}

const alertCallerAuthFailure = (alertLocation, alertMessage) => {
  $('#' + alertLocation).addClass('alert alert-danger').html(alertMessage)
  setTimeout(function () {
    $('#' + alertLocation).removeClass('alert alert-danger').html('')
  }, 1500)
}

const failureAuthShake = (modalTarget) => {
  $('#' + modalTarget).addClass('shake')
  setTimeout(function () {
    $('#' + modalTarget).removeClass('shake')
  }, 1500)
}

const signUpSuccess = (data) => {
  console.log('hitting sign up success')
  $('#sign-up-form').modal('hide')
  // Used to clear out login data
  $('#sign-up-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  alertCallerAuthSuccess('frontSuccess', 'Sign-Up Success')
}

const signUpFailure = () => {
  console.log('hitting sign up failure')
  alertCallerAuthFailure('frontError', 'Sign-Up Failure')
  failureAuthShake('sign-up-form')
}

const signInSuccess = (response) => {
  $('#sign-in-message').text('Sign In to Load Files')
  $('#sign-in-email').removeData()
  $('#sign-in-password').val('')
  $('#sign-in-form').modal('hide')
  $('#sign-in-link').hide()
  $('#sign-up-link').hide()
  $('#sign-out-link').show()
  $('#change-password-link').show()
  $('#create-ads-link').show()
  $('#manage-ads-link').show()
  $('.navbar-text').show()
  $('.navbar-text').text(response.user.email)
  // Used to clear out login data
  $('#sign-in-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  store.user = response.user
  $('#get-pets').trigger('click')
  alertCallerAuthSuccess('frontSuccess', 'Sign-In Success')
}

const signInFailure = () => {
  alertCallerAuthFailure('frontError', 'Sign-In Failure')
  failureAuthShake('sign-in-form')
}

const changePasswordSuccess = () => {
  $('#change-password-form').modal('hide')
  // Used to clear out login data
  $('#change-password-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  alertCallerAuthSuccess('frontSuccess', 'Change Password Success')
}

const changePasswordFailure = () => {
  alertCallerAuthFailure('frontError', 'Change Password Failure')
  failureAuthShake('change-password-form')
}

const initializeForm = () => {
  $('#sign-out').hide()
  $('#sign-out-link').hide()
  $('#change-password-link').hide()
  $('#file-upload-link').hide()
  $('#files-link').hide()
  $('#file-picker-form').hide()
  $('#get-uploads-link').hide()
  $('#get-user-uploads-link').hide()
  $('#sign-in-link').show()
  $('#sign-up-link').show()
  $('#sign-in-message').text('Please Sign In to Upload files.')
  $('#sign-in-form').modal('show')
  $('#uploads-thumbnails').hide()
  $('#no-uploads-message').hide()
  $('#file-upload-all-link').hide()
  $('.navbar-text').hide()
  store.user = null
  $('#get-pets').hide()
}

const signOutSuccess = () => {
  initializeForm()
  alertCallerAuthSuccess('frontSuccess', 'Sign-Out Success')
}

const signOutFailure = () => {
  alertCallerAuthFailure('frontError', 'Sign-Out Failure')
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
