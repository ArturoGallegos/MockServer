import { Box, Divider, Grid } from '@material-ui/core';
import React from 'react';
import GridField from './GridField';
import { Fields } from './JsonToForm';

type PropsType = {
  fields: Fields[];
  defaultData?: any;
  loading?: boolean;
};

const GridFields: React.FC<PropsType> = ({ fields, defaultData, loading }: PropsType) => {
  return (
    <Box sx={{ flexGrow: 1 }} className='box-fields'>
      <Grid container spacing={2} className='container-fields'>
        {fields.map((field, fieldIndex) => {
          if (field.hide) return '';
          if (field.type === 'divider') {
            return (
              <Grid item xs={12} className={field.spacer ? 'divider spacer' : 'divider'} key={field.type + fieldIndex}>
                <Divider />
              </Grid>
            );
          }
          if (field.type !== 'component' && field.type !== 'button') {
            field.defaultValue = !!defaultData && !!defaultData[field.name] ? defaultData[field.name] : '';
          }
          return <GridField field={field} key={field.type + fieldIndex} />;
        })}
      </Grid>
    </Box>
  );
};

export default GridFields;

// defaultData[field.name] || ''
