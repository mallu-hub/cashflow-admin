import { useMutation } from "@tanstack/react-query";
import { ROLES_ENDPOINT } from "src/api/routes/routes";
import { axiosInstance } from "src/axios/axiosInstance";
import { RoleFormType } from "src/types/roles";

export const useUpdateRoles = () => {
    return useMutation({
      mutationFn: (values: { id: number; data: RoleFormType }) => {
        return axiosInstance.put(`${ROLES_ENDPOINT}/${values?.id}`, values?.data)
      }
    })
  }