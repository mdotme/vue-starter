/* eslint-disable ts/no-explicit-any */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { shallowRef } from 'vue'

import { injectApi } from '@/plugins/api'

type UseApiOptions<T> = Partial<{
  onSuccess: (response: AxiosResponse<T>) => void
  onError: (error: AxiosError) => void
  onFinish: () => void
  immediate?: boolean
}>

export function useApi<T = unknown, D = any>(
  endpoint: string | (() => string),
  axiosOptions?: AxiosRequestConfig,
  options?: UseApiOptions<T>,
) {
  const api = injectApi()
  const data = shallowRef<T | null>(null)
  const loading = shallowRef<boolean>(false)
  const error = shallowRef<AxiosError | null>(null)

  async function request(): Promise<
    | {
        data: T
        error: null
      }
    | {
        data: null
        error: AxiosError
      }
  > {
    try {
      loading.value = true
      const _endpoint = typeof endpoint === 'string' ? endpoint : endpoint()
      const res = await api<T, AxiosResponse<T, any>, D>(
        _endpoint,
        axiosOptions,
      )
      data.value = res.data
      error.value = null
      if (options?.onSuccess) options.onSuccess(res)
      return { data: res.data, error: null }
    } catch (err: unknown) {
      const _err = err as unknown as AxiosError
      error.value = _err
      data.value = null
      if (options?.onError) options.onError(_err)
      return { data: null, error: _err }
    } finally {
      loading.value = false
    }
  }

  if (options?.immediate) request()

  return {
    data,
    loading,
    error,
    request,
  }
}
