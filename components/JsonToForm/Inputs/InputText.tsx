import { IconButton, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { FormContext } from '../FormContext';
import { InputEvent, InputField } from '../JsonToForm.d';

const InputText = ({ field }: InputField) => {
  const inputText = useRef(null);
  const { fields, errors, register, unregister, setValue, loading, dirtyFields } = useContext(FormContext);
  register(field.name, { ...field.options, valueAsNumber: field.type === 'number' });
  const defaultValue = fields[field.name] || null;
  const error = errors[field.name] || null;
  const [thisValue, setThisValue] = useState<string | null>(field.defaultValue || null);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(null);

  useEffect(() => {
    return () => {
      unregister(field.name);
    }
  }, [])

  useEffect(() => {
    if (field.concatenate && typeof fields === 'object' && !dirtyFields[field.name]) {
      let concatenateValue = ''
      field.concatenate.forEach(key => {
        concatenateValue += fields[key] || '';
      });
      if(!concatenateValue || concatenateValue.length === 0 || (defaultValue?.length > 0 && concatenateValue === defaultValue)) return;

      setValue(field.name, concatenateValue.replace(/\s/g, ''));
      inputText.current.value = concatenateValue.replace(/\s/g, '')
    }
  }, [fields])

  const handleChange = (event: InputEvent) => {
    if (field.select) {
      return setValue(field.name, event.target.value, { shouldValidate: true, shouldDirty: true });
    }
    let currentValue = event.currentTarget.value;

    const encrypted = /^%(.+)\?$/.test(currentValue);
    setIsEncrypted(encrypted);

    if (field.replace && !encrypted) {
      currentValue = event.currentTarget.value.replace(field.replace, '');
      event.currentTarget.value = currentValue;
    }
    setValue(field.name, currentValue, { shouldValidate: true, shouldDirty: true });
    setThisValue(currentValue);
  };

  const handleClear = () => {
    setValue(field.name, '', { shouldValidate: true, shouldDirty: true });
    setThisValue('');
    setIsEncrypted(false);
    inputText.current.value = '';
  };

  const icon = () => {
    if (!field.icon && !field.clear) return {};

    const icons = {} as { startAdornment: ReactElement | null; endAdornment: ReactElement | null };

    if (field.icon) {
      if (field.icon.position === 'start') {
        icons.startAdornment = <InputAdornment position={field.icon.position || 'start'}>{field.icon.element}</InputAdornment>;
      } else {
        icons.endAdornment = <InputAdornment position={field.icon.position || 'start'}>{field.icon.element}</InputAdornment>;
      }
    }

    if (field.clear) {
      icons.endAdornment = (
        <InputAdornment position={'end'}>
          <IconButton onClick={handleClear}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      );
    }

    return icons;
  };

  return (
    <div className='input-text-field'>
      <TextField
        fullWidth
        label={field.label}
        error={!!error}
        helperText={error?.message}
        select={!!field.select}
        multiline={field.multiline}
        defaultValue={thisValue || defaultValue || ''}
        type={(isEncrypted ? 'password' : false) || field.type || 'text'}
        onChange={handleChange}
        autoComplete='off'
        className={`input-text${!error ? '' : ' has-error'}`}
        placeholder={field.placeholder}
        disabled={isEncrypted || loading}
        InputLabelProps={{
          shrink: field.shrink
        }}
        // name={field.name}
        name=''
        InputProps={icon()}
        inputProps={{ maxLength: field.maxLength, step: field.step || 0 }}
        inputRef={inputText}
        variant='outlined'>
        {field.select?.map((item: { value: string; label: string }) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default InputText;
