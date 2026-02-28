<script lang="ts" setup>
import { useMainStore } from '@/stores/index.store'

const store = useMainStore()
</script>

<template>
  <div>
    <h1>ABOUT PAGE</h1>
    <button @click="store.doubleIncrement()">
      Double increment {{ store.getCount }}
    </button>
  </div>
</template>
