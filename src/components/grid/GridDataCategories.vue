<template>
  <div v-if="current === 3">
    <UStepperBullet v-model="currentDataCategories" :steps="stepsDataCategories"/>
    <div class=" py-5">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="purpose in purposes" :key="purpose.name"
            class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1 truncate">
              <p class="text-gray-900 text-sm font-medium truncate">Purpose : {{ purpose.name }}</p>
              <p class="text-gray-900 text-sm font-medium truncate">Legal basis : {{ purpose.legalBasis.type }}</p>
              <TabDataCategory :data-categories="purpose.dataCategories"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {storeToRefs} from 'pinia'
import StepperDataCategories from '@/components/stepper/StepperDataCategories.vue'
import dataCategories from '../../data/dataCategories.json'
import TabDataCategory from '@/components/TabDataCategory.vue'
import UStepperBullet from '@/components/basic/UStepperBullet.vue'

const store = useStore()
const {current, stepsDataCategories, currentDataCategories} = storeToRefs(store)
const {processingRecord: {purposes}} = useStoreData()

purposes[0] = {
  'name': 'whatever',
  'description': '',
  'isMain': true,
  'legalBasis': {
    'type': 'contentment',
    'description': '',
    'proofUrl': ''
  },
  dataCategories
}

</script>
