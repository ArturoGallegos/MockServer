import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

type Option = {
  value: any;
  label: string;
};

type PropsInternal = {
  label: string;
  name: string;
  setValue?: any;
  options: Option[];
  value?: any;
  disabled?: boolean;
  multiple?: boolean;
  error?: {
    message: string;
  };
};

const InputSelect: React.FC<PropsInternal> = ({ label, options, value, error, disabled, setValue, multiple }) => {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event) => {
    setPersonName(event.target.value as string[]);

    if (setValue) {
      // demo
    }
  };

  return (
    <FormControl className='input-select' disabled={disabled} fullWidth>
      <InputLabel id='demo-simple-select-disabled-label'>{label}</InputLabel>
      <Select labelId='demo-simple-select-disabled-label' id='demo-simple-select-disabled' value={personName} onChange={handleChange} multiple={multiple}>
        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default InputSelect;
