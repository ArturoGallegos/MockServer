import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useContext, useState } from 'react';
import { FormContext } from '../FormContext';
import { CalendarField } from '../JsonToForm';

const InputCalendar: React.FC<CalendarField> = ({ format = 'MM/dd/yyyy', defaultValue = null, name, label, options = {} }: CalendarField) => {
  const { fields, register, setValue, loading, errors } = useContext(FormContext);
  register(name, options);
  const currentValue = fields[name] || defaultValue;
  const error = errors[name];
  const [currentDate, setCurrentDate] = useState<string>(currentValue);

  const handleChange = (_, date) => {
    setCurrentDate(date);
    setValue(name, date, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        margin='normal'
        label={label}
        format={format}
        value={currentDate || null}
        onChange={handleChange}
        autoOk
        fullWidth
        disabled={loading}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        className='input-calendar'
      />
      {!!error && <span className="error">{error.message || '*Required'}</span>}
    </MuiPickersUtilsProvider>
  );
};

export default InputCalendar;
