import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { Store } from '@/types/enums/store.enum'

export const useMainStore = defineStore(Store.MAIN, () => {
  const count = ref(0)
  const getCount = computed(() => count.value)

  function doubleIncrement() {
    count.value += 2
  }

  return {
    count,
    getCount,
    doubleIncrement,
  }
})
