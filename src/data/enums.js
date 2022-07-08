const dpoStatus = [
  {
    name: 'internal'
  },
  {
    name: 'external'
  }
]

const collectionMeans = [
  {
    name: 'inferred',
    description:
      'Personal data that is derived data generated from existing data'
  },
  {
    name: 'generated',
    description:
      'Personal data that is generated without relation from existing data'
  },
  {
    name: 'collected',
    description: 'Personal data that has been collected'
  }
]

const securityMeasureTypes = [
  {
    name: 'organizational'
  },
  {
    name: 'physical'
  },
  {
    name: 'technical'
  }
]

const dataSupports = [
  {
    name: 'digital'
  },
  {
    name: 'physical'
  }
]
const storageStates = [
  {
    name: 'production',
    description: 'The data is kept in the active database'
  },
  {
    name: 'legal',
    description: 'The data is kept for legal reasons in a restricted database'
  },
  {
    name: 'data locking',
    description:
      'The data is locked for legal reasons (legal obligation only for Spain)'
  },
  {
    name: 'archives',
    description:
      'The data is archived with no time limitation (only for archival purposes in the public interest)'
  }
]

const legalBasisTypes = [
  {
    name: 'consent'
  },
  {
    name: 'contract'
  },
  {
    name: 'legal obligation'
  },
  {
    name: 'vital interest'
  },
  {
    name: 'public interest task'
  },
  {
    name: 'legitimate interest'
  }
]

const dataTransferLegalBasisTypes = [
  {
    name: 'adequacy decision',
    description:
      'The Commission has decided that the third country in question ensures an adequate level of protection (art. 45 GDPR)'
  },
  {
    name: 'appropriate safeguards',
    description:
      'Legally binding and enforceable agreement, BCR, SCC, approved code of conduct or approved certification mechanisms (art. 46 GDPR)'
  },
  {
    name: 'derogation',
    description:
      'Explicit consent, contract, public interest, legal claims, protection of vital interests, public register, ad hoc transfer (art. 49 GDPR)'
  }
]

const timeUnit = [
  {
    name: 'years'
  },
  {
    name: 'months'
  },
  {
    name: 'weeks'
  },
  {
    name: 'days'
  },
  {
    name: 'hours'
  },
  {}
]

export {
  dpoStatus,
  collectionMeans,
  securityMeasureTypes,
  dataSupports,
  storageStates,
  dataTransferLegalBasisTypes,
  legalBasisTypes,
  timeUnit
}
