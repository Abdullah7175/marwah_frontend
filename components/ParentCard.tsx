import React from 'react';

import { Card, CardHeader, CardContent, Divider, Box } from '@mui/material';


type Props = {
  title: string;
  footer?: string | JSX.Element;
  children: JSX.Element;
};

const ParentCard = ({ title, children, footer }: Props) => {




  return (
    <Card
      sx={{ padding: 2, borderRadius:10}} className='mx-10 my-10'
      elevation={2}
  
    >
      <CardHeader title={title} />
      <Divider />

      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ''
      )}
    </Card>
  );
};

export default ParentCard;
