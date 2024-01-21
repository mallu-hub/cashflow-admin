import { Box, Button, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useGetRoles } from 'src/api/services/roles/get'
import useGetRolesCols from './hooks/columns'
import DeleteConfirmModal from 'src/components/DeleteConfirmModal'
import { useRemoveRole } from 'src/api/services/roles/delete'
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'
import DrawerForm from 'src/components/DrawerForm'
import RolesForm from './components/RolesForm'
import { useForm } from 'react-hook-form'
import { RoleFormType } from 'src/types/roles'
import { useAddRoles } from 'src/api/services/roles/post'
import useCustomToast from 'src/hooks/useCustomToast'
import { useQueryClient } from '@tanstack/react-query'
import { ROLES_ENDPOINT } from 'src/api/routes/routes'
import { yupResolver } from '@hookform/resolvers/yup'
import useGetRolesSchema from './hooks/schema'

const defaultValues = {
  name: ''
}

const Roles = () => {
  const [open, setOpen] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [idToRemove, setIdToRemove] = useState<any>('')
  const toast = useCustomToast()
  const create = useAddRoles()
  const remove = useRemoveRole()

  const queryClient = useQueryClient()
  const schema = useGetRolesSchema()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  function handleDrawer() {
    setOpenAdd(!openAdd)
    reset(defaultValues)
    create.reset()
  }

  function handleDelete(id: number) {
    setIdToRemove(id)
    setOpen(!open)
  }

  const columns = useGetRolesCols({
    handleDelete,
    handleEdit
  })

  const [params] = useState({
    page: 0,
    pageSize: 15
  })

  const { data: roles, isLoading } = useGetRoles(params)
  const rolesList = roles?.data?.data || []

  function handleEdit(id: number) {
    const selectedRole = rolesList?.find((role: { id: number }) => role.id === id)
    setOpenAdd(!openAdd)
    reset({
      name: selectedRole.name
    })
  }

  const onSubmit = (values: RoleFormType) => {
    create.mutate(values, {
      onSuccess: handleSuccess
    })
  }

  function handleSuccess() {
    handleDrawer()
    queryClient.invalidateQueries({ queryKey: [ROLES_ENDPOINT] })
    toast.success('Role Created Successfully')
  }

  return (
    <Card>
      <Grid>
        <Card>
          <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <CardHeader title='Manage Roles' />
            <Grid sx={{ padding: 6 }}>
              <Button onClick={handleDrawer} variant='contained' size='medium'>
                Add Role
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <Divider />
          <Box sx={{ height: 400 }}>
            <DataGrid
              columns={columns as GridColumns<RoleFormType>}
              rows={rolesList || []}
              rowCount={roles?.data?.total || 0}
              paginationMode='server'
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 } } } as GridInitialStateCommunity}
              loading={isLoading}
            />
          </Box>
        </Card>
      </Grid>
      <DeleteConfirmModal
        idToRemove={idToRemove}
        open={open}
        remove={remove}
        routeToInvalidate='roles'
        setOpen={setOpen}
      />
      <DrawerForm
        heading='Add Roles'
        openDrawer={openAdd}
        setOpenDrawer={setOpenAdd}
        FormContent={
          <RolesForm
            handleSubmit={handleSubmit}
            control={control}
            onSubmit={onSubmit}
            handleClose={handleDrawer}
            errors={errors}
            apiError={create.error}
          />
        }
      />
    </Card>
  )
}

export default Roles
