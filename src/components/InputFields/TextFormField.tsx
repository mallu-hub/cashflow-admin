import { Grid, InputProps, TextField } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { Controller, FieldError } from 'react-hook-form'
import ErrorBox from '../ErrorBox'
import RequiredLabel from '../RequiredLabel'

const TextFormField = ({
  id,
  control,
  required,
  multiline,
  rows,
  type,
  handleTextChange,
  i,
  label,
  placeholder,
  size,
  isDisabled,
  error,
  InputProps
}: {
  id: string
  control: any
  required?: boolean
  multiline?: boolean
  rows?: number
  type?: string
  handleTextChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i?: number) => void
  i?: number
  label?: string
  placeholder?: string
  size?: any
  isDisabled?: boolean
  error?: FieldError
  InputProps?: InputProps
}) => {
  return (
    <Grid width={'100%'}>
      <Controller
        name={id}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            fullWidth
            type={type ?? 'text'}
            rows={rows ?? 0}
            disabled={isDisabled}
            multiline={multiline ?? false}
            inputProps={{
              maxLength: 250
            }}
            value={value}
            onChange={e => {
              onChange(e)
              handleTextChange && handleTextChange(e, i)
            }}
            onWheel={(e: any) => e.target.blur()}
            sx={{
              '& .MuiFormLabel-asterisk': { color: 'red' },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000000'
              }
            }}
            InputProps={InputProps && InputProps}
            onBlur={onBlur}
            size={size ?? 'small'}
            label={label && required ? <RequiredLabel text={label} /> : label ? label : null}
            placeholder={placeholder ?? ''}
          ></TextField>
        )}
      />
      {error && <ErrorBox error={error} />}
    </Grid>
  )
}

export default TextFormField
