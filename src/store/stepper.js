import { defineStore } from "pinia"

export const useStore = defineStore("stepper", {
  state: () => {
    return {
      stepsProcessingRecord: [
        { id: 0, name: "General information", href: "#" },
        { id: 1, name: "Legal person", href: "#" },
        // {id: 2, name: 'representative', href: '#', status: 'upcoming'},
        // {id: 3, name: 'joint controllers', href: '#', status: 'upcoming'},
        { id: 2, name: "Purposes", href: "#" },
        { id: 3, name: "Data categories", href: "#" },
        // {id: 3, name: 'Data types', href: '#', status: 'upcoming'},
        { id: 4, name: "Recipients", href: "#" },
        { id: 5, name: "Security measures", href: "#" },
        { id: 6, name: "Data transfers", href: "#" }
        // {id: 8, name: 'DPIA', href: '#', status: 'upcoming'},
      ],
      current: 0,
      stepsDataCategories: [
        { id: 0, name: "Select a purpose" },
        { id: 1, name: "Add a data category" },
        { id: 2, name: "Add data types" }
      ],
      currentDataCategories: 0,
      stepsLegalPerson: [
        { id: 0, name: "Add a legal person", optional:false },
        { id: 1, name: "Add a representative", optional:true },
        { id: 2, name: "Add joint controllers", optional:true }
      ],
      currentLegalPerson: 0,
      stepsRecipients: [
        { id: 0, name: "Add internal departments", optional:true },
        { id: 1, name: "Add external organizations", optional:true },
        { id: 2, name: "Add data processors", optional:true }
      ],
      currentRecipients: 0
    }
  }
})
