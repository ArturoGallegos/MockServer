import { FormControlLabel, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useContext } from 'react';
import { FormContext } from '../FormContext';
import { CheckboxField, CheckboxItem } from '../JsonToForm';

const InputCheckbox: React.FC<CheckboxField> = ({ name, items, onChange, onClick }: CheckboxField) => {
  const { register, fields, setValue } = useContext(FormContext)
  const currentValues = fields[name] ? [...fields[name]] : [];
  console.log('currentValues', currentValues)


  const handleChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    const field = fields[name] || [];
    const findIndex = field.findIndex(item => item === value)

    if (checked && findIndex < 0) {
      field.push(value);
    }

    if (!checked && findIndex > -1) {
      field.splice(findIndex, 1);
    }

    if (onChange) {
      onChange(field)
    }

    setValue(name, field)
  }

  const handleOnClick = async (event) => {
    if (onClick) {
      const input = event.target;
      await onClick({ value: input.value, status: input.checked })
    }
  }

  return (<Grid container>
    {Array.isArray(items) && items.map((item: CheckboxItem, index) => <Grid item md={item.md || 12} key={index}>
      <FormControlLabel
        label={item.label}
        control={<Checkbox
          color='primary'
          {...register(name)}
          onChange={handleChange}
          onClick={handleOnClick}
          name={name}
          value={item.value}
          checked={currentValues.includes(item.value)}
        />}
      />
    </Grid>)}
    {!Array.isArray(items) && <Grid item md={items.md || 12}>
      <FormControlLabel
        label={items.label}
        control={<Checkbox
          color='primary'
          onChange={handleChange}
          onClick={handleOnClick}
          name={name}
          value={items.value}
          checked={currentValues.includes(items.value)}
        />}
      />
    </Grid>}
  </Grid>);
};

export default React.memo(InputCheckbox);
