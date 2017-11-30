'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const petsApi = require('./petsapi')
const petsUi = require('./petsui')
const store = require('./../store.js')
const showPetsNameTemplate = require('../templates/delete-pet.handlebars')

const onAddPet = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  petsApi.createPet(data)
    .then(petsUi.addPetSuccess)
    .catch(petsUi.addPetFailure)
}

const onGetPets = function (event) {
  event.preventDefault()
  petsApi.getPets()
    .then(petsUi.getPetsSuccess)
    .then(onGetPet)
    .then(onGetPetDropdown)
    .catch(petsUi.getPetsFailure)
}

const getPetHandler = function (index) {
  petsApi.getPet(index)
    .then(petsUi.getPetSuccess)
    .then(onDeletePet)
    .then(onEditPet)
    .then(onUpdatePet)
    .catch(petsUi.getPetFailure)
}

const onGetPet = function (event) {
  $('.numberCircle').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    getPetHandler(index)
  })
}

const onGetPetDropdown = function (event) {
  $('.pet-dropdown').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    petsApi.getPet(index)
      .then(petsUi.getPetSuccess)
      .then(onDeletePet)
      .then(onEditPet)
      .then(onUpdatePet)
      .catch(petsUi.getPetFailure)
  })
}

const onDeletePet = () => {
  $('.remove').one('click', function (event) {
    const index = $(event.target).attr('data-id')
    const petName = (event.target.innerText).split(' ').pop()
    const showPetNameHtml = showPetsNameTemplate({pet: petName})
    $('#are-you-sure').html(showPetNameHtml)
    confirmDeleteButton(index)
    // $('#confirm-delete-pet').one('click', function () {
    //   confirmDeletePet(index)
    // })
  })
}

const confirmDeleteButton = function (index) {
  $('#confirm-delete-pet').one('click', function () {
    confirmDeletePet(index)
  })
}

const confirmDeletePet = (index) => {
  petsApi.deletePet(index)
    .then(petsUi.deletePetSuccess)
    .catch(petsUi.deletePetFailure)
}

const onEditPet = () => {
  $('.edit').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    petsApi.getPet(index)
      .then(function (data) {
        const petName = data.pet.name
        const licenseNumber = data.pet.license_number
        const breed = data.pet.breed
        const insuranceInfo = data.pet.insurance_info
        const vet = data.pet.vet
        const url = data.pet.url
        const id = data.pet.id
        store.petId = data.pet.id
        $('data-index').val(id)
        $("input[name='pet[name]'").val(petName)
        $("input[name='pet[license_number]'").val(licenseNumber)
        $("input[name='pet[breed]'").val(breed)
        $("input[name='pet[insurance_info]'").val(insuranceInfo)
        $("input[name='pet[vet]'").val(vet)
        $("input[name='pet[url]'").val(url)
      })
  })
}

const onUpdatePet = () => {
  $('#update-pet').on('submit', function (event) {
    event.preventDefault()
    const data = getFormFields(this)
    petsApi.updatePet(data, store.petId)
      .then(petsUi.updatePetSuccess)
      .then(function (result) {
        getPetHandler(result.pet.id)
      })
      .catch(petsUi.updatePetFailure)
  })
}

const addPetHandlers = function () {
  $('#add-pet').on('submit', onAddPet)
  $('#get-pets').on('click', onGetPets)
  $('#get-pet').on('click', onGetPet)
  $('#pet-delete-modal').on('hidden.bs.modal', function () {
    $('#confirm-delete-pet').off('click')
  })
}

module.exports = {
  addPetHandlers
}
