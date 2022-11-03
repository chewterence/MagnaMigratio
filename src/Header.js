import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom variant="overline">
        GET1030/GEI1002 Computers and the Humanities Project
      </Typography>
      <Typography variant="h5" component="div">
        Magna{bull}Migratio
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Visualizing the great migration of refugees over the decades
      </Typography>
      <Typography variant="body1">
        Over the decades several individuals across the globe have been displaced from their original homes.
      </Typography>
      <Typography variant="body1">
        This data visualization project utilizes data obtained from
        the United Nations High Commissioner for Refugees (UNHCR), plotting the migration of refugees from various nations over the decades.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">
          Scroll Down for Data Visualization
    </Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
