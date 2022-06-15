import {defineStore} from 'pinia'

export const useStoreDisplay = defineStore('display', {
    state: () => {
        return {
            formsDisplayed: {
                dpia: false,
                legalPerson: false,
                ceo: false,
                dpo: false,
                purpose: false,
                dataCategory:false,
                subDataCategory:false,
                dataType:false,
                dataSubjectCategory:false,
                dataLocation:false,
                subDataLocation:false,
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
