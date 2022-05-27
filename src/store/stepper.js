import { defineStore } from "pinia"

export const useStore = defineStore("stepper", {
  state: () => {
    return {
      stepsProcessingRecord: [
        { id: 0, name: "General information", mainNavigationVisible:true },
        { id: 1, name: "Legal person", mainNavigationVisible:false },
        { id: 2, name: "Purposes", mainNavigationVisible:true },
        { id: 3, name: "Data categories", mainNavigationVisible:false },
        { id: 4, name: "Recipients", mainNavigationVisible:false },
        { id: 5, name: "Security measures", mainNavigationVisible:true },
        { id: 6, name: "Data transfers", mainNavigationVisible:true }
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
