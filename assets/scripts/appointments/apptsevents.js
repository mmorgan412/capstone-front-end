'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const appointmentsApi = require('./appointmentsapi')
const appointmentsUi = require('./appointmentsui')
const store = require('./../store.js')

const onAddAppointment = function (event) {
  console.log(event)
  event.preventDefault()
  const data = getFormFields(this)
  console.log('appointment data is', data)
  appointmentsApi.createAppointment(data)
    .then(appointmentsUi.addAppointmentSuccess)
    .catch(appointmentsUi.addAppointmentFailure)
}

const onGetAppointments = function (event) {
  event.preventDefault()
  appointmentsApi.getAppointments()
    .then(appointmentsUi.getAppointmentsSuccess)
    .then(onGetAppointment)
    .catch(appointmentsUi.getAppointmentsFailure)
}

const onGetAppointment = function (event) {
  $('.numberCircle').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    appointmentsApi.getAppointment(index)
      .then(appointmentsUi.getAppointmentSuccess)
      .then(onDeleteAppointment)
      .then(onEditAppointment)
      .then(onUpdateAppointment)
      .catch(appointmentsUi.getAppointmentFailure)
  })
}

const onDeleteAppointment = (event) => {
  $('.remove').on('click', function (event) {
    event.preventDefault()
    console.log('hitting onDeleteAppointment')
    const index = $(event.target).attr('data-id')
    appointmentsApi.deleteAppointment(index)
      .then(appointmentsUi.deleteAppointmentSuccess)
      .catch(appointmentsUi.deleteAppointmentFailure)
  })
}

const onEditAppointment = () => {
  $('.edit').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    appointmentsApi.getAppointment(index).then(function (data) {
      const appointmentName = data.appointment.name
      const licenseNumber = data.appointment.license_number
      console.log('license number is ', licenseNumber)
      const breed = data.appointment.breed
      console.log('breed is ', breed)
      const insuranceInfo = data.appointment.insurance_info
      console.log('insurance info  ', insuranceInfo)
      const vet = data.appointment.vet
      console.log('vet  ', vet)
      const id = data.appointment.id
      console.log('id  ', id)
      store.appointmentId = data.appointment.id
      $('data-index').val(id)
      $("input[name='appointment[name]'").val(appointmentName)
      $("input[name='appointment[license_number]'").val(licenseNumber)
      $("input[name='appointment[breed]'").val(breed)
      $("input[name='appointment[insurance_info]'").val(insuranceInfo)
      $("input[name='appointment[vet]'").val(vet)
    })
  })
}

const onUpdateAppointment = () => {
  $('#update-appointment').on('submit', function (event) {
    console.log('hitting onUpdateAppointment')
    event.preventDefault()
    const data = getFormFields(this)
    appointmentsApi.updateAppointment(data, store.appointmentId)
      .then(appointmentsUi.updateAppointmentSuccess)
      .catch(appointmentsUi.updateAppointmentFailure)
  })
}

// const searchAppointments = (event) => {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   appointmentsApi.searchAppointments(data.appointment.rating)
//     .then(appointmentsUi.searchAppointmentsSuccess)
//     .then(deleteAppointment)
//     .then(editAppointment)
//     .then(updateAppointment)
//     .catch(appointmentsUi.searchAppointmentsFailure)
// }

const addAppointmentHandlers = function () {
  $('#add-appointment').on('submit', onAddAppointment)
  $('#get-appointments').on('click', onGetAppointments)
  $('#get-appointment').on('click', onGetAppointment)
}

module.exports = {
  addAppointmentHandlers
}
