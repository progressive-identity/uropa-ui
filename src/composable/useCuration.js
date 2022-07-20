export function getCuratedRopa(ropa) {
  const clone = JSON.parse(JSON.stringify(ropa))
  curateRopa(clone)
  return clone
}

function curateRopa(ropa) {
  ropa.dataTransfers.forEach((e) =>
    curateRecipients(e.dataTransferLegalBasis.recipients)
  )
  ropa.recipients.dataProcessors.forEach((e) =>
    curateDataCategories(e.dataCategoriesDisclosed)
  )
  ropa.recipients.externalOrganizations.forEach((e) =>
    curateDataCategories(e.dataCategoriesDisclosed)
  )
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
  recipients.dataProcessors.forEach((e) => delete e.dataCategoriesDisclosed)
  recipients.externalOrganizations.forEach(
    (e) => delete e.dataCategoriesDisclosed
  )
  recipients.internalDepartments.forEach(
    (e) => delete e.dataCategoriesDisclosed
  )
}
