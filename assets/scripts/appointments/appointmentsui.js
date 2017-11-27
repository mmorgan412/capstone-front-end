const showAppointmentsTemplate = require('../templates/appointments.handlebars')

const addAppointmentSuccess = function (data) {
  console.log('appointment success data is ', data)
  console.log('data.appointments is ', data.appointments)
  $('#get-appointments').trigger('click')
  $('#add-appointment-form').modal('hide')
  $('#add-appointment')[0].reset()
  // window.setTimeout(function () {
  //   $('#add-message').fadeOut()
  // }, 3000)
}

const addAppointmentFailure = function () {
  console.log('add Failure')
}

const deleteAppointmentSuccess = function () {
  $('#get-appointments').trigger('click')
}

const getAppointmentSuccess = function (data) {
  console.log('data is ', data)
  const showAppointmentHtml = showAppointmentsTemplate(data)
  $('#appointment-list').html(showAppointmentHtml)
}

const updateAppointmentSuccess = function (data) {
  $('#edit-appointment-modal').modal('hide')
  $('#update-appointment')[0].reset()
  getAppointmentSuccess(data)
}

module.exports = {
  addAppointmentSuccess,
  addAppointmentFailure,
  getAppointmentSuccess,
  deleteAppointmentSuccess,
  updateAppointmentSuccess
  // addAppointmentFailure,
}
