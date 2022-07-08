import { defineStore } from 'pinia'

export const useStore = defineStore('stepper', {
  state: () => {
    return {
      mainNavigationDisplayed: false,
      stepsProcessingRecord: [
        { id: 0, name: 'General information' },
        { id: 1, name: 'Data controllers' },
        {
          id: 2,
          name: 'Purposes'
        },
        { id: 3, name: 'Data categories' },
        { id: 4, name: 'Recipients' },
        { id: 5, name: 'Security measures' },
        { id: 6, name: 'Data transfers' }
      ],
      current: -1,
      stepsDataCategories: [
        { id: 0, name: 'Data categories' },
        { id: 1, name: 'Data sources' }
      ],
      currentDataCategories: 0,
      stepsDataControllers: [
        { id: 0, name: 'Data controller', optional: false },
        { id: 1, name: 'Representative', optional: true },
        { id: 2, name: 'Joint data controllers', optional: true }
      ],
      currentDataControllers: 0,
      stepsRecipients: [
        { id: 0, name: 'Internal departments', optional: false },
        { id: 1, name: 'Data processors', optional: true },
        { id: 2, name: 'External organizations', optional: true }
      ],
      currentRecipients: 0
    }
  }
})
