'use strict'

/**
 * Returns false if a string is empty or just spaces
 * @param string str
 * @return boolean
 */
const validateEmpty = (str) => { return !(str.trim()) }

/**
 * Returns true if a string is validated by email regex
 * @param string email
 * @return boolean
 */
const validateEmail = (email) => {
  return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email)
}

/**
 * Returns true if a string is validated by alphanumeric only regex
 * @param string name
 * @return boolean
 */
const validateName = (name) => { return /^[a-zA-Z0-9]*$/i.test(name) }

/**
 * Adds a leading 0 if a number is less than 10
 * @param int number
 * @return int
 */
const pad = (number) => {
  return (number < 10) ? (`0${number}`) : number
}

export {
  validateEmpty,
  validateEmail,
  validateName,
  pad
}
