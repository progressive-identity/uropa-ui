<template>
  <div
      class="relative border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
      v-bind:class="{'rounded-tl-lg': roundedTopLeft, 'rounded-tr-lg': roundedTopRight,  'rounded-bl-lg': roundedBottomLeft,  'rounded-br-lg': roundedBottomRight}">
    <label for="select" class="block text-xs font-medium text-gray-900">{{ label }}</label>
    <select id="select" name="select" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="block border-0 p-0 w-full pl-3 pr-10 text-base  sm:text-sm ring-0 focus:ring-0">
      <option v-if="list[0].name" v-for="element in list">{{ element.name }}</option>
      <option v-else v-for="element in list">{{ element }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    modelValue: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    roundedTopLeft: {
      type: Boolean,
      required: false,
      default: false
    },
    roundedTopRight: {
      type: Boolean,
      required: false,
      default: false
    },
    roundedBottomLeft: {
      type: Boolean,
      required: false,
      default: false
    },
    roundedBottomRight: {
      type: Boolean,
      required: false,
      default: false
    },
    emits: ['update:modelValue']
  }
}
</script>
