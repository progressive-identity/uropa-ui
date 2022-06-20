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
                {id: 0, name: 'Data categories'},
                {id: 1, name: 'Data sources'}
            ],
            currentDataCategories: 0,
            stepsDataControllers: [
                {id: 0, name: 'Data controller'},
                {id: 1, name: 'Representative'},
                {id: 2, name: 'Joint controllers'}
            ],
            currentDataControllers: 0,
            stepsRecipients: [
                {id: 0, name: 'Internal departments'},
                {id: 1, name: 'Data processors'},
                {id: 2, name: 'External organizations'}
            ],
            currentRecipients: 0
        }
    }
})
