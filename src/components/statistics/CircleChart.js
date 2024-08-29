import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


export default function CircleCharts({length}) {
    return (
        <div className='flex justify-center items-center m-5 p-5 rounded-md' style={{backgroundColor:'#fff'}}>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: length[0], label: 'Devices' ,color:'var(--primary)' },
                            { id: 1, value: length[1], label: 'Accessories' },
                            { id: 2, value: length[2], label: 'Offers',color:'var(--secondaryWithOpacity)' },
                        ],
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    );
}
