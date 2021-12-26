import { InputAdornment, MenuItem, Select, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useState } from 'react';
import { FormContext } from '../FormContext';
import { SelectListField } from '../JsonToForm';

type PropsType = Partial<SelectListField>;

const SelectElement = ({ placeholder, values, onChange, value }) => {
  const handleChange = (event) => {
    const selected = values.find((item) => item.value === event.target.value);
    onChange(selected);
  };
  return (
    <Select className='select-list__field' onChange={handleChange} value={value?.selected.value || ''} displayEmpty>
      <MenuItem value='' disabled>
        {placeholder}
      </MenuItem>
      {values.map((item, itemIndex) => (
        <MenuItem key={itemIndex} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

const SelectList: React.FC<PropsType> = ({ name, title, searchable, label, actionLabel, values }: PropsType) => {
  const { register, setValue, fields, loading } = useContext(FormContext);
  register(name);
  const current = fields[name] || [];

  const currentValue = (id) => {
    return current.find((item) => item.id === id);
  };

  const [searchValue, setSearchValue] = useState<string>('');

  const handleUpdate = (item, selected) => {
    const update = [...current];
    update.push({ ...item, selected });
    setValue(name, update, { shouldValidate: true, shouldDirty: true });
  };

  const filteredValues = searchable && searchValue ? values.filter((item) => item.label.toLowerCase().includes(searchValue)) : values;

  const handleSearch = (event) => setSearchValue(event.target.value.toLowerCase());

  return (
    <div className='select-list'>
      <div className='select-list__header'>
        <div className='select-list__title'>{title}</div>
        <div className='select-list__search'>
          <TextField
            variant='outlined'
            className='select-list__search_input'
            placeholder='Search Location'
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'end'}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='select-list__content'>
        <div className='select-list__data-header'>
          <Checkbox className='select-list__items-check' />
          <div className='select-list__items-label'>{label}</div>
          <div className='select-list__items-action-label'>{actionLabel}</div>
        </div>
        <div className='select-list__items'>
          {filteredValues.map((item, itemIndex) => (
            <div key={itemIndex} className='select-list__item'>
              <Checkbox className='select-list__items-check' />
              <div className='select-list__item--label'>{item.label}</div>
              <SelectElement values={item.values} value={currentValue(item.id)} onChange={(value) => handleUpdate(item, value)} placeholder={item.placeholder} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectList;
