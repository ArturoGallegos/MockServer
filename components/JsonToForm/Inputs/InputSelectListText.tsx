import { Checkbox, Divider, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useContext, useRef } from 'react';
import { FormContext } from '../FormContext';
import { SelectListTextField } from '../JsonToForm';

const InputSelectListText: React.FC<SelectListTextField> = ({ name, items }: Partial<SelectListTextField>) => {
  const selectRef = useRef(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const { fields, register, setValue } = useContext(FormContext);
  register(name);

  const currentValue = fields[name];

  const handleChange = (event) => {
    setValue(name, event.target.value, { shouldValidate: true, shouldDirty: true });
  }

  const handleSelect = (value) => {
    setValue(name, value, { shouldValidate: true, shouldDirty: true })
  }

  return <div className="input-select-list-text input-text">
    <TextField placeholder="Group" variant="outlined" value={currentValue} fullWidth InputProps={{
      endAdornment: <InputAdornment position="start"><ArrowDropDownIcon /></InputAdornment>,
    }} onClick={() => setOpen(true)}
      ref={selectRef}
    />
    <Menu open={open} onClose={() => setOpen(false)} anchorEl={selectRef.current} className="input-select-list-text-items" onKeyDown={event => event.stopPropagation()}>
      <FormControl className="input-text-with-controller" variant="outlined" fullWidth>
        <InputLabel>Write New Group Name</InputLabel>
        <OutlinedInput onKeyDown={event => event.stopPropagation()} onChange={handleChange} fullWidth className="input-text" />
      </FormControl>
      <Divider className="divider" />
      <strong className="current-items-title">Current Groups</strong>
      {items.map((item, index) => <MenuItem key={index} onClick={() => handleSelect(item)}>
        <Checkbox checked={currentValue === item} color="primary" />
        {item}
      </MenuItem>)}
    </Menu>
  </div>
};

export default InputSelectListText;
