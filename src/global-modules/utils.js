import {checkCurrentSessionToken} from 'serverAPI/authentication'

const supportedVideoFormats = ['video/mp4', 'video/webm', 'video/ogg', 'application/ogg']
const supportedMimeTypes = [...supportedVideoFormats, 'image/png', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp']
const imageExtensions = ['"png"', '"jpg"', '"jpeg"', '"gif"', '"svg"', '"webp"', '"image/svg+xml"']
const videoExtensions = ['"mp4"', '"webm"', '"ogg"']

const mediaExtensions = {
  'image': [
    ...imageExtensions
  ],
  'video': [
    ...videoExtensions
  ]
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
  return supportedVideoFormats.includes(type)
}

/**
 * Return true if a format is valid
 * @param string type
 * @return boolean
 */
const isValidFormat = (type) => {
  return supportedMimeTypes.includes(type)
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
    let securityTest = window.localStorage // eslint-disable-line no-unused-vars
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
  mediaExtensions,
  isFiltered,
  checkBrowserIntegrity
}
