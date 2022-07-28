// FIXME I'm not sure this file should be in composable
export function getCuratedRopa(ropa) {
  const clone = JSON.parse(JSON.stringify(ropa))
  curateRopa(clone)
  return clone
}

function curateRopa(ropa) {
  curateLegalEntity(ropa.dataController)
  if (ropa.representative && ropa.representative.name.length === 0) {
    delete ropa.representative
  } else {
    curateLegalEntity(ropa.representative)
  }
  ropa.dataTransfers.forEach((e) =>
    curateRecipients(e.dataTransferLegalBasis.recipients)
  )
  ropa.recipients.dataProcessors.forEach((e) => {
    curateDataCategories(e.dataCategoriesDisclosed)
    curateLegalEntity(e.legalEntity)
  })
  ropa.recipients.externalOrganizations.forEach((e) => {
    curateDataCategories(e.dataCategoriesDisclosed)
    curateLegalEntity(e.legalPerson)
  })
  ropa.recipients.internalDepartments.forEach((e) =>
    curateDataCategories(e.dataCategoriesDisclosed)
  )
  ropa.purposes.forEach((purpose) =>
    purpose.legalBases.forEach((legalBasis) => {
      curateEventType(legalBasis.startValidity)
      curateEventType(legalBasis.stopValidity)
    })
  )
  // FIXME too many loops
  ropa.purposes.forEach((purpose) =>
    purpose.dataCategories.forEach((dataCategory) => {
      dataCategory.dataTypes.forEach((dataType) => {
        dataType.storageLocations.forEach((storageLocation) => {
          storageLocation.storageDurations.forEach((storageDuration) => {
            curateEventType(storageDuration.startEvent)
            curateEventType(storageDuration.stopEvent)
            curateEventType(storageDuration.interruptEvent)
          })
        })
      })
    })
  )
}

export function curateDataCategories(dataCategories) {
  dataCategories.forEach((dataCategory) => {
    delete dataCategory.dataTypes
    delete dataCategory.dataSubjectCategories
  })
}

export function curateRecipients(recipients) {
  recipients.dataProcessors.forEach((e) => {
    delete e.dataCategoriesDisclosed
    curateLegalEntity(e.legalEntity)
  })
  recipients.externalOrganizations.forEach((e) => {
    delete e.dataCategoriesDisclosed
    curateLegalEntity(e.legalPerson)
  })
  recipients.internalDepartments.forEach(
    (e) => delete e.dataCategoriesDisclosed
  )
}

export function curateLegalEntity(legalEntity) {
  if (!legalEntity) return
  if (
    legalEntity.ceo &&
    legalEntity.ceo.personalInformation.firstName.length === 0
  ) {
    delete legalEntity.ceo
  }
  if (
    legalEntity.dpo &&
    legalEntity.dpo.personalInformation.firstName.length === 0
  ) {
    delete legalEntity.dpo
  } else {
    if (legalEntity.dpo && legalEntity.dpo.status === 'internal') {
      delete legalEntity.dpo.postalAddress
    }
  }
}

export function curateEventType(eventType) {
  if (eventType?.triggerType === 'no countdown') {
    delete eventType.triggerType
  }
}
