import {defineStore} from 'pinia'
import processingRecord from '../data/ProcessingRecordTemplate.json'
import purposeTemplate from '../data/PurposeTemplate.json'
import securityMeasureTemplate from '../data/SecurityMeasureTemplate.json'

export const useStoreData = defineStore('data', {
    state: () => {
        return {processingRecord, purposeTemplate, securityMeasureTemplate}
    }
})
