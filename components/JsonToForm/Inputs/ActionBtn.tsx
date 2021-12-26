import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { FormContext } from '../FormContext';
import { Action } from '../JsonToForm';

type PropsType = Partial<Action>;

const ActionBtn: React.FC<PropsType> = ({ label, disabled: customDisabled, submit, type, variant, action, hide, requiredFields, requiredDirty }: PropsType) => {
  const { errors, fields, dirtyFields, loading } = useContext(FormContext);

  const disabled = () => {
    if (loading || customDisabled || (Object.keys(errors).length && submit)) return true;

    if (requiredDirty && !Object.keys(dirtyFields).length) return true;

    if (!requiredFields || requiredFields.length === 0) return false;

    let status = false;

    requiredFields.forEach((item) => {
      if (!status) {
        status = !fields[item];
      }
    });

    return status;
  };

  const handleAction = () => {
    action(fields);
  };

  if (hide) return <> </>;

  if (submit) {
    return (
      <Button className='save' variant='contained' color='primary' type='submit' disabled={disabled()}>
        {label}
      </Button>
    );
  }
  return (
    <Button className={type || 'cancel'} variant={variant === 'primary' ? 'contained' : 'outlined'} color={variant} onClick={typeof action !== 'undefined' ? handleAction : null} disabled={disabled()}>
      {label}
    </Button>
  );
};

export default ActionBtn;
