import RopaTemplate from '@/data/template/RopaTemplate.json'
import packageJson from '../../package.json'
import LegalEntityTemplate from '@/data/template/data-controllers/LegalEntityTemplate.json'
import PostalAddressTemplate from '@/data/template/data-controllers/PostalAddressTemplate.json'
import PersonalInformationTemplate from '@/data/template/data-controllers/PersonalInformationTemplate.json'
import LegalBasisTemplate from '@/data/template/purposes/LegalBasisTemplate.json'
import DataProcessorTemplate from '@/data/template/recipients/DataProcessorTemplate.json'
import DataCategoryTemplate from '@/data/template/data-categories/DataCategoryTemplate.json'
import DataTypeTemplate from '@/data/template/data-categories/DataTypeTemplate.json'
import DataSubjectCategoryTemplate from '@/data/template/data-categories/DataSubjectCategoryTemplate.json'
import StorageLocationTemplate from '@/data/template/data-categories/StorageLocationTemplate.json'
import StorageDurationTemplate from '@/data/template/data-categories/StorageDurationTemplate.json'
import DataCarrierTemplate from '@/data/template/data-categories/DataCarrierTemplate.json'
import EventTypeTemplate from '@/data/template/EventTypeTemplate.json'
import ExternalOrganizationTemplate from '@/data/template/recipients/ExternalOrganizationTemplate.json'
import CeoTemplate from '@/data/template/data-controllers/CeoTemplate.json'
import DpoTemplate from '@/data/template/data-controllers/DpoTemplate.json'
import JointDataControllerTemplate from '@/data/template/data-controllers/JointDataControllerTemplate.json'

/**
 * TODO
 */
export function prepareTemplates() {
  // data-categories
  StorageLocationTemplate.dataCarrier = JSON.parse(
    JSON.stringify(DataCarrierTemplate)
  )
  StorageDurationTemplate.startEvent = JSON.parse(
    JSON.stringify(EventTypeTemplate)
  )
  StorageDurationTemplate.stopEvent = JSON.parse(
    JSON.stringify(EventTypeTemplate)
  )
  // TODO interruptEvent should be an array
  StorageDurationTemplate.interruptEvent = JSON.parse(
    JSON.stringify(EventTypeTemplate)
  )

  // a data category has at least on data type
  DataCategoryTemplate.dataTypes.push(
    JSON.parse(JSON.stringify(DataTypeTemplate))
  )
  // a data category has at least on data subject category
  DataCategoryTemplate.dataSubjectCategories.push(
    JSON.parse(JSON.stringify(DataSubjectCategoryTemplate))
  )

  // data-controllers
  LegalEntityTemplate.postalAddress = JSON.parse(
    JSON.stringify(PostalAddressTemplate)
  )
  CeoTemplate.personalInformation = JSON.parse(
    JSON.stringify(PersonalInformationTemplate)
  )
  DpoTemplate.personalInformation = JSON.parse(
    JSON.stringify(PersonalInformationTemplate)
  )
  DpoTemplate.postalAddress = JSON.parse(JSON.stringify(PostalAddressTemplate))
  LegalEntityTemplate.ceo = JSON.parse(JSON.stringify(CeoTemplate))
  LegalEntityTemplate.dpo = JSON.parse(JSON.stringify(DpoTemplate))
  JointDataControllerTemplate.legalEntity = JSON.parse(
    JSON.stringify(LegalEntityTemplate)
  )

  // purposes
  LegalBasisTemplate.startValidity = JSON.parse(
    JSON.stringify(EventTypeTemplate)
  )
  LegalBasisTemplate.stopValidity = JSON.parse(
    JSON.stringify(EventTypeTemplate)
  )

  // recipients
  DataProcessorTemplate.legalEntity = JSON.parse(
    JSON.stringify(LegalEntityTemplate)
  )
  ExternalOrganizationTemplate.legalEntity = JSON.parse(
    JSON.stringify(LegalEntityTemplate)
  )

  // ropa
  RopaTemplate.uropaVersion = `${packageJson.version}`
  RopaTemplate.dataController = JSON.parse(JSON.stringify(LegalEntityTemplate))
  RopaTemplate.representative = JSON.parse(JSON.stringify(LegalEntityTemplate))
}
