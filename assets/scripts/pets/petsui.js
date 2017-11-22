const showPetsTemplate = require('../templates/pet-listing.handlebars')

const addPetSuccess = function (data) {
  console.log('pet success data is ', data)
  console.log('data.pets is ', data.pets)
  // window.setTimeout(function () {
  //   $('#add-message').fadeOut()
  // }, 3000)
}

const addPetFailure = function () {
  console.log('add Failure')
}

const getPetsSuccess = function (data) {
  const showPetsHtml = showPetsTemplate({ pets: data.pets })
  $('#pet-list').append(showPetsHtml)
}

module.exports = {
  addPetSuccess,
  addPetFailure,
  getPetsSuccess
  // addPetFailure,
}
