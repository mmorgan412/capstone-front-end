const showAppointmentsTemplate = require('../templates/appointments.handlebars')
const moment = require('moment')

const addAppointmentSuccess = function (data) {
  console.log('appointment success data is ', data)
  console.log('data.appointments is ', data.appointment)
  $('#get-appointments').trigger('click')
  $('#add-appointment-form').modal('hide')
  $('#add-appointment')[0].reset()
}

const addAppointmentFailure = function () {
  console.log('add Failure')
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
  console.log('data.appointments.length', data.appointments.length)
  if (data.appointments.length > 0) {
    const showAppointmentHtml = showAppointmentsTemplate(data)
    $('#appointment-list').html(showAppointmentHtml)
    $('[data-toggle="popover"]').popover()
    $('#appointment-list').show()
  } else {
    $('#appointment-list').show()
    $('#appointment-list').append('You currently have no appointments.')
  }
}

const updateAppointmentSuccess = function (data) {
  $('#edit-appointment-modal').modal('hide')
  $('#update-appointment')[0].reset()
  $('#get-appointments').trigger('click')
}

module.exports = {
  addAppointmentSuccess,
  addAppointmentFailure,
  getAppointmentsSuccess,
  deleteAppointmentSuccess,
  updateAppointmentSuccess
  // addAppointmentFailure,
}
