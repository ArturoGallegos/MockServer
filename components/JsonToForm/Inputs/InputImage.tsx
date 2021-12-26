import { IconButton } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { useContext, useState } from 'react';
import { FormContext } from '../FormContext';

type PropsType = {
  name;
};

const InputImage: React.FC<PropsType> = ({ name }: PropsType) => {
  const { register, fields, setValue, loading } = useContext(FormContext);
  register(name);
  const currentImage = fields[name];
  const [image, setImage] = useState<any>(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setValue(name, file, { shouldDirty: true });
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const handleRemove = () => {
    setValue(name, null, { shouldDirty: true });
    setImage(null);
  };

  return (
    <div className='input-image'>
      <div className='image'>
        <div className={`image__content${!image ? ' no-image' : ''}`}>
          {image ? (
            <>
              <IconButton onClick={handleRemove} disabled={loading}>
                <CancelIcon />
              </IconButton>
              <img src={image} alt='' />
            </>
          ) : (
            <AddAPhotoIcon className='icon' />
          )}
        </div>
        <span className='image__title'>{currentImage?.name || 'No image'}</span>
      </div>
      <label>
        <input type='file' onChange={handleChange} disabled={loading} />
        <span>
          Upload <AddAPhotoIcon className='icon' />
        </span>
      </label>
    </div>
  );
};

export default InputImage;
