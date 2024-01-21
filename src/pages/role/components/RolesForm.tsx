import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import ErrorBox from 'src/components/ErrorBox'
import TextFormField from 'src/components/InputFields/TextFormField'
import { RolesFormProps } from 'src/types/roles'

const RolesForm = (props: RolesFormProps) => {
  const { handleSubmit, onSubmit, control, handleClose, errors, apiError } = props

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <TextFormField control={control} id='name' label='Name' size={'medium'} placeholder='Name' required />
      </Grid>
      {errors?.name && <ErrorBox error={errors.name} />}

      {apiError && <ErrorBox error={apiError} />}
      <Box sx={{ display: 'flex', position: 'sticky', alignItems: 'center', mt: 3 }}>
        <Button type='submit' variant='contained' sx={{ mr: 3 }}>
          Submit
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </form>
  )
}

export default RolesForm
