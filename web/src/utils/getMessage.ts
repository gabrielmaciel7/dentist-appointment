// @ts-nocheck

import messages from '../config/messages.json'

const getMessage = (path: string): string => {
  return messages[path] || 'Unknown error.'
}

export default getMessage
