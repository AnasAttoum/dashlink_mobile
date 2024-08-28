import React from 'react'
import FloatingButton from '../../components/FloatingButton'
import TableOffersMUI from '../../components/Tables/TableOffersMUI'

export default function Offers() {
    return (
        <div className='m-5 p-5'>
            <TableOffersMUI />
            <FloatingButton link='/offers/add'/>
        </div>
    )
}
