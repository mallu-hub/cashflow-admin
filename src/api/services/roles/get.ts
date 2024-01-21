import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/axios/axiosInstance";

async function getRoles(params: { page: number; pageSize: number }) {
    const filterParams = {
      ...params,
      page: params?.page + 1
    }
  
    const response = await axiosInstance.get(`roles`, {
      params: filterParams
    })
  
    return response
  }
  
  export const useGetRoles = (params: { page: number; pageSize: number }) => {
    return useQuery({
      queryKey: ['roles', params],
      queryFn: () => getRoles(params)
    })
  }