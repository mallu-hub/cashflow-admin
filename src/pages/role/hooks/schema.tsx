import * as yup from 'yup'

const useGetRolesSchema = () => {
  const schema = yup.object().shape({
    name: yup.string().required('Role Name is required')
  })

  return schema
}

export default useGetRolesSchema
