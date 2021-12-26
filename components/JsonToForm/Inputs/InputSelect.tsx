import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootStore } from 'store';
import { FormContext } from '../FormContext';

type value = {
  value: any;
  label: string;
};

type PropsType = {
  name: string;
  label: string;
  values: value[];
  value?: any;
  selector?: string;
  action?(any): void;
  onLoad?(): void;
  options?: {required?: boolean};
};

const InputSelect: React.FC<PropsType> = ({ name, label, values, selector, action, onLoad, options = {} }: PropsType) => {
  const { fields, control, unregister, errors, setValue, loading } = useContext(FormContext);

  const defaultValue = fields[name] || null;
  const error = errors[name] || null;

  const selectorValues = useSelector<RootStore>((state) => {
    if (!selector) return values;

    if (selector === 'groups') {
      return state.groups.data.map((item) => ({
        value: item,
        label: item.name,
      }));
    }
    if (selector === 'locations') {
      return state.locations.list
        ? state.locations.list.map((item) => ({
          value: item,
          label: item.name,
        }))
        : [];
    }

    return [];
  }) as value[];

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
    return () => {
      unregister(name)
    }
  }, []);

  const handleChange = (event) => {
    setValue(name, event.target.value, { shouldValidate: true, shouldDirty: true });
    if (action) {
      action(event.target.value);
    }
  };

  return (
    <FormControl className='input-select' variant='outlined' key={typeof defaultValue}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={options}
        render={({ field }) => (
          <Select
            inputProps={{
              name,
            }}
            error={!!error}
            className='input'
            disabled={loading}
            {...field}
            onChange={handleChange}
            >
            {selectorValues &&
              selectorValues.map((value, valueIndex) => (
                <MenuItem key={valueIndex} value={value.value}>
                  {value.label}
                </MenuItem>
              ))}
          </Select>
        )}
      />
      <FormHelperText style={{ color: 'red' }}>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default InputSelect;
