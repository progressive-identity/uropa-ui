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
        allDataCategories: (state) => state.processingRecord.purposes.flatMap(e => e?.dataCategories),
        uniqueDataCategories: (state) => getUniqueDataCategories(state),
        uniqueDataTypes: (state) => getUniqueDataTypes(state)
    }
})

function getUniqueDataCategories(state) {
    const dataCategories = state.processingRecord.purposes.flatMap(e => e?.dataCategories)
    return [...new Map(dataCategories.map(e => [e['name'], e])).values()]
}

function getUniqueDataTypes(state) {
    const dataTypes = getUniqueDataCategories(state).flatMap(dataCategory => dataCategory?.dataTypes)
    return [...new Map(dataTypes.map(e => [e['name'], e])).values()]
}
