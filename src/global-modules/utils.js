'use strict'
import { logoutUserNoHistory, checkCurrentSessionToken } from 'serverAPI/authentication'

const supportedVideoFormats = ['video/mp4', 'video/webm', 'video/ogg']
const supportedMimeTypes = [...supportedVideoFormats, 'image/png', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif']

/**
 * Returns true if a string is empty or just spaces
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
 * Returns true if a string is valid towards alphanumeric only regex
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

const copyToClipboard = (event) => {
  let textArea = document.createElement('textarea')

  textArea.style.position = 'absolute'
  textArea.style.pointerEvents = 'none'
  textArea.style.zIndex = '-5'
  textArea.value = event.currentTarget.dataset.copytext

  document.body.append(textArea)

  textArea.select()
  document.execCommand('copy')
  textArea.remove()
}

/**
 * Return true if current unix time is smaller than the token's expiry date
 * @param int tokenExpDate
 * @return boolean
 */
const checkTokenExpiryDate = async (tokenExpDate) => {
  return Math.floor((new Date()).getTime() / 1000) < tokenExpDate
}

/**
 * Return formated date (DD/MM/YYY) from a given unix time value
 * @param int date
 * @return string
 */
const computeDate = (date) => {
  let dateObj = new Date(date)

  // Note: We add 1 to the month because months are counted from 0
  return `${pad(dateObj.getDate())}-${pad(dateObj.getMonth() + 1)}-${dateObj.getFullYear()}`
}

/**
 * Return formated time (HH:mm) from a given unix time value
 * @param int date
 * @return string
 */
const computeTime = (date) => {
  let dateObj = new Date(date)

  return `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`
}

/**
 * Return the time zone offset from a given unix time value
 * @param int date
 * @return string
 */
const computeDateFormat = (date) => {
  let dateObj = new Date(date)

  return `DD/MM/YYY GMT${dateObj.getTimezoneOffset() / 60}`
}

/**
 * Return true if a video format is valid
 * @param string type
 * @return boolean
 */
const isValidVideoFormat = (type) => {
  return supportedVideoFormats.includes(type)
}

/**
 * Return true if a a format is valid
 * @param string type
 * @return boolean
 */
const isValidFormat = (type) => {
  return supportedMimeTypes.includes(type)
}

const checkUserSessionValidity = async (token, tokenExp) => {
  return checkCurrentSessionToken(token).then(async (result) => {
    if (await result) {
      return !!checkTokenExpiryDate(tokenExp)
    } else {
      return false
    }
  })
}

export {
  validateEmpty,
  validateEmail,
  validateName,
  pad,
  copyToClipboard,
  checkTokenExpiryDate,
  computeDate,
  computeTime,
  computeDateFormat,
  isValidVideoFormat,
  isValidFormat,
  checkUserSessionValidity
}
