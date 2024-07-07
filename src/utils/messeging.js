import { useNotification } from "@kyvg/vue3-notification";

const { notify }  = useNotification()
const ms = {
  successMessage: (txt) => {
    notify({
      group: 'all',
      text: txt,
      type: 'success'
    })
  },
  errorMessage: (txt) => {
    notify({
      group: 'all',
      text: txt,
      type: 'error'
    })
  },
  notify: (title, text) => {
    notify({
      group: 'notification',
      title: title,
      text: text,
      type: 'warn'
    })
  }
}

// Vue.prototype.$ms = ms
export default ms
