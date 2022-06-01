import {defineStore} from 'pinia'

export const useStoreDisplay = defineStore('display', {
    state: () => {
        return {
            formsDisplayed: {
                DPIA: false,
                ceo: false,
                dpo: false,
                purpose: false,
                dataCategory:false,
                dataType:false,
                jointController: false,
                internalDepartment: false,
                externalOrganization: false,
                dataProcessor: false,
                securityMeasure: false,
                dataTransfer: false
            }
        }
    }
})
