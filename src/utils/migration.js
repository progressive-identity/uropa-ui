// This file manage the process of updating the content of an old Uropa file  to be in concordance with the latest version
import packageJson from '../../package.json'

/**
 * Migrate the file to the current version
 * @param ropa the json file to migrate
 */
export async function migrateUropaFile(ropa) {
  const { uropaVersion } = ropa
  if (uropaVersion !== packageJson.version) {
    if (uropaVersion === '1.0.0') {
      from100To110(ropa)
    }
  }
  console.log('123', ropa)
}

/**
 * Migration of Uropa file from version v1.0.0 to a file of version v1.1.0
 * @param ropa the json file to migrate
 */
function from100To110(ropa) {
  ropa.uropaVersion = '1.1.0'

  // change of naming
  ropa.dataController = ropa.legalEntity
  delete ropa.legalEntity

  // adding a new field on eventType
  function updateEventType(eventType) {
    if (eventType.countdown.duration > 0) {
      eventType.triggerType = 'countdown'
    } else {
      eventType.triggerType = 'no countdown'
    }
  }

  ropa.purposes.forEach((purpose) =>
    purpose.dataCategories.forEach((dataCategory) => {
      dataCategory.dataTypes.forEach((dataType) => {
        dataType.storageLocations.forEach((storageLocation) => {
          storageLocation.storageDurations.forEach((storageDuration) => {
            updateEventType(storageDuration.startEvent)
            updateEventType(storageDuration.stopEvent)
            updateEventType(storageDuration.interruptEvent)
          })
        })
      })
    })
  )
  ropa.purposes.forEach((purpose) => {
    delete purpose.legalBasis
    purpose.legalBases.forEach((legalBasis) => {
      updateEventType(legalBasis.startValidity)
      updateEventType(legalBasis.stopValidity)
    })
  })
}
