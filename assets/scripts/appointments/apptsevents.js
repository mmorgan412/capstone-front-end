'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const appointmentsApi = require('./appointmentsapi')
const appointmentsUi = require('./appointmentsui')
const store = require('./../store.js')
// const moment = require('moment')

const onAddAppointment = function (event) {
  event.preventDefault()
  const id = store.pets.id
  $("input[name='appointment[pet_id]'").val(id)
  const data = getFormFields(this)
  appointmentsApi.createAppointment(data)
    .then(appointmentsUi.addAppointmentSuccess)
    .catch(appointmentsUi.addAppointmentFailure)
}

const onGetAppointments = function (event) {
  event.preventDefault()
  appointmentsApi.getAppointments(store.pets.id)
    .then(appointmentsUi.getAppointmentsSuccess)
    .then(onDeleteAppointment)
    .then(onEditAppointment)
    .then(onUpdateAppointment)
    .catch(appointmentsUi.getAppointmentsFailure)
}

const onDeleteAppointment = (event) => {
  $('.remove-appointment').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    $('#confirm-delete-appt').on('click', function () {
      confirmDelete(index)
    })
  })
}

const confirmDelete = (index) => {
  appointmentsApi.deleteAppointment(index)
    .then(appointmentsUi.deleteAppointmentSuccess)
    .catch(appointmentsUi.deleteAppointmentFailure)
}

const onEditAppointment = () => {
  $('.edit-appointment').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    appointmentsApi.getAppointment(index).then(function (data) {
      const appointmentDate = data.appointment.date
      const appointmentTime = data.appointment.time
      const weight = data.appointment.weight
      const description = data.appointment.description
      const cost = data.appointment.cost
      const notes = data.appointment.notes
      const id = data.appointment.id
      const petId = data.appointment.pet_id
      store.appointmentId = data.appointment.id
      $('data-index').val(id)
      $("input[name='appointment[date]'").val(appointmentDate)
      $("input[name='appointment[time]'").val(appointmentTime)
      $("input[name='appointment[weight]'").val(weight)
      $("input[name='appointment[description]'").val(description)
      $("input[name='appointment[cost]'").val(cost)
      $("input[name='appointment[notes]'").val(notes)
      $("input[name='appointment[id]'").val(id)
      $("input[name='appointment[pet_id]'").val(petId)
    })
  })
}

const onUpdateAppointment = () => {
  $('#update-appointment').on('submit', function (event) {
    event.preventDefault()
    const data = getFormFields(this)
    appointmentsApi.updateAppointment(data, store.appointmentId)
      .then(appointmentsUi.updateAppointmentSuccess)
      .catch(appointmentsUi.updateAppointmentFailure)
  })
}

const addAppointmentHandlers = function () {
  $('#add-appointment').on('submit', onAddAppointment)
  $('#get-appointments').on('click', onGetAppointments)
  $('#appointment-delete-modal').on('hidden.bs.modal', function () {
    $('#confirm-delete-appt').off('click')
  })
}

module.exports = {
  addAppointmentHandlers
}
