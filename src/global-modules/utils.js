'use strict'

const validateEmpty = (string) => { return !(string.trim()) }

const validateEmail = (email) => {
  return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email)
}

const validateName = (name) => { return /^[a-zA-Z0-9]*$/i.test(name) }

export {
  validateEmpty,
  validateEmail,
  validateName
}
