import { AxiosError } from 'axios'
import { getReasonPhrase } from 'http-status-codes'

export default class ClockifyError extends Error {
  constructor(error: AxiosError) {
    let message
    console.error(error)
    const requestMethod = error.config.method?.toUpperCase()
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      const statusCode = error.response.status
      const data = error.response.data as any
      message = `Response Error[${requestMethod}:${statusCode}]: ${getReasonPhrase(
        statusCode
      )}. Message: ${data?.message}. Resource: ${data?.path}`
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      message = `Response Error[${requestMethod}]: ${JSON.stringify(
        error.request
      )}`
    } else {
      // Something happened in setting up the request and triggered an Error
      message = `Error: ${error.message}`
    }
    super(message)
  }
}
