import React from 'react'
import TableDevicesMUI from '../../components/Tables/TableDevicesMUI'
import FloatingButton from '../../components/FloatingButton'

export default function Devices() {
    return (
        <div className='m-5 p-5'>
            <TableDevicesMUI />
            <FloatingButton link='/devices/add'/>
        </div>
    )
}
