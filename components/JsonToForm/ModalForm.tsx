import { DialogContent, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import JsonToForm from 'components/common/JsonToForm';
import React, { ReactElement } from 'react';
import { FormComponent } from './JsonToForm';

type headerData = {
  label: string;
  value: string | number;
};

type PropsType = {
  id?: string;
  onClose(): void;
  onSubmit(data: any): void;
  header: {
    title: string;
    icon?: Element | ReactElement;
    content?: Element;
    data?: headerData[];
  };
  defaultData?: any;
  form: FormComponent;
  onChange?: (data: any) => void;
  resolver?: any;
  loading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
};

const ModalForm: React.FC<PropsType> = ({ loading = false, header, resolver, onClose, form, onSubmit, defaultData, onChange, maxWidth = 'md', className, id }: PropsType) => {
  return (
    <Dialog className={`modal-form${className ? ' ' + className : ''}`} maxWidth={maxWidth} onClose={onClose} fullWidth open>
      <DialogTitle disableTypography={true}>
        <h2>
          {Boolean(header.icon) && <span>{header.icon}</span>}
          {header.title}
          {!!onClose && (
            <IconButton onClick={onClose} className='close'>
              <CloseIcon />
            </IconButton>
          )}
        </h2>
        {header.content}
        {header.data && (
          <div className='details'>
            {header.data.map((item, itemIndex) => (
              <div key={itemIndex}>
                <strong>{item.label}</strong>
                {item.value}
              </div>
            ))}
          </div>
        )}
      </DialogTitle>
      <DialogContent className='modal-content' dividers>
        <JsonToForm loading={loading} resolver={resolver} jsonData={form} variant='modal' onChange={onChange} onSubmit={onSubmit} defaultData={defaultData} id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ModalForm);
