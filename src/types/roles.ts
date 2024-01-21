import { Control, FieldErrorsImpl, UseFormHandleSubmit } from 'react-hook-form'

export interface RoleFormType {
  name: string
}

export interface RolesFormProps {
  handleSubmit: UseFormHandleSubmit<RoleFormType>
  control: Control<RoleFormType>
  onSubmit: (values: RoleFormType) => void
  handleClose: () => void
  errors?: Partial<FieldErrorsImpl<RoleFormType>>
  apiError: Error | null
}
