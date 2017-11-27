const Handlebars = require('handlebars')

Handlebars.registerHelper('initialLetter', function (text) {
  console.log('text is ', text)
  return new Handlebars.SafeString(text.charAt(0))
})
