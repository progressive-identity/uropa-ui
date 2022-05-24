import {defineStore} from 'pinia'

export const useStoreForms = defineStore('forms', {
    state: () => {
        return {
            ceoVisible: false,
            dpoVisible: false,
            purposeVisible: false,
            DPIAVisible: false
        }
    }
})
