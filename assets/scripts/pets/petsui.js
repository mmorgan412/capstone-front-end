const showPetsTemplate = require('../templates/pet-listing.handlebars')
const showPetTemplate = require('../templates/one-pet.handlebars')
const store = require('../store')

const addPetSuccess = function (data) {
  console.log('pet success data is ', data)
  console.log('data.pets is ', data.pets)
  $('#get-pets').trigger('click')
  $('#add-pet-form').modal('hide')
  $('#add-pet')[0].reset()
  // window.setTimeout(function () {
  //   $('#add-message').fadeOut()
  // }, 3000)
}

const addPetFailure = function () {
  console.log('add Failure')
}

const getPetsSuccess = function (data) {
  // console.log('data is ', data)
  // data.pets.forEach(function (obj) {
  //   console.log('obj is ', obj)
  //   obj.letter = obj.pets.name.charAt(0)
  // })
  // console.log('getpetssuccess data is ', data)
  // const newData = []
  // for (let i = 0; i < data.pets.length; i++) {
  //   newData.push(data.pets[i].name.charAt(0).toUpperCase())
  // }
  const showPetsHtml = showPetsTemplate({ pets: data.pets })
  $('#pet-list').html(showPetsHtml)
}

// { letters: newData },

const deletePetSuccess = function () {
  $('#get-pets').trigger('click')
}

const getPetSuccess = function (data) {
  console.log('data is ', data)
  const showPetHtml = showPetTemplate(data)
  $('#pet-list').html(showPetHtml)
  store.pets = data.pet
  console.log(data.pet)
  console.log(store.pets)
}

const updatePetSuccess = function (data) {
  $('#edit-pet-modal').modal('hide')
  $('#update-pet')[0].reset()
  getPetSuccess(data)
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
