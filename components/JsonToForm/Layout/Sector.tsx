import React from 'react';
import { Grid } from '@material-ui/core';

type PropsType = { title?: string; children: any | any[] };

const Sector: React.FC<PropsType> = ({ title, children }: PropsType) => (
  <>
    {title && (
      <Grid item md={12} className='sector-title'>
        <h3>{title}</h3>
      </Grid>
    )}
    {children}
  </>
);

export default Sector;
