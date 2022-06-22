import {defineStore} from 'pinia'
import processingRecord from '../data/template/ProcessingRecordTemplate.json'

export const useStoreData = defineStore('data', {
    state: () => {
        return {processingRecord}
    },
    getters: {
        uniqueDataCategories: (state) => getUniqueDataCategories(state),
        uniqueDataCategoriesWithPurposes: (state) => getUniqueDataCategoriesWithPurposes(state),
        uniqueDataTypes: (state) => getUniqueDataTypes(state),
        getPurposesByDataCategory: (state) => {
            return (dataCategory) => state.processingRecord.purposes.filter(purpose => {
                return purpose.dataCategories.find(e => e.name === dataCategory.name) !== undefined
            })
        }
    }
})

function getUniqueDataCategories(state) {
    const dataCategories = state.processingRecord.purposes.flatMap(e => e?.dataCategories)
    return [...new Map(dataCategories.map(e => [e['name'], e])).values()]
}

function getUniqueDataCategoriesWithPurposes(state) {
    const uniqueDataCategories = getUniqueDataCategories(state)
    uniqueDataCategories.forEach(e => e.purposes = [])
    state.processingRecord.purposes.forEach(purpose => {
        const currentDataCategories = purpose.dataCategories.map(e => e.name)
        uniqueDataCategories.forEach(dataCategory => {
            if (currentDataCategories.includes(dataCategory.name)) {
                dataCategory.purposes.push(purpose)
            }
        })
    })
    return uniqueDataCategories
}

function getUniqueDataTypes(state) {
    const dataTypes = getUniqueDataCategories(state).flatMap(dataCategory => dataCategory?.dataTypes)
    return [...new Map(dataTypes.map(e => [e['name'], e])).values()]
}
