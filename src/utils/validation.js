export async function isFormValid() {
    if (process.env.VUE_APP_DEBUG && JSON.parse(process.env.VUE_APP_DEBUG)) return true
    // TODO maybe use $refs https://vuejs.org/guide/essentials/template-refs.html#ref-on-component
    const elements = document.querySelectorAll('input')
    await elements.forEach(e => e.dispatchEvent(new Event('change')))
    return !document.getElementById('error')
}

export function isEmpty(value) {
    return !(!value || value.length === 0)
}

export function isEMailValid(email) {
    // TODO review this regexp
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

}

export const ERROR_MESSAGES = {
    EMPTY: 'This field cannot be empty',
    EMAIL: 'The email is not valid'
}
