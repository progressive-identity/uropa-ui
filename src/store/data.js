import {defineStore} from 'pinia'
import ProcessingRecordTemplate from '../data/template/ProcessingRecordTemplate.json'

export const useStoreData = defineStore('data', {
    state: () => {
        return {processingRecord: structuredClone(ProcessingRecordTemplate)}
    },
    getters: {
        getUniqueDataCategories: (state) => getUniqueDataCategories(state),
        getUniqueDataTypes: (state) => getUniqueDataTypes(state),
        getUniqueDataLocations: (state) => getUniqueDataLocations(state),
        getPurposesByDataCategory: (state) => {
            return (dataCategory) => state.processingRecord.purposes.filter(purpose => {
                return purpose.dataCategories.find(e => e.name === dataCategory.name) !== undefined
            })
        },
        getDataTypesByDataLocation: (state) => {
            return (dataLocation) => state.processingRecord.purposes.flatMap(purpose => purpose?.dataCategories.flatMap(dataCategory => dataCategory?.dataTypes)).filter(dataType => {
                return dataType?.dataLocations.find(e => e?.dataSource.name === dataLocation?.dataSource.name) !== undefined
            })
        }
    }
})

function getUniqueDataCategories(state) {
    const dataCategories = state.processingRecord.purposes.flatMap(purpose => purpose?.dataCategories)
    return [...new Map(dataCategories.map(e => [e['name'], e])).values()]
}

function getUniqueDataTypes(state) {
    const dataTypes = getUniqueDataCategories(state).flatMap(dataCategory => dataCategory?.dataTypes)
    return [...new Map(dataTypes.map(e => [e['name'], e])).values()]
}

function getUniqueDataLocations(state) {
    const dataLocations = getUniqueDataTypes(state).flatMap(dataType => dataType?.dataLocations)
    return [...new Map(dataLocations.map(e => [e?.dataSource['name'], e])).values()]
}
