import {ERROR_MESSAGES, isEMailValid, isEmpty} from '@/utils/validation.js'

export function validate(state, props, value) {
    state.valid = true
    state.errors = []
    if (props.required) {
        if (isEmpty(value)) {
            writeError(state, ERROR_MESSAGES.EMPTY)
        }
    }

    if (state.valid && props.type === 'email') {
        if (!isEMailValid(state, value)) {
            writeError(state, ERROR_MESSAGES.EMPTY)
        }
    }
}

function writeError(state, errorMessage) {
    state.valid = false
    state.errors.push(errorMessage)
}
