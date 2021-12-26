import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

type PropsType = {
  children: ReactElement | ReactElement[];
};

const Actions: React.FC<PropsType> = ({ children }: PropsType) => {
  return (
    <Grid className='tab-actions' item md={12}>
      {children}
    </Grid>
  );
};

export default Actions;
