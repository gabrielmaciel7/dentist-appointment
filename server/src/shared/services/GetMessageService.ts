import { ValidationError } from '@hapi/joi'

import messages from '@config/messages.json'

const getMessage = (path: string): string | null => {
  return messages[path] || null
}

export const getValidatorError = (
  error: ValidationError,
  messagePath: string
): string => {
  if (!error) return null

  let errorMessage = ''

  const message = error.details[0].message
  const type = error.details[0].type
  const key = error.details[0].context.key

  const path = `${messagePath}.${key}.${type}`

  const customMessage = getMessage(path)

  // find path for create custom message
  if (!customMessage) {
    console.log('customMessage not found for path.', path)
  }

  errorMessage = customMessage || message

  return errorMessage
}

export default getMessage
