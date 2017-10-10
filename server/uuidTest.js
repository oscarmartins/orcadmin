const uuidv5 = require('uuid/v5')

// ... using predefined DNS namespace (for domain names) 
const secret = 'email_verificator'
const email = 'oscarrafaelcampos@gmail.com'

const test = uuidv5('{{email}}{{secret}}'.replace('{{email}}', email).replace('{{secret}}', secret), uuidv5.DNS)

console.log(test)
