<template>
  <div>
    <div class="sm:hidden">
      <select id="tabs" name="tabs"
              class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
        <option v-for="tab in dataCategories" :key="tab.name" :selected="true">{{ tab.name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <div v-for="dataCategory in dataCategories" :key="dataCategory.name"
             :class="[dataCategory.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'px-3 py-2 font-medium text-sm rounded-md']"
             class="text-gray-900"
             :aria-current="dataCategory.current ? 'page' : undefined">
          {{ dataCategory.name }}
          <!--          <div></div>-->
          <p v-for="dataType in dataCategory.dataTypes">{{ dataType.name }}
          </p>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataCategories: {
      type: Object,
      required: true
    },
    current: {
      type: Number,
      required: false,
      default: 0
    }
  }
}
</script>
