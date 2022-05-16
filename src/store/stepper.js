import {defineStore} from 'pinia'

export const useStore = defineStore('stepper', {
    state: () => {
        return {
            steps: [
                {id: 0, name: 'General information', href: '#', status: 'complete'},
                {id: 1, name: 'Legal person', href: '#', status: 'current'},
                // {id: 2, name: 'representative', href: '#', status: 'upcoming'},
                // {id: 3, name: 'joint controllers', href: '#', status: 'upcoming'},
                {id: 2, name: 'Purposes', href: '#', status: 'upcoming'},
                {id: 3, name: 'Data categories', href: '#', status: 'upcoming'},
                // {id: 3, name: 'Data types', href: '#', status: 'upcoming'},
                {id: 4, name: 'Recipients', href: '#', status: 'upcoming'},
                {id: 5, name: 'Security measures', href: '#', status: 'upcoming'},
                {id: 6, name: 'Data transfers', href: '#', status: 'upcoming'},
                // {id: 8, name: 'DPIA', href: '#', status: 'upcoming'},
            ],
            current: 0
        }
    },
})
