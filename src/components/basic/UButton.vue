<template>
  <button type="button"
          :class="classes">
    <UIcon v-if="icon" :path="icon"/>
    {{ label }}
  </button>
</template>

<script setup>
import {computed} from 'vue'
import UIcon from '@/components/basic/UIcon.vue'

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false,
    default: 'primary',
    validator: function (value) {
      return ['primary', 'secondary', 'warning', 'danger'].indexOf(value) !== -1
    }
  }
})

const classes = computed(() => {
  return {
    'u-button': true,
    [`u-button--${props.type}`]: true,
    ['u-button--icon']: (props.icon && !props.label)
  }
})

</script>
