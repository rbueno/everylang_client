import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { CustomSmallSelect } from '../../../../components/custom-input';
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

GraphEngagement.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function GraphEngagement({ title, subheader, chart }) {
  const { colors, categories, series, options } = chart;

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card >
      <CardHeader
        title={title}
        subheader={subheader}
      />

        <Box  sx={{ mt: 3, mx: 3 }} dir="ltr">
          <Chart type="line" series={series[0].data} options={chartOptions} height={364} />
        </Box>
    </Card>
  );
}
