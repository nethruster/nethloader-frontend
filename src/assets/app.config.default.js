/**
 * Public graphql API endpoint
 * This is where the web UI will target all its queries.
 * If your public domain is https://i.domain.com then this setting should be https://i.domain.com/graphql
 */
const apiBaseUrl = 'http://localhost:4000/graphql'

/**
 * Public media path
 * This is where the web UI resolves all the media. It doesn't have to match your actual image folder, the server handles that. (See server config)
 * Adjust accordingly to the server config.
 * IMPORTANT: Has to preserve the last trailing slash
 */
const baseMediaPath = 'http://localhost:4000/media/'

/**
 * Public admin email
 * This email is provided on the login and 404 views. It is used as a means of contact between the user and the site administrator.
 */
const adminEmail = 'supportadmin@domain.com'
