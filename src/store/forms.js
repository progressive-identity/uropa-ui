import {defineStore} from 'pinia'
import securityMeasureTemplate from './../data/SecurityMeasureTemplate.json'

export const useStoreForms = defineStore('forms', {
    state: () => {
        return {
            ceoVisible: false,
            dpoVisible: false,
            purposeVisible: false,
            DPIAVisible: false,
            securityMeasureVisible: false,
            editSecurityMeasureData: securityMeasureTemplate
        }
    }
})
