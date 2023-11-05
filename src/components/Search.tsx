'use client'

import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useSelector } from 'react-redux'
import { UserProfile } from '@/types'
import { setUser } from '@/redux/slices'
import store from '@/redux/store'

type SearchProps = {
  options?: {
    label: string
    uuid: string
  }[]
}

export default function ComboBox () {
  const users = useSelector(
    (state: ReturnType<typeof store.getState>) => state.data
  )

  const options = React.useMemo(() => {
    if (users) {
      return users.data.map((user: UserProfile) => ({
        label: `${user.name.first}  ${user.name.last}`,
        department: user.department,
        uuid: user.uuid
      }))
    } else {
      return []
    }
  }, [users])

  return (
    <Autocomplete
      disablePortal
      options={options ?? []}
      onChange={(event, newValue) => {
        store.dispatch(
          setUser(
            users.data.find(user => user.uuid === newValue?.uuid) as UserProfile
          )
        )
      }}
      sx={{ width: 300 }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.uuid}>
            {option.label}
          </li>
        )
      }}
      renderInput={params => <TextField {...params} label='Search' />}
    />
  )
}
