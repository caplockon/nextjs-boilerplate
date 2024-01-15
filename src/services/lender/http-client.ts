import axios from 'axios'

import type {
  ListRequestCriteria,
  PaginatorResponse,
  ResourceResponse,
} from '@/entities/laravel-conventions'

export const http = axios.create({
  baseURL: 'http://localhost:8081',
  method: 'get',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
})

export const useRestApiResource = <T>(path: string) => {
  /**
   * Get list of resources
   */
  async function list(req?: ListRequestCriteria) {
    const reqParams = {
      page: req?.page,
      per_page: req?.per_page,
    }
    const response = await http.get<PaginatorResponse<T>>(path, {
      params: reqParams,
    })
    return response.data
  }

  /**
   * Create a resource
   * @param resource
   */
  async function create(resource?: T | any) {
    const response = await http.post<ResourceResponse<T>>(path, resource)
    return response.data
  }

  /**
   * Get details of resource
   * @param uid
   */
  async function get(uid: string) {
    const response = await http.get<ResourceResponse<T>>(`${path}/${uid}`)
    return response.data
  }

  /**
   * Update a resource
   * @param uid
   * @param payload
   */
  async function update(uid: string, payload?: any) {
    const response = await http.patch<ResourceResponse<T>>(
      `${path}/${uid}`,
      payload
    )
    return response.data
  }

  /**
   * Delete a resource
   * @param uid
   */
  async function destroy(uid: string) {
    const response = await http.delete<ResourceResponse<T>>(`${path}/${uid}`)
    return response.data
  }

  return { list, create, get, update, destroy }
}
