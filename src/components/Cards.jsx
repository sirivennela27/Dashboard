import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function Cards({vehicles=[]}) {
  


  const getUniqueCount = (key) => {
    const uniqueValues = new Set((vehicles).map((item) => item[key]));
    return uniqueValues.size;
  };

  const totalRows = vehicles.length;
  const totalCountries = getUniqueCount('Country');
  const totalBrands = getUniqueCount('Brand');
  const totalSegments = getUniqueCount('Business_segment');

  const stats = [
    { title: 'Total Rows', value: totalRows },
    { title: 'Countries', value: totalCountries },
    { title: 'Brands', value: totalBrands },
    { title: 'Business Segments', value: totalSegments },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        gap: 1,
        mb: 2,
        px: 1,
      }}
    >
      {stats.map((stat) => (
        <Card
          key={stat.title}
          sx={{
            backgroundColor: '#fbf6e4ff',
            color: '#1E1E1E',
            flex: '1 1 130px',
            width: '190px',
            height: '100px',
            flexShrink: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            m: 0.5,
          }}
        >
          <CardContent sx={{ p: 0.5 }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                mt: 1.5,
              }}
            >
              {stat.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                mt: 1,
              }}
            >
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
