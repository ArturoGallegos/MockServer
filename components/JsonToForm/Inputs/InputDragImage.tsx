import { Dropzone, FullScreenPreview } from '@dropzone-ui/react';
import { Grid } from '@material-ui/core';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { useContext, useState } from 'react';
import { FormContext } from '../FormContext';
import { DragImageField } from '../JsonToForm';

type PropsType = Omit<DragImageField, 'type'>;

const InputDragImage: React.FC<PropsType> = ({ name, label, limit }) => {
  const { setValue, loading } = useContext(FormContext);
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  const updateFiles = (incommingFiles) => {
    const validImages = incommingFiles.filter((file) => file.valid);
    // const invalidImages = incommingFiles.filter(file => !file.valid);
    setFiles(validImages);
    setValue(name, validImages, { shouldDirty: true });
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  // console.log('files', files)
  const removeImage = (index: number) => {
    const updateFiles = [...files];
    updateFiles.splice(index, 1);
    setFiles(updateFiles);
    setValue(name, updateFiles, { shouldDirty: true });
  };

  return (
    <Grid md={12} className='input-drag-image'>
      <Dropzone
        // view={"list"}
        onChange={updateFiles}
        value={files}
        maxFiles={limit || 1}
        header={false}
        footer={false}
        maxFileSize={2998000}
        label={label}
        accept='.png,image/*'
        uploadingMessage={'Uploading...'}>
        <strong>{label}</strong>
        <FullScreenPreview imgSource={imageSrc} openImage={imageSrc} onClose={() => handleSee(undefined)} />
      </Dropzone>
      <div className='images'>
        {files.length > 0 ? (
          files.map((item, fileIndex) => {
            if (!item.valid) return '';

            const url = URL.createObjectURL(item.file);
            return (
              <div className='image' key={fileIndex}>
                <div className='img'>
                  <span className='remove' onClick={() => removeImage(fileIndex)}>
                    <CancelIcon />
                  </span>
                  <img src={url} alt='' />
                </div>
                <strong>{item.file.name}</strong>
              </div>
            );
          })
        ) : (
          <div className='no-image'>
            <div className='img'>
              <AddPhotoIcon />
            </div>
            <strong>No image</strong>
          </div>
        )}
      </div>
    </Grid>
  );
};

export default InputDragImage;
