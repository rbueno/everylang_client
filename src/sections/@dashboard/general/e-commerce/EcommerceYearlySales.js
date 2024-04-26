import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { CustomSmallSelect } from '../../../../components/custom-input';
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

EcommerceYearlySales.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
  height: PropTypes.number,
};

export default function EcommerceYearlySales({ title, subheader, chart, ...other }) {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState('2019');

  const chartOptions = useChart({
    colors,
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other}>
      {
        series && series.length && series[0].year ? <>
          <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event) => setSeriesData(event.target.value)}
          >
            {series.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />
        </> : <>
        <CardHeader
        title={title}
        subheader={subheader}
      />
        </>
      }
      

      {  series && series.length && series[0].year && series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <Chart type="area" series={item.data} options={chartOptions} height={other.height || 364} />
          )}
        </Box>
      ))}
      {  series && series.length && !series[0].year && <>
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <Chart type="area" series={series[0].data} options={chartOptions} height={other.height || 364} />
        </Box>
      </>}
    </Card>
  );
}
