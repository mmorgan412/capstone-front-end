const showAppointmentsTemplate = require('../templates/appointments.handlebars')
const moment = require('moment')

const addAppointmentSuccess = function (data) {
  console.log('appointment success data is ', data)
  console.log('data.appointments is ', data.appointment)
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

const getAppointmentsSuccess = function (data) {
  data.appointments.map(result => {
    result.time = moment(result.time).format('LT')
    result.date = moment(result.date).format('L')
    return result
  })
  const showAppointmentHtml = showAppointmentsTemplate(data)
  $('#appointment-list').html(showAppointmentHtml)
  $('[data-toggle="popover"]').popover()
}

const updateAppointmentSuccess = function (data) {
  $('#edit-appointment-modal').modal('hide')
  $('#update-appointment')[0].reset()
  getAppointmentsSuccess(data)
}

module.exports = {
  addAppointmentSuccess,
  addAppointmentFailure,
  getAppointmentsSuccess,
  deleteAppointmentSuccess,
  updateAppointmentSuccess
  // addAppointmentFailure,
}
