'use client'

import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useSelector } from 'react-redux'
import { UserProfile } from '@/types'
import { setUser } from '@/redux/slices'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import store from '@/redux/store'

export default function ComboBox () {
  const [open, setOpen] = React.useState(false)
  const [searchActive, setSearchActive] = React.useState(false)
  const users = useSelector(
    (state: ReturnType<typeof store.getState>) => state.data
  )

  const handleClickAway = () => {
    if (!searchActive) return
    setOpen(false)
  }

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
    <ClickAwayListener onClickAway={handleClickAway}>
      <div onClick={() => setSearchActive(true)}>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={options ?? []}
          sx={{ width: 300 }}
          onChange={(_, newValue) => {
            newValue &&
              store.dispatch(
                setUser(
                  users.data.find(
                    user => user.uuid === newValue?.uuid
                  ) as UserProfile
                )
              )
          }}
          renderInput={params => <TextField {...params} label='Search' />}
        />
      </div>
    </ClickAwayListener>
  )
}
