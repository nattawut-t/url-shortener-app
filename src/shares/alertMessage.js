import Alert from 'react-s-alert'

const alertMessage = (text, type) => {
  switch (type) {
    case 'error':
      return Alert.error(text, {
        effect: 'slide',
      })
    default:
      return Alert.info(text, {
        effect: 'slide',
      })
  }
}

export default alertMessage
