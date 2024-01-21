import { useMutation } from '@tanstack/react-query'
import { ROLES_ENDPOINT } from 'src/api/routes/routes'
import { axiosInstance } from 'src/axios/axiosInstance'
import { RoleFormType } from 'src/types/roles'

export const useAddRoles = () => {
  return useMutation({
    mutationFn: (values: RoleFormType) => {
      return axiosInstance.post(ROLES_ENDPOINT, values)
    }
  })
}
