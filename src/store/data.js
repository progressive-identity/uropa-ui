import {defineStore} from 'pinia'
import processingRecord from '../data/template/ProcessingRecordTemplate.json'
import purposeTemplate from '../data/template/PurposeTemplate.json'
import securityMeasureTemplate from '../data/template/SecurityMeasureTemplate.json'
import predefinedDataCategories from '../data/dataCategories.json'

export const useStoreData = defineStore('data', {
    state: () => {
        return {processingRecord, purposeTemplate, securityMeasureTemplate, predefinedDataCategories}
    },
    getters: {
        dataCategories: (state) => state.processingRecord.purposes.flatMap(e => e?.dataCategories),
        dataTypes: (state) => state.processingRecord.purposes.flatMap(e => e?.dataCategories.flatMap(e => e?.dataTypes)),
        dataTypesForDataLocation: (state) =>
            state.processingRecord.purposes.flatMap(purpose =>
                purpose?.dataCategories.flatMap(dataCategory =>
                    dataCategory?.dataTypes.map(dataType => {
                        return {name: `${purpose.name} -> ${dataCategory.name} -> ${dataType.name}`}
                    })
                )
            )
    }
})
