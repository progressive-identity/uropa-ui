import { defineStore } from 'pinia'
import RopaTemplate from '../data/template/RopaTemplate.json'

export const useStoreData = defineStore('data', {
  state: () => {
    return { processingRecord: structuredClone(RopaTemplate) }
  },
  getters: {
    getUniqueDataCategories: (state) => getUniqueDataCategories(state),
    getUniqueDataTypes: (state) => getUniqueDataTypes(state),
    getUniqueDataLocations: (state) => getUniqueDataLocations(state),
    getPurposesByDataCategory: (state) => {
      return (dataCategory) =>
        state.processingRecord.purposes.filter((purpose) => {
          return (
            purpose.dataCategories.find((e) => e.name === dataCategory.name) !==
            undefined
          )
        })
    },
    getDataTypesByDataLocation: (state) => {
      return (storageLocation) =>
        state.processingRecord.purposes
          .flatMap((purpose) =>
            purpose?.dataCategories.flatMap(
              (dataCategory) => dataCategory?.dataTypes
            )
          )
          .filter((dataType) => {
            return (
              dataType?.storageLocations.find(
                (e) => e?.dataCarrier.name === storageLocation?.dataCarrier.name
              ) !== undefined
            )
          })
    },
    getOtherMainPurpose: (state) => {
      return (purpose) =>
        state.processingRecord?.purposes.find(
          (e) => e.isMain && purpose.name !== e.name
        )
    }
  }
})

function getUniqueDataCategories(state) {
  const dataCategories = state.processingRecord.purposes.flatMap(
    (purpose) => purpose?.dataCategories
  )
  return [...new Map(dataCategories.map((e) => [e['name'], e])).values()]
}

function getUniqueDataTypes(state) {
  const dataTypes = getUniqueDataCategories(state).flatMap(
    (dataCategory) => dataCategory?.dataTypes
  )
  return [...new Map(dataTypes.map((e) => [e['name'], e])).values()]
}

function getUniqueDataLocations(state) {
  const storageLocations = getUniqueDataTypes(state).flatMap(
    (dataType) => dataType?.storageLocations
  )
  return [
    ...new Map(
      storageLocations.map((e) => [e?.dataCarrier['name'], e])
    ).values()
  ]
}
