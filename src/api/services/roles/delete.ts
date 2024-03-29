import { useMutation } from '@tanstack/react-query'
import { ROLES_ENDPOINT } from 'src/api/routes/routes'
import { axiosInstance } from 'src/axios/axiosInstance'

export const useRemoveRole = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return axiosInstance.delete(`/${ROLES_ENDPOINT}/${id}`)
    }
  })
}
