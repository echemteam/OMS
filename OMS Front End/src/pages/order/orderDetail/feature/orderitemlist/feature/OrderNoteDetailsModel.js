import React from 'react'
import NoRecordFound from '../../../../../../components/FinalMolGrid/ui/noRecordFound/NoRecordFound'

const OrderNoteDetailsModel = ({ orderNote }) => {
  return (
    <div className='order-notes'>
      <div className='ordercard-title'>Order Notes</div>
      {orderNote ?
        <div className='ordercard-body'>
          <span>{orderNote}</span>
        </div>
        : <NoRecordFound />
      }
    </div>
  )
}

export default OrderNoteDetailsModel