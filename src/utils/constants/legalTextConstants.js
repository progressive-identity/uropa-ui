export const routeName = 'Legal documents'

export const legalResources = Object.freeze([
  {
    label: 'Privacy policy',
    name: routeName,
    params: {
      slug: 'privacy-policy'
    },
    type: 'privacyPolicy'
  },
  {
    label: 'Legal Notice',
    name: routeName,
    params: {
      slug: 'legal-notice'
    },
    type: 'legalNotice'
  },
  {
    label: 'Terms of Services',
    name: routeName,
    params: {
      slug: 'terms-services'
    },
    type: 'generalTermsAndConditions'
  }
])
