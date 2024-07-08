import ms from '../utils/messeging'
const notify = async (request) => {
  const data = await request
  if (data.status === true || data.success == true) {
    ms.successMessage(data.message)
  } else {
    if (data.errors) {
      for (const [key, messages] of Object.entries(data.errors)) {
        console.log(key);
        messages.forEach(message => {
          if (message.includes('.en')) {
            message = message.replace('.en', ' in english');
          }
          if (message.includes('.ar')) {
            message = message.replace('.ar', ' in arabic');
          }
          ms.errorMessage(message);
        });
      }
    } else {
      ms.errorMessage(data.message);
    }
  }
  return true
}

export default notify
