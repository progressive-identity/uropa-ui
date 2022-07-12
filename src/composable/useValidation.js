import { ERROR_MESSAGES, isEMailValid, isEmpty } from '@/utils/validation.js'
import { useStoreData } from '@/store/data.js'

export function validate(state, props, value) {
  refreshCookies()

  state.valid = true
  state.errors = []
  if (props.required) {
    if (isEmpty(value)) {
      writeError(state, ERROR_MESSAGES.EMPTY)
    }
  }
  if (state.valid && props.type === 'email') {
    if (!isEMailValid(value)) {
      writeError(state, ERROR_MESSAGES.EMAIL)
    }
  }
}

/**
 * Overwrite the cookie that contains the current ropa.
 */
function refreshCookies() {
  const storeData = useStoreData()
  $cookies.set('uropa_ropa', storeData.ropa, '30d')
}

function writeError(state, errorMessage) {
  state.valid = false
  state.errors.push(errorMessage)
}
