'use strict'

import { apiBaseUrl } from 'app.config'

let email = ''
let password = ''

// RegEx to make sure that the email is valid
const emailExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

const requestLogin = async function (emailvalue, passwordvalue) {
  email = emailvalue
  password = passwordvalue

  // Remove possible whitespace from the email
  emailvalue = email.trim()

  // Validate form data before trying to log in
  validateForm()

  return login().then((token) => token)
}

const validateForm = function () {
  if (!email) {
    throw Error('empty_email')
  } else if (!emailExp.test(email)) {
    throw Error('invalid_email')
  } else if (!password) {
    throw Error('empty_password')
  }
}

const fetchServerLogin = async function () {
  // Fetch will throw an error if it fails,
  // this error is managed in the login-form
  // component algong with the rest of errors thrown outside of it
  return fetch(apiBaseUrl, {
    method: 'post',
    body: JSON.stringify({
      query: `mutation{ login(email: "${email}", password: "${password}") }`
    }),
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  }).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    } else {
      // Server reached but returned invalid response
      console.error(response.status)
      throw Error('invalid_server_response')
    }
  })
}

const login = async function () {
  return fetchServerLogin().then((result) => {
    if (result.data.login) {
      return result.data.login
    } else {
      // Tried login and got invalid or null token
      throw Error('invalid_credentials')
    }
  })
}

export {
  requestLogin
}
