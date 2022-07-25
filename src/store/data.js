import { defineStore } from 'pinia'
import RopaTemplate from '@/data/template/RopaTemplate.json'

const ropa = JSON.parse(JSON.stringify(RopaTemplate))

export const useStoreData = defineStore('data', {
  state: () => {
    return { ropa }
  },
  getters: {
    getUniqueDataCategories: (state) => getUniqueDataCategories(state),
    getUniqueDataTypes: (state) => getUniqueDataTypes(state),
    getUniqueDataLocations: (state) => getUniqueDataLocations(state),
    getPurposesByDataCategory: (state) => {
      return (dataCategory) =>
        state.ropa.purposes.filter((purpose) => {
          return (
            purpose.dataCategories.find((e) => e.name === dataCategory.name) !==
            undefined
          )
        })
    },
    getDataTypesByDataLocation: (state) => {
      return (storageLocation) =>
        state.ropa.purposes
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
        state.ropa?.purposes.find((e) => e.isMain && purpose.name !== e.name)
    }
  }
})

function getUniqueDataCategories(state) {
  const dataCategories = state.ropa.purposes.flatMap(
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
