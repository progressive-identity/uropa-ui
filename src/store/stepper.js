import {defineStore} from 'pinia'

export const useStore = defineStore('stepper', {
    state: () => {
        return {
            mainNavigationDisplayed: true,
            stepsProcessingRecord: [
                {id: 0, name: 'General information'},
                {id: 1, name: 'Legal person'},
                {id: 2, name: 'Purposes'},
                {id: 3, name: 'Data categories'},
                {id: 4, name: 'Recipients'},
                {id: 5, name: 'Security measures'},
                {id: 6, name: 'Data transfers'}
            ],
            current: 0,
            stepsDataCategories: [
                {id: 0, name: 'Add data categories'},
                {id: 1, name: 'Complete your data types'},
                {id: 2, name: 'Review your data categories'}
            ],
            currentDataCategories: 0,
            stepsLegalPerson: [
                {id: 0, name: 'Add a legal person'},
                {id: 1, name: 'Add a representative'},
                {id: 2, name: 'Add joint controllers'}
            ],
            currentLegalPerson: 0,
            stepsRecipients: [
                {id: 0, name: 'Add internal departments'},
                {id: 1, name: 'Add external organizations'},
                {id: 2, name: 'Add data processors'}
            ],
            currentRecipients: 0
        }
    }
})
