import type {
  DefaultOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>

export type InfinityQueryConfig<QueryFnType extends (...args: any) => any> =
  Omit<
    UseInfiniteQueryOptions<ExtractFnReturnType<QueryFnType>>,
    'queryKey' | 'queryFn'
  >

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
