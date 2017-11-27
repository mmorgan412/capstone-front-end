'use strict'

const config = require('../config')
const store = require('../store')

const createAppointment = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/appointments',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const getAppointments = function () {
  return $.ajax({
    url: config.apiOrigin + '/appointments',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getAppointment = function (id) {
  console.log('hitting getAppointment API')
  console.log('id in API getAppointment is ', id)
  return $.ajax({
    url: config.apiOrigin + '/appointments/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateAppointment = function (data, appointmentId) {
  return $.ajax({
    url: config.apiOrigin + '/appointments/' + appointmentId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteAppointment = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/appointments/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const searchAppointments = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/appointments?rating=' + data,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createAppointment,
  getAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  searchAppointments
}
