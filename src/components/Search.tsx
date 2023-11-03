import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'

interface SearchProps {
  options: string[]
}

const Search: React.FC<SearchProps> = ({ options }) => {
  const [value, setValue] = useState<string | null>(options[0] || null)
  const [inputValue, setInputValue] = useState('')

  return (
    <div>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        options={options}
        sx={{ width: 300 }}
        renderInput={params => <TextField {...params} label='Controllable' />}
      />
    </div>
  )
}

export default Search
