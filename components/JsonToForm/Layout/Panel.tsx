import { Grid } from '@material-ui/core';
import React from 'react';

type PropsType = {
  tab: number;
  index: number;
  children: any;
};

const Panel: React.FC<PropsType> = ({ tab, index, children }: PropsType) => {
  if (tab !== index) return null;

  return (
    <Grid className='sector-container' container spacing={3}>
      {children}
    </Grid>
  );
};

export default Panel;
