import React from 'react';
import { Grid, Link } from '@material-ui/core';
import InputPassword from './Inputs/InputPassword';
import InputText from './Inputs/InputText';
import { Fields } from './JsonToForm';
import InputCalendar from './Inputs/InputCalendar';
import InputSelect from './Inputs/InputSelect';
import InputSwitch from './Inputs/InputSwitch';
import InputButton from './Inputs/InputButton';
import InputMultiSelect from './Inputs/InputMultiSelect';
import InputDragImage from './Inputs/InputDragImage';
import InputImage from './Inputs/InputImage';
import SelectList from './Inputs/SelectList';
import InputLocations from './Inputs/InputLocations';
import InputCheckbox from './Inputs/InputCheckbox';
import InputSelectListText from './Inputs/InputSelectListText';
import InputAutoComplete from './Inputs/InputAutoComplete';
import InputDays from './Inputs/InputDays';

type PropsType = {
  field: Fields;
};

const Input: React.FC<PropsType> = ({ field }: PropsType) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
      return <InputText field={field} />;
    case 'password':
      return <InputPassword field={field} />;
    case 'calendar':
      return <InputCalendar {...field} />;
    case 'select':
      return <InputSelect {...field} />;
    case 'switch':
      return <InputSwitch {...field} />;
    case 'button':
      return <InputButton {...field} />;
    case 'multiselect':
      return <InputMultiSelect {...field} />;
    case 'selectlist':
      return <SelectList {...field} />;
    case 'dragimage':
      return <InputDragImage {...field} />;
    case 'component':
      return field.element;
    case 'image':
      return <InputImage {...field} />;
    case 'locations':
      return <InputLocations />
    case 'checkbox':
      return <InputCheckbox {...field} />;
    case 'autocomplete':
      return <InputAutoComplete {...field} />;
    case 'days':
      return <InputDays {...field} />;
    case 'select-list-text':
      return <InputSelectListText {...field} />;
    default:
      return null;
  }
};

const GridField = ({ field }) => {
  return (
    <Grid item md={field.md || 12}>
      <Input field={field} />
      {field.link && (
        <Link className='field-link' href={field.link.href} target={field.link.target || '_blank'}>
          {field.link.label}
        </Link>
      )}
    </Grid>
  );
};

export default GridField;
