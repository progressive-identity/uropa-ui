import {defineStore} from 'pinia'

export const useStore = defineStore('stepper', {
    state: () => {
        return {
            mainNavigationDisplayed: false,
            stepsProcessingRecord: [
                {id: 0, name: 'General information'},
                {id: 1, name: 'Data controllers'},
                {id: 2, name: 'Purposes'},
                {id: 3, name: 'Data categories'},
                {id: 4, name: 'Recipients'},
                {id: 5, name: 'Security measures'},
                {id: 6, name: 'Data transfers'}
            ],
            current: -1,
            stepsDataCategories: [
                {id: 0, name: 'Add data categories'},
                {id: 1, name: 'Add data sources'}
            ],
            currentDataCategories: 0,
            stepsDataControllers: [
                {id: 0, name: 'Add a legal person'},
                {id: 1, name: 'Add a representative'},
                {id: 2, name: 'Add joint controllers'}
            ],
            currentDataControllers: 0,
            stepsRecipients: [
                {id: 0, name: 'Add internal departments'},
                {id: 1, name: 'Add data processors'},
                {id: 2, name: 'Add external organizations'}
            ],
            currentRecipients: 0
        }
    }
})
