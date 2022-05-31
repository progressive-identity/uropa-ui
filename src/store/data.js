import {defineStore} from 'pinia'
import processingRecord from '../data/template/ProcessingRecordTemplate.json'
import purposeTemplate from '../data/template/PurposeTemplate.json'
import securityMeasureTemplate from '../data/template/SecurityMeasureTemplate.json'

export const useStoreData = defineStore('data', {
    state: () => {
        return {processingRecord, purposeTemplate, securityMeasureTemplate}
    },
    getters: {
        dataCategories: (state) => state.processingRecord.purposes.flatMap(e => e?.dataCategories)
    }
})
