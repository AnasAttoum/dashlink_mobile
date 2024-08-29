import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/logIn.module.css'
import InputMUI from '../components/Inputs/InputMUI'
import { logIn } from '../Reducers/actions'

export default function LogIn() {

  const [warning, setWarning] = useState('')
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const dispatch = useDispatch()
  const adminData = useSelector(state => state.Admin)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'DashLink Mobile | LogIn'
    if (adminData.isLogged)
      navigate('/statistics')
  }, [adminData, navigate])

  const handleLogIn = () => {
    if (data.username === adminData.username && data.password === adminData.password) {
      setWarning('')
      dispatch(logIn())
      navigate('/statistics')
    }
    else {
      setWarning('Invalid username or password')
    }
  }

  return (
    <div className='flex justify-center items-center' style={{ minHeight: '100vh' }}>
      <div className={styles.container}>
        <div className='flex flex-col justify-center items-center text-xl font-bold' style={{ color: 'var(--primary)' }}>
          <div className='text-2xl'>DashLink Mobile</div>
          <InputMUI title='Username' type='username' currentVal={data.username} setData={setData} width='80%' color='#2d8b5f' />
          <InputMUI title='Password' type='password' currentVal={data.password} setData={setData} width='80%' color='#2d8b5f' />

          <div className='text-center text-base' style={{ color: '#d20000' }}>{warning}</div>
          <div className='flex justify-center my-5'>
            <div className={styles.logIn} onClick={handleLogIn}>L O G &nbsp; I N</div>
          </div>
        </div>
      </div>
    </div>
  )
}
