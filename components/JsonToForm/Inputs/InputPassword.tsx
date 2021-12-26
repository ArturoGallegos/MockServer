import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useContext, useEffect, useRef, useState } from 'react';
import generatePassword from '../../../../helpers/generatePassword';
import { FormContext } from '../FormContext';
import { InputEvent, InputPasswordField } from '../JsonToForm';
import { validatePassword } from './../../../../helpers/validations';

const CheckValidations: React.FC<{ value: string }> = ({ value = '' }) => {
  const hasLowerCase = /[a-z]/.test(value) && value;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const checkLength = value?.length > 7;

  return (
    <ul className='input-password__validation'>
      <li className={hasUpperCase ? 'active' : ''}>Uppercase</li>
      <li className={hasLowerCase ? 'active' : ''}>Lowercase</li>
      <li className={hasNumber ? 'active' : ''}>Number</li>
      <li className={checkLength ? 'active' : ''}>8 Characters</li>
    </ul>
  );
};

const InputPassword = ({ field }: InputPasswordField) => {
  const input = useRef(null);
  const { fields, errors, register, setValue, trigger, loading } = useContext(FormContext);
  const error = errors[field.name] || null;
  const defaultValue = fields[field.name] || null;
  const [showPassword, setShowPassword] = useState(false);
  const hidePassword = typeof field.hidePassword === 'undefined' || field.hidePassword;

  const compare = field.equal ? fields[field.equal.input] : null;

  useEffect(() => {
    if (field.suggest && !defaultValue) {
      const suggestPassword = generatePassword();
      input.current.value = suggestPassword;
      setTimeout(() => {
        setValue(field.name, suggestPassword, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
      }, 500);
    }
  }, [])

  useEffect(() => {
    if (compare && fields[field.name]?.length > 0) {
      trigger([field.name]);
    }
  }, [compare]);

  const handleChange = (event: InputEvent) => {
    const value = event.currentTarget.value.replace(/\s/g, '');
    event.currentTarget.value = value;
    setValue(field.name, value, { shouldValidate: true, shouldDirty: true });
  };

  const validate = field.equal
    ? { ...validatePassword({ equal: fields[field.equal.input], equal_message: field.equal.message, required: field.required || false }), ...field.options }
    : field.options || validatePassword({ required: field.required || false });

  const addIcon = !hidePassword ? null : <InputAdornment position='end'>
    <IconButton aria-label='toggle password visibility' onClick={() => setShowPassword(!showPassword)} edge='end'>
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>;

  return (
    <>
      <FormControl variant='outlined' fullWidth className={`input-text input-password${!error ? '' : ' has-error'}`} error={!!error}>
        <input type='hidden' name={field.name} {...register(field.name, validate)} defaultValue='' />
        <InputLabel>{field.label}</InputLabel>
        <OutlinedInput
          type={(!hidePassword || showPassword) ? 'text' : 'password'}
          onChange={(event) => handleChange(event)}
          fullWidth
          autoComplete='off'
          disabled={loading}
          name=''
          error={!!error}
          defaultValue={defaultValue || ''}
          inputRef={input}
          endAdornment={
            addIcon
          }
          labelWidth={70}
        />
        {!field.hideError && !!error?.message && <FormHelperText className='error-text'>{error.message}</FormHelperText>}
      </FormControl>
      {field.showValidation && <CheckValidations value={defaultValue} />}
    </>
  );
};

export default InputPassword;
