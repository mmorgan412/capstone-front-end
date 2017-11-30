const showAppointmentsTemplate = require('../templates/appointments.handlebars')
const moment = require('moment')

const addAppointmentSuccess = function (data) {
  $('#get-appointments').trigger('click')
  $('#add-appointment-form').modal('hide')
  $('#add-appointment')[0].reset()
  $('#add-appt-fail-message').hide()
}

const addAppointmentFailure = function () {
  $('#add-appt-fail-message').show()
  $('#add-appt-fail-message').text('Sorry there was an issue adding your appointment.  Please try again.')
}

const deleteAppointmentSuccess = function () {
  $('#get-appointments').trigger('click')
}

const getAppointmentsSuccess = function (data) {
  data.appointments.map(result => {
    result.date = moment(result.date).format('L')
    result.time = moment(result.time, 'HH:mm').format('LT')
    return result
  })
  data.appointments.sort(function (a, b) {
    return Date.parse(b.date) - Date.parse(a.date)
  })
  if (data.appointments.length > 0) {
    const showAppointmentHtml = showAppointmentsTemplate(data)
    $('#appointment-list').html(showAppointmentHtml)
    $('[data-toggle="popover"]').popover()
    $('#appointment-list').show()
  } else {
    $('#appointment-list').show()
    $('#appointment-list').html('You currently have no appointments.')
  }
}

const updateAppointmentSuccess = function (data) {
  $('#edit-appointment-modal').modal('hide')
  $('#update-appointment')[0].reset()
  $('#get-appointments').trigger('click')
  $('#edit-appt-fail-message').hide()
}

const updateAppointmentFailure = function () {
  $('#edit-appt-fail-message').show()
  $('#edit-appt-fail-message').text('Sorry there was an issue updating your appiontment.  Please try again.')
}

module.exports = {
  addAppointmentSuccess,
  addAppointmentFailure,
  getAppointmentsSuccess,
  deleteAppointmentSuccess,
  updateAppointmentSuccess,
  updateAppointmentFailure
}
