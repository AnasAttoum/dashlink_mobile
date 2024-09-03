import { useContext } from 'react'
import styles from '../styles/Footer.module.css'
import { Mode } from '../store/Context'

export default function Footer() {

  const { mode } = useContext(Mode)

  return (
    <>
      <div className={styles.footer}
      style={mode==='dark'?{backgroundColor:'#222'}:{}}>
        Copyright © 2024 DashLink Mobile. All Right Reserved.
      </div>
    </>
  )
}
