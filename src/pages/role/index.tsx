import { Box, Button, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useGetRoles } from 'src/api/services/roles/get'
import useGetRolesCols from './hooks/columns'
import DeleteConfirmModal from 'src/components/DeleteConfirmModal'
import { useRemoveRole } from 'src/api/services/roles/delete'

const Roles = () => {
  const [open, setOpen] = useState(false)
  const [idToRemove, setIdToRemove] = useState<any>('')
  const remove = useRemoveRole()

  function handleAdd() {
    console.log('add')
  }

  function handleDelete(id: number) {
    setIdToRemove(id)
    setOpen(!open)
  }

  function handleEdit(id: number) {
    console.log('edit', id)
  }

  const columns = useGetRolesCols({
    handleDelete,
    handleEdit
  })

  const [params, setParams] = useState({
    page: 0,
    pageSize: 15
  })

  const { data: roles } = useGetRoles(params)
  console.log(roles, 'rolesCheck')
  const rolesList = roles?.data || []

  return (
    <Card>
      <Grid>
        <Card>
          <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <CardHeader title='Manage Roles' />
            <Grid sx={{ padding: 6 }}>
              <Button onClick={handleAdd} variant='contained' size='medium'>
                Add Role
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <Divider />
          <Box sx={{ height: 400 }}>
            <DataGrid
              disableRowSelectionOnClick
              columns={columns}
              rows={rolesList?.data || []}
              rowCount={rolesList?.total || 0}
              paginationMode='server'
              paginationModel={params}
              onPaginationModelChange={setParams}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 } } }}
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
    </Card>
  )
}

export default Roles
