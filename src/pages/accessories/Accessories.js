import React from 'react'
import TableAccessoriesMUI from '../../components/Tables/TableAccessoriesMUI'
import FloatingButton from '../../components/FloatingButton'

export default function Accessories() {
    return (
        <div className='m-5 p-5'>
            <TableAccessoriesMUI />
            <FloatingButton link='/accessories/add'/>
        </div>
    )
}
