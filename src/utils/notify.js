import ms from '../utils/messeging'
const notify = async (request) => {
  console.log('notifyyyyy')
  const data = await request
  if (data.status === true) {
    ms.successMessage(data.message)
  } else {
    ms.errorMessage(data.message)
    return false
  }
  return true
}

export default notify
