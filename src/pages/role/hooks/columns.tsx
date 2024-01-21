import { Box, Typography } from '@mui/material'
import React from 'react'
import BasicTableActions from 'src/components/BasicTableActions'

const useGetRolesCols = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (id: number) => void
  handleEdit: (id: number) => void
}) => {
  const columns = [
    {
      flex: 0.1,
      field: 'name',
      minWidth: 100,
      headerName: 'Role Name',
      renderCell: ({ row }: { row: { name: string } }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {row.name}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'permissions',
      minWidth: 50,
      headerName: 'Permissions',
      renderCell: ({ row }: { row: { permissions: string } }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
            {row.permissions}
          </Typography>
        )
      }
    },

    {
      flex: 0.05,
      field: 'actions',
      minWidth: 60,
      headerName: 'Actions',
      renderCell: (params: any) => {
        const { id } = params.row

        return <BasicTableActions handleDelete={() => handleDelete(id)} handleEdit={() => handleEdit(id)} />
      }
    }
  ]

  return columns
}

export default useGetRolesCols
