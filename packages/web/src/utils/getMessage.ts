import messages from '../config/messages.json'

const getMessage = (path: string): string | null => {
  return messages[path] || null
}

export default getMessage
