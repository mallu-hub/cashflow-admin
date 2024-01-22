import { useQuery } from '@tanstack/react-query'
import { ROLES_ENDPOINT } from 'src/api/routes/routes';
import { axiosInstance } from 'src/axios/axiosInstance'

async function getRoles(params: { page: number; pageSize: number }) {
  const filterParams = {
    ...params,
    page: params?.page + 1
  }

  const response =  axiosInstance.get(ROLES_ENDPOINT,{
    params: filterParams,
    withCredentials:false,
  })

  return response
}

export const useGetRoles = (params: { page: number; pageSize: number }) => {
  return useQuery({
    queryKey: [ROLES_ENDPOINT, params],
    queryFn: () => getRoles(params)
  })
}
