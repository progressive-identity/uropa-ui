import {defineStore} from 'pinia'
import processingRecord from '../../public/data/ProcessingRecordTemplate.json'

export const useStoreData = defineStore('data', {
    state: () => {
        return {processingRecord}
    },
})
