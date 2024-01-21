import { Icon } from '@iconify/react'
import { Box, CircularProgress, Divider, Drawer, Grid, IconButton, Typography } from '@mui/material'
import React, { ReactNode, SetStateAction } from 'react'
import { Header } from './Header'

type DrawerFormProps = {
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<SetStateAction<boolean>>
  heading: string
  FormContent: ReactNode
  isLoading?: boolean
}

const DrawerForm = (props: DrawerFormProps) => {
  const { openDrawer, setOpenDrawer, heading, isLoading, FormContent } = props

  function handleDrawerClose() {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Drawer
      open={openDrawer}
      anchor='right'
      variant='temporary'
      onClose={handleDrawerClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 360, sm: 430 } } }}
    >
      <Header>
        <Typography variant='h6'>{heading}</Typography>
        <IconButton size='small' onClick={handleDrawerClose} sx={{ color: 'text.primary' }}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      </Header>
      <Divider />
      <Box sx={{ pl: 4, pr: 4, py: 6 }}>
        {isLoading && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <CircularProgress />
          </Grid>
        )}
        {FormContent}
      </Box>
    </Drawer>
  )
}

export default DrawerForm
