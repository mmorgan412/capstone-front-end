const Handlebars = require('handlebars')

Handlebars.registerHelper('initialLetter', function (text) {
  return new Handlebars.SafeString(text.charAt(0))
})
