import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleBarChart({ accessories, devices }) {

  const num = devices.map(device => {
    return {

      data: [accessories.reduce((acc, accessory) => {
        if (accessory.device.includes(device.name))
          return acc + 1
        return acc + 0
      }, 0)],

      label: device.name

    }
  })

  return (
    <div className='m-5 rounded-md' style={{ backgroundColor: '#fff' }}>
      <BarChart
        series={num}
        height={350}
        xAxis={[{ data: ['Number of accessories for each device'], scaleType: 'band' }]}
      // margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  );
}