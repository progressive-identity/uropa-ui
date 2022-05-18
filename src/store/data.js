import {defineStore} from 'pinia'
import processingRecord from '../data/ProcessingRecordTemplate.json'

export const useStoreData = defineStore('data', {
    state: () => {
        return {processingRecord}
    }
})
