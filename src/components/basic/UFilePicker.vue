<template>
  <div class="flex items-stretch justify-start relative">
    <label class="inline-flex">
      <UButton
          :icon="icon"
          :label="label"
      />
      <!-- FIXME the cursor isn't working properly here, I don't know why -->
      <input
          ref="root"
          :accept="accept"
          class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"
          type="file"
          @input="upload"
      >
    </label>
  </div>
</template>

<script setup>
import UButton from '@/components/basic/UButton.vue'
import {mdiUpload} from '@mdi/js'

const props = defineProps({
  onUpload: {
    type: Function,
    default: null
  },
  label: {
    type: String,
    default: 'Upload'
  },
  icon: {
    type: String,
    default: mdiUpload
  },
  accept: {
    type: String,
    default: null
  }
})

function upload(event) {
  const reader = new FileReader()
  reader.readAsText(event.target.files[0])
  reader.onload = function () {
    props.onUpload(reader.result)
  }
}

</script>
