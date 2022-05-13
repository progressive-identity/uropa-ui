import {defineStore} from 'pinia'

export const useStore = defineStore('stepper', {
    state: () => {
        return {
            steps: [
                {id: 0, name: 'General information', href: '#', status: 'complete'},
                {id: 1, name: 'Legal person', href: '#', status: 'current'},
                {id: 2, name: 'Representative', href: '#', status: 'upcoming'},
                {id: 3, name: 'Joint controllers', href: '#', status: 'upcoming'},
                {id: 4, name: 'Purposes', href: '#', status: 'upcoming'},
                {id: 5, name: 'Recipients', href: '#', status: 'upcoming'},
                {id: 6, name: 'Security measures', href: '#', status: 'upcoming'},
                {id: 7, name: 'Data transfers', href: '#', status: 'upcoming'},
                {id: 8, name: 'DPIA', href: '#', status: 'upcoming'},
            ],
            current: 0
        }
    },
})
