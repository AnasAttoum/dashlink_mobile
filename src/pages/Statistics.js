import React from 'react'
import CircleCharts from '../components/statistics/CircleChart'
import { useSelector } from 'react-redux'
import SimpleBarChart from '../components/statistics/SimpleBarChart'
import Card from '../components/statistics/Card'

import styles from '../styles/statistics.module.css'

export default function Statistics() {

  const devices = useSelector(state => state.Devices)
  const accessories = useSelector(state => state.Accessories)
  const offers = useSelector(state => state.Offers)

  return (
    <div className='flex flex-col flex-wrap'>

      <div className={`flex justify-evenly ${styles.container}`}>
        <div className={`flex gap-10 relative ${styles.circles}`} >
          <div className={`flex flex-col justify-center items-center gap-5 m-5 p-5 rounded-full ${styles.card}`} style={{ backgroundColor: 'var(--secondaryWithOpacity)', aspectRatio: '1/1', width: '240px',backdropFilter:'blur(3px)' }}>
            <div style={{ color: '#fff' }}>Gain valuable insights into</div>
            <div style={{ color: '#fff', fontWeight: '700' }}>DashLink Mobile</div>
          </div>
          <Card devices={devices} />
        </div>

        <CircleCharts length={[devices.length, accessories.length, offers.length]} />
      </div>

      <SimpleBarChart accessories={accessories} devices={devices} />
    </div>
  )
}
