import { apiBaseUrl } from 'app.config'

// RegEx to make sure that the email is valid
const emailExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

const validateForm = function (email, password) {
  if (!email) {
    throw Error('empty_email')
  } else if (!emailExp.test(email)) {
    throw Error('invalid_email')
  } else if (!password) {
    throw Error('empty_password')
  }
}

const requestLogin = async function (email, password) {
  // Remove possible whitespace on the email
  email = email.trim()

  // Validate form data before trying to log in
  validateForm(email, password)

  return login(email, password).then((token) => token)
}

const login = async function (email, password) {
  // Fetch will throw an error if it fails,
  // this error is managed in the login-form
  // component algong with the rest of errors
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
      return response.json().then((result) => {
        if (result.data.login) {
          return result.data.login
        } else {
          // Tried login and got invalid or null token
          throw Error('invalid_credentials')
        }
      })
    } else {
      // Server reached but returned invalid response
      console.error(response.status)
      throw Error('invalid_server_response')
    }
  })
}

export {
  requestLogin
}
