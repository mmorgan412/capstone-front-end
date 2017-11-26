'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const petsApi = require('./petsapi')
const petsUi = require('./petsui')
// const store = require('./../store.js')

const onAddPet = function (event) {
  console.log(event)
  event.preventDefault()
  const data = getFormFields(this)
  petsApi.createPet(data)
    .then(petsUi.addPetSuccess)
    .catch(petsUi.addPetFailure)
}

// const addPetDisplay = function () {
// }

const onGetPets = function (event) {
  event.preventDefault()
  petsApi.getPets()
    .then(petsUi.getPetsSuccess)
    // .then(onDeletePet)
    // .then(onUpdatePet)
    // .then(onEditPet)
    .then(onGetPet)
    .catch(petsUi.getPetsFailure)
}

const onGetPet = function (event) {
  $('.numberCircle').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    petsApi.getPet(index)
      .then(petsUi.getPetSuccess)
      .catch(petsUi.getPetFailure)
  })
}

//
// const onDeletePet = () => {
//   $('.remove').on('click', function (event) {
//     const index = $(event.target).attr('data-id')
//     petsApi.deletePet(index)
//       .then(petsUi.deletePetSuccess)
//       .then(() => {
//         $(event.target).parent().parent().hide()
//       })
//       .catch(petsUi.deletePetFailure)
//   })
// }
//
// const onEditPet = () => {
//   $('.edit').on('click', function (event) {
//     $('#add-pet-div').hide()
//     $('#add-pet-button').show()
//     const index = $(event.target).attr('data-id')
//     petsApi.getPet(index).then(function (data) {
//       const petName = data.pet.name
//       const licenseNumber = data.pet.license_number
//       const breed = data.pet.breed
//       const insuranceInfo = data.pet.insurance_info
//       const vet = data.pet.vet
//       const id = data.pet.id
//       store.petId = data.pet.id
//       $('data-index').val(id)
//       $("input[name='pet[name]'").val(petName)
//       $("input[name='pet[license]'").val(licenseNumber)
//       $("select[name='pet[breed]'").val(breed)
//       $("select[name='pet[insurance]'").val(insuranceInfo)
//       $("select[name='vet']'").val(vet)
//     })
//   })
// }
//
// const onUpdatePet = () => {
//   $('#update-pet').on('submit', function (event) {
//     event.preventDefault()
//     const data = getFormFields(this)
//     petsApi.updatePet(data, store.petId)
//       .then(petsUi.updatePetSuccess)
//       .catch(petsUi.updatePetFailure)
//     $('#pet-list').show()
//   })
// }

// const searchPets = (event) => {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   petsApi.searchPets(data.pet.rating)
//     .then(petsUi.searchPetsSuccess)
//     .then(deletePet)
//     .then(editPet)
//     .then(updatePet)
//     .catch(petsUi.searchPetsFailure)
// }

const addPetHandlers = function () {
  $('#add-pet').on('submit', onAddPet)
  $('#get-pets').on('click', onGetPets)
  $('#get-pet').on('click', onGetPet)
}

module.exports = {
  addPetHandlers
}
