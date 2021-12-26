import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useContext } from 'react';
import { FormContext } from '../FormContext';
import { ButtonField } from '../JsonToForm';

type PropsType = Partial<ButtonField>;

const InputButton: React.FC<PropsType> = ({ onClick, fields, label, color, equal, icon }: PropsType) => {
  const { fields: formFields, errors, setError, dirtyFields, loading } = useContext(FormContext);

  const [loader, setLoader] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);

  useEffect(() => {
    if (send) {
      return setSend(false);
    }
  }, [formFields]);

  const handleClick = async () => {
    let sendData = formFields;

    if (fields) {
      sendData = fields.reduce((data, value) => {
        data[value] = formFields[value] || null;
        return data;
      }, {});
    }
    setLoader(true);
    const response = await onClick(sendData);

    if (response.error) {
      setError(response.error.input, { type: 'fail', message: response.error.message });
    }

    setLoader(false);
    setSend(true);
  };

  const disabled = () => {
    if (send || loading) return true;

    if (!equal) return false;

    if (equal.length === 1) {
      return !formFields[equal[0]] || errors[equal[0]] || !dirtyFields[equal[0]];
    }

    let check = false;

    equal.forEach((item) => {
      if (check) return;

      check = !formFields[item] || errors[item] || !dirtyFields[item];
    });

    return check;
  };

  return (
    <Button className='input-button' onClick={handleClick} variant='contained' color={color} disabled={disabled()}>
      {loader ? (
        <CircularProgress color='inherit' size={16} />
      ) : (
        <>
          {label}
          {icon}
        </>
      )}
    </Button>
  );
};

export default InputButton;
