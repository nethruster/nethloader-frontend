import {checkCurrentSessionToken} from 'serverAPI/authentication'

const storageParams = JSON.parse(window.localStorage.getItem('neth-strData')) // Storage data

const imageExtensions = storageParams.supportedImageExtensions || ['png', 'jpg', 'jpeg', 'svg', 'webp']
const videoExtensions = storageParams.supportedVideoExtensions || ['mp4', 'ogg', 'webm', 'gif']

// List of extensions we can't process to create a thumbnail
const unprocessableExtensions = storageParams.unprocessableExtensions || ['webp', 'webm', 'svg']

const supportedExtensions = [...imageExtensions, ...videoExtensions]

// Useful lists to filter media by type, must contain quoted items
const filterExtensions = {
  'image': imageExtensions.map(ext => `"${ext}"`),
  'video': videoExtensions.map(ext => `"${ext}"`)
}

const baseParams = {
  mediaLimit: 10,
  type: '',
  afterDate: '',
  beforeDate: ''
}

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

/**
 * Copy a string to the clipboard
 * @param onClickEvent event
 */
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
const checkTokenExpiryDate = (tokenExpDate) => {
  return Math.floor(new Date().getTime() / 1000) < tokenExpDate
}

/**
 * Return formated date (DD-MM-YYY) from a given unix time value
 * @param string date
 * @return string
 */
const computeDate = (date) => {
  let dateObj = new Date(date)

  // Note: We add 1 to the month because months are counted from 0
  return `${pad(dateObj.getDate())}-${pad(dateObj.getMonth() + 1)}-${dateObj.getFullYear()}`
}

/**
 * Return formated time (HH:mm) from a given unix time value
 * @param string date
 * @return string
 */
const computeTime = (date) => {
  let dateObj = new Date(date)

  return `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`
}

/**
 * Return the time zone offset from a given unix time value
 * @param string date
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
  return videoExtensions.includes(type)
}

/**
 * Return true if a format is valid
 * @param string type
 * @return boolean
 */
const isValidFormat = (type) => {
  return supportedExtensions.includes(type)
}

/**
 * Return true if the user session token is correct and hasn't expired
 * @param string token
 * @param int tokenExp
 * @return boolean
 */
const checkUserSessionValidity = async (token, tokenExp) => {
  if (await checkCurrentSessionToken(token)) {
    return !!checkTokenExpiryDate(tokenExp)
  }

  return false
}

/**
 * Return media list page number (factor) from url path
 * @param object router
 * @return int
 */
const getPageFactor = (router) => {
  let pageFactor = router.route.match.params.pageFactor

  return pageFactor > 0 ? (Number(pageFactor) - 1) : 0
}

/**
 * Compare a default params object towards a given params
 * object and return true if they are different.
 * @param object params
 * @return boolean
 */
const isFiltered = (params) => {
  for (let key in baseParams) {
    if (baseParams[key] != params[key]) { // It's important to allow coercion here, values may have been transformed to other types
      return true
    }
  }

  return false
}

// Simple feature check to prevent some browsers from hurting themselves and others around them
const checkBrowserIntegrity = () => {
  // Private mode (localstorage, sessionStorage... access) detection
  try {
    let localStTest = window.localStorage // eslint-disable-line no-unused-vars
    let sessionStTest = window.sessionStorage // eslint-disable-line no-unused-vars
  } catch (err) {
    console.warn('Nethloader relies heavily on browser data APIs like localStorage, sessionStorage, please enable them to use the app.')
    throw Error('Nethloader relies heavily on browser data APIs, please enable cookies and browser data to enjoy the app properly.')
  }

  // Required ES6 API detection
  try {
    let promiseTest = Promise // eslint-disable-line no-unused-vars
    let fetchTest = fetch // eslint-disable-line no-unused-vars
  } catch (err) {
    console.error('This browser doesn\'t support Promises or any ES6 new syntax and features. Consider upgrading.')
    throw Error('this browser doesn\'t support required web technology. Consider upgrading to a newer browser like Google Chrome, Firefox or MS Edge.')
  }
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
  checkUserSessionValidity,
  getPageFactor,
  filterExtensions,
  unprocessableExtensions,
  isFiltered,
  checkBrowserIntegrity
}
