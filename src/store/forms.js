import {defineStore} from 'pinia'

export const useStoreForms = defineStore('forms', {
    //TODO to rework
    state: () => {
        return {
            ceoVisible: false,
            dpoVisible: false,
            purposeVisible: false,
            DPIAVisible: false,
            securityMeasureVisible: false,
            internalDepartmentVisible: false,
            externalOrganizationVisible: false,
            dataProcessorVisible: false,
            dataTransferVisible: false
        }
    }
})
