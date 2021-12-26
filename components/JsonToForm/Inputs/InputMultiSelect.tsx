import { MenuItem } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import { MultiSelectField } from '../JsonToForm';
import { useContext } from 'react';
import { FormContext } from '../FormContext';

const InputMultiSelect: React.FC<MultiSelectField> = ({ name, values, label, disabled, empty }: MultiSelectField) => {
  const { fields, setValue, errors, loading } = useContext(FormContext);
  const error = errors[name] || null;

  const value = fields[name] || [];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (option) => {
    const values = [...value];
    const index = values.findIndex((item) => item.value === option.value);

    if (index > -1) {
      values.splice(index, 1);
    } else {
      values.push(option);
    }
    setValue(name, values, { shouldDirty: true });
  };

  const checkActive = (option) => value.find((item) => item.value === option.value);

  return (
    <div className={`input-multi-select${disabled || loading ? ' disabled' : ''}`}>
      <div className='input' onClick={handleClick}>
        {label}
        <ArrowDropDownIcon />
      </div>
      {error && <div className='error'>{error.message}</div>}
      <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        {values.map((option, optionIndex) => (
          <MenuItem key={optionIndex} onClick={() => handleChange(option)} selected={checkActive(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      <div className={`items-selected${!value.length ? ' no-items' : ''}`}>
        {!value.length && <strong>{empty}</strong>}
        {value.map((item, itemIndex) => (
          <div key={itemIndex} className='item-selected'>
            <span>{item.label || item}</span>
            <CancelIcon onClick={() => handleChange(item)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputMultiSelect;
