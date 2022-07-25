export function getCuratedRopa(ropa) {
  const clone = JSON.parse(JSON.stringify(ropa))
  curateRopa(clone)
  return clone
}

function curateRopa(ropa) {
  curateLegalEntity(ropa.dataController)
  if (ropa.representative.name.length === 0) {
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
