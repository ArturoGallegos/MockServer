import { Switch } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { FormContext } from '../FormContext';
import { SwitchField } from '../JsonToForm';

const InputSwitch: React.FC<Omit<SwitchField, 'type'>> = ({ name, label, onChange }: Omit<SwitchField, 'type'>) => {
  const { fields, register, setValue, loading } = useContext(FormContext);
  const defaultValue = fields[name] || null;

  const [value, setDefaultValue] = useState<boolean>(defaultValue);
  const handleChange = (_, status) => {
    if (onChange) {
      onChange(status);
    }
    setValue(name, status, { shouldDirty: true });
    setDefaultValue(status);
  };
  return (
    <label
      className={clsx('input-switch', {
        disabled: loading,
      })}>
      {label}
      <Switch {...register(name)} disabled={loading} checked={value} onChange={handleChange} name={name} />
    </label>
  );
};

export default InputSwitch;
