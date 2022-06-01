import {defineStore} from 'pinia'

export const useStoreDisplay = defineStore('display', {
    state: () => {
        return {
            formsDisplayed: {
                dpia: false,
                ceo: false,
                dpo: false,
                purpose: false,
                dataCategory:false,
                dataType:false,
                dataSubjectCategory:false,
                dataLocation:false,
                dataSource:false,
                storageDuration:false,
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
