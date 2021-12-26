import { IconButton, InputAdornment, Menu, TextField } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import React, { useContext, useRef, useState } from 'react';
import { FormContext } from '../FormContext';
import { DaysField } from '../JsonToForm';

const InputDays: React.FC<DaysField> = ({ name, options = {}, label }: DaysField) => {
  const { fields, register, setValue } = useContext(FormContext)
  register(name, options);

  const [open, setOpen] = useState<any>(null)
  const inputElement = useRef(null);

  const currentValue = fields[name]?.split(',') || [] as number[];

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleUpdate = (value: number) => {
    const index = currentValue.indexOf(String(value));
    if (index > -1) {
      currentValue.splice(index, 1);
    } else {
      currentValue.push(value)
    }

    currentValue.sort((a: string, b: string) => {
      return parseInt(a) - parseInt(b)
    }, [])
    setValue(name, currentValue.filter(item => item).join(','), { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }



  return (<div className="input-days" ref={inputElement}>
    <TextField value={currentValue} variant='outlined' label={label} fullWidth InputProps={{
      readOnly: true,
      endAdornment: <InputAdornment position='end'>
        <IconButton onClick={() => setOpen(!open)}>
          <DateRangeIcon />
        </IconButton>
      </InputAdornment>
    }} />
    <Menu anchorEl={inputElement.current} open={open} onClose={() => setOpen(false)}>
      <li className="day-list">
        <strong>Select available days</strong>
        <div>
          {days.map((item, index) => <span className={currentValue.includes(String(index + 1)) ? 'active' : 'n'} key={index} onClick={() => handleUpdate(index + 1)}>{item}</span>)}
        </div>
      </li>
    </Menu>
  </div>);
};

export default InputDays;
