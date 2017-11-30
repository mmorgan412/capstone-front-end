const showPetsTemplate = require('../templates/pet-listing.handlebars')
const showPetTemplate = require('../templates/one-pet.handlebars')
const store = require('../store')
const showPetsDropdownTemplate = require('../templates/pets-dropdown.handlebars')
const showPetDropdownTemplate = require('../templates/pet-dropdown.handlebars')
const showPetsMessageTemplate = require('../templates/landing-page.handlebars')

const addPetSuccess = function (data) {
  $('#get-pets').trigger('click')
  $('#add-pet-form').modal('hide')
  $('#add-pet')[0].reset()
  $('#appointment-list').hide()
  $('#pet-dropdown').hide()
  $('#add-pet-fail-message').hide()
  $('#show-one-pet').hide()
  $('#new-appointment').hide()
}

const addPetFailure = function () {
  $('#add-pet-fail-message').show()
  $('#add-pet-fail-message').text('There was an issue adding your pet.  Please try again.')
}

const getPetsSuccess = function (data) {
  $('#pet-list').show()
  $('#pets-dropdown-link').show()
  $('#landing-page-message').show()
  const showPetsDropdownHtml = showPetsDropdownTemplate({ pets: data.pets })
  $('#pets-dropdown').html(showPetsDropdownHtml)
  const showPetsHtml = showPetsTemplate({ pets: data.pets })
  $('#pet-list').html(showPetsHtml)
  const noPets = 'Welcome!  Add a pet to start!'
  const hasPets = ''
  if (data.pets.length === 0) {
    const showPetsMessageHtml = showPetsMessageTemplate({message: noPets})
    $('#landing-page-message').html(showPetsMessageHtml)
  } else {
    const showPetsMessageHtml = showPetsMessageTemplate({message: hasPets})
    $('#landing-page-message').html(showPetsMessageHtml)
    data.pets.forEach(function (obj) {
      obj.letter = obj.name.charAt(0).toUpperCase()
    })
    const showPetsHtml = showPetsTemplate({ pets: data.pets })
    $('#pet-list').html(showPetsHtml)
  }
}

const deletePetSuccess = function () {
  $('#get-pets').trigger('click')
  $('#appointment-list').hide()
  $('#pet-dropdown').hide()
  $('#show-one-pet').hide()
  $('#new-appointment').hide()
}

const deletePetFailure = function () {
  console.log('error with deletePet')
}

const getPetSuccess = function (data) {
  const showPetHtml = showPetTemplate(data)
  $('#show-one-pet').show()
  $('#show-one-pet').html(showPetHtml)
  store.pets = data.pet
  $('#get-appointments').trigger('click')
  $('#new-appointment').show()
  const showPetDropdownHtml = showPetDropdownTemplate(data)
  $('#pet-dropdown').html(showPetDropdownHtml)
  $('#pet-dropdown').show()
  $('#landing-page-message').hide()
  $('#pet-list').hide()
}

const updatePetSuccess = (data) => {
  $('#edit-pet-fail-message').hide()
  $('#edit-pet-modal').modal('hide')
  $('#edit-pet-modal').on('hidden.bs.modal', function () {
    $(this).val('').end()
  })
  return data
}

const updatePetFailure = function () {
  $('#edit-pet-fail-message').show()
  $('#edit-pet-fail-message').text('Sorry there was an issue updating your pet.  Please try again.')
}

const getPetsFailure = function () {
  console.log('error with getPets', getPetsFailure)
}

module.exports = {
  addPetSuccess,
  addPetFailure,
  getPetsSuccess,
  getPetSuccess,
  getPetsFailure,
  deletePetSuccess,
  deletePetFailure,
  updatePetSuccess,
  updatePetFailure
}
