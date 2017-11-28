const showPetsTemplate = require('../templates/pet-listing.handlebars')
const showPetTemplate = require('../templates/one-pet.handlebars')
const store = require('../store')
const showPetsDropdownTemplate = require('../templates/pets-dropdown.handlebars')
const showPetDropdownTemplate = require('../templates/pet-dropdown.handlebars')

const addPetSuccess = function (data) {
  console.log('pet success data is ', data)
  console.log('data.pets is ', data.pets)
  $('#get-pets').trigger('click')
  $('#add-pet-form').modal('hide')
  $('#add-pet')[0].reset()
  $('#appointment-list').hide()
  $('#pet-dropdown').hide()
}

const addPetFailure = function () {
  console.log('add Failure')
}

const getPetsSuccess = function (data) {
  data.pets.forEach(function (obj) {
    obj.letter = obj.name.charAt(0).toUpperCase()
  })
  const showPetsHtml = showPetsTemplate({ pets: data.pets })
  $('#pet-list').html(showPetsHtml)
  const showPetsDropdownHtml = showPetsDropdownTemplate({ pets: data.pets })
  $('#pets-dropdown').html(showPetsDropdownHtml)
  $('#pet-list').show()
  $('#pets-dropdown-link').show()
}

const deletePetSuccess = function () {
  $('#get-pets').trigger('click')
  $('#appointment-list').hide()
  $('#pet-dropdown').hide()
}

const getPetSuccess = function (data) {
  console.log('data is ', data)
  const showPetHtml = showPetTemplate(data)
  $('#pet-list').html(showPetHtml)
  store.pets = data.pet
  $('#get-appointments').trigger('click')
  $('#new-appointment').show()
  console.log('data is ', data)
  const showPetDropdownHtml = showPetDropdownTemplate(data)
  $('#pet-dropdown').html(showPetDropdownHtml)
  $('#pet-dropdown').show()
}

const updatePetSuccess = function (data) {
  $('#edit-pet-modal').modal('hide')
  $('#edit-pet-modal').on('hidden.bs.modal', function () {
    $(this).val('').end()
    // $('#update-pet')[0].reset()
    getPetSuccess(data)
  })
}

module.exports = {
  addPetSuccess,
  addPetFailure,
  getPetsSuccess,
  getPetSuccess,
  deletePetSuccess,
  updatePetSuccess
  // addPetFailure,
}
