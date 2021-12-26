import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useContext } from 'react';
import { FormContext } from '../FormContext';
import { AutocompleteField } from '../JsonToForm';

const InputAutoComplete: React.FC<AutocompleteField> = ({name, items, options, label}: AutocompleteField) => {

  const {fields, errors, register, setValue} = useContext(FormContext)
  const error = errors[name] || null;
  const currentValue = fields[name] || '';

  const handleChange = (_, item) => {
    setValue(name, item, {shouldValidate: true, shouldDirty: true, shouldTouch: true})
  }

  return (<Autocomplete
      value={currentValue}
      options={items}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField helperText={error ? 'This is Required!' : ''} {...params} {...register(name, options || {})} label={label} name="" variant="outlined" autoComplete="off" />}
      onChange={handleChange}
    />);
};

export default InputAutoComplete;
