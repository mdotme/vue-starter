<script lang="ts" setup>
import { useApi } from '@/composables/useApi.ts'
import { useMainStore } from '@/stores'

const store = useMainStore()

const { data, loading, error, request } = useApi<{ id: number }[]>(
  '/repos/mdotme/vue-starter',
  {
    headers: {
      Accept: 'application/vnd.github.v3.star+json',
    },
  },
  {
    onSuccess(res) {
      console.log(res)
    },
  },
)
</script>

<template>
  <div>
    <h1>HOME PAGE</h1>

    <RouterLink :to="{ name: 'Protected' }"> Enter protected page </RouterLink>
    <button @click="store.count++">Increment {{ store.getCount }}</button>

    <button @click="request()">Fetch data</button>
    <p v-if="loading">Loading...</p>
    <pre v-else-if="data">{{ data }}</pre>
    <pre v-else-if="error">{{ error }}</pre>
  </div>
</template>
