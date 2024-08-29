import React from 'react'

import styles from '../../styles/statistics.module.css'

export default function Card({ devices }) {
  const version = devices.reduce((acc, device) => {
    return acc + device.ram.length
  }, 0)
  return (
    <div className={`flex flex-col justify-center items-center gap-5 m-5 p-5 rounded-full ${styles.card}`} style={{backgroundColor: 'var(--secondaryWithOpacity)',aspectRatio:'1/1',width:'240px',backdropFilter:'blur(3px)' }}>
      <div>Our Company Contains:</div>
      <div><span className={styles.cardVersion}>{version}</span> Versions of mobiles</div>
    </div>
  )
}
