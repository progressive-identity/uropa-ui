import {ERROR_MESSAGES, isEMailValid, isEmpty} from '@/utils/validation.js'
import {useStoreData} from '@/store/data.js'

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
        if (!isEMailValid(state, value)) {
            writeError(state, ERROR_MESSAGES.EMPTY)
        }
    }
}

/**
 * Overwrite the cookie that contains the current processingRecord.
 */
function refreshCookies() {
    const storeData = useStoreData()
    $cookies.set('uropa_processing_record', storeData.processingRecord, '30d')
}

function writeError(state, errorMessage) {
    state.valid = false
    state.errors.push(errorMessage)
}
