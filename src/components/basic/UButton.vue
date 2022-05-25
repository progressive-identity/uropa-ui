<template>
  <button type="button" v-on:click="actionOnClick"
          :class="classes">
    <UIcon v-if="icon" :path="icon"/>
    {{ label }}
  </button>
</template>

<script>
import UIcon from "@/components/basic/UIcon.vue"

export default {
  components: {
    UIcon
  },
  props: {
    label: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    actionOnClick: {
      type: Function,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator: function (value) {
        return ["primary", "warning", "danger"].indexOf(value) !== -1
      }
    }
  },
  computed: {
    classes() {
      return {
        "u-button": true,
        [`u-button--${this.type}`]: true
      }
    }
  }
}

</script>
