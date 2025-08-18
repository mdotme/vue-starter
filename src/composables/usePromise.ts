/* eslint-disable ts/no-explicit-any */
import { onMounted, ref } from 'vue'

// @ts-expect-error skip F generic
export function usePromise<F extends (...args: any[]) => Promise<T>>(
  promiseFn: F,
  opts?: {
    immediate?: Parameters<F> extends [] ? boolean : undefined
    allowDuplicates?: boolean
    onSuccess?: (val: Awaited<ReturnType<F>>, args: Parameters<F>) => any
    onError?: (err: unknown) => any
    disabled?: () => boolean
  },
  fnArgs?: Parameters<F>,
) {
  const loading = ref(opts?.immediate ?? false)
  const executeCount = ref(0)

  async function execute(
    ...args: Parameters<F>
  ): Promise<Awaited<ReturnType<F>> | null> {
    if (
      (!opts?.allowDuplicates && loading.value && executeCount.value > 0) ||
      (opts?.disabled && opts.disabled())
    ) {
      return null
    }
    try {
      loading.value = true
      const res = await promiseFn(...args)
      opts?.onSuccess?.(res, args)
      return res
    } catch (err) {
      if (opts?.onError) opts.onError(err)
      return null
    } finally {
      loading.value = false
    }
  }

  if (opts?.immediate) {
    onMounted(() => {
      if (promiseFn.length && fnArgs) {
        execute(...fnArgs)
      } else if (!promiseFn.length) {
        // @ts-expect-error error handled
        execute()
      }
    })
  }

  return {
    loading,
    execute,
  }
}
