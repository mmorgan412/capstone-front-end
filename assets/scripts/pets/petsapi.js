'use strict'

const config = require('../config')
const store = require('../store')

const createPet = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/pets',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const getPets = function () {
  return $.ajax({
    url: config.apiOrigin + '/pets',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getPet = function (id) {
  console.log('hitting getPet API')
  console.log('id in API getPet is ', id)
  return $.ajax({
    url: config.apiOrigin + '/pets/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePet = function (data, petId) {
  return $.ajax({
    url: config.apiOrigin + '/pets/' + petId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deletePet = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/pets/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const searchPets = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/pets?rating=' + data,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createPet,
  getPet,
  getPets,
  updatePet,
  deletePet,
  searchPets
}
