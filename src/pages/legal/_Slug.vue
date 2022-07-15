<template>
  <div>
    <article class="prose mx-auto mt-10">
      <!-- FIXME the style will probably need more work, that'll be done once the calls will return real content -->
      <h1>{{ pageContent.title }}</h1>
      <main v-html="pageContent.content"/>
      <p v-if="pageContent.effectiveDate">
        Effective date: <span v-html="pageContent.effectiveDate"/>
      </p>
    </article>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {onBeforeRouteUpdate, useRoute} from 'vue-router'
import axios from 'axios'
import {get, isEmpty} from 'lodash'
import {marked} from 'marked'
import {legalResources} from '@/utils/constants/legalTextConstants.js'

const pageContent = ref({})
const route = useRoute()

// first initialization
if (isEmpty(pageContent.value)) {
  await fetchContent(route.params.slug)
}

onBeforeRouteUpdate(async (to) => {
  await fetchContent(to.params.slug)
})

/**
 * Call the strapi API and transform the relevant result into HTML set in pageContent
 * @param slug this is used to determine which legal text we fetch
 * @returns {Promise<void>}
 */
async function fetchContent(slug) {
  const res = await fetchTextFromSlug(slug)
  pageContent.value.title = res?.title
  pageContent.value.content = res?.content ? marked.parse(res.content) : ''
  pageContent.value.effectiveDate = res?.effectiveDate
}

/**
 * Call the strapi API and return the result corresponding to the slug in parameter
 * @param slug this is used to determine which legal text we fetch
 * @returns {Promise<*>} the latest version of the article
 */
async function fetchTextFromSlug(slug) {
  const response = await axios.get(process.env.VUE_APP_URL_STRAPI_LEGAL, {
    params: {
      _locale: 'en',
      type: getTypeFromSlug(slug),
      site: 'uropaUI'
    }
  })
  return getLatestEffectiveVersion(response)
}

/**
 * Get the last version of a legal text
 * @param res a response with a data object contains a collection of legal texts
 * @returns {*} the most recent legal text valid
 */
function getLatestEffectiveVersion(res) {
  const orderedTexts = res.data.sort(function compare(a, b) {
    return new Date(getEffectiveDate(b)) - new Date(getEffectiveDate(a))
  }).filter((t) => new Date(getEffectiveDate(t)) <= new Date())
  return orderedTexts[0]
}

function getEffectiveDate(e) {
  const date = get(e, 'effectiveDate', '')
  if (date) {
    return new Date(date)
  }
  return ''
}

function getTypeFromSlug(slug) {
  return legalResources.find(e => e.params.slug === slug)?.type
}
</script>
