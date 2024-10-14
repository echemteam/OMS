import React from 'react'
import NoRecordFound from "../../../../../../components/ui/noRecordFound/NoRecordFound"

const OrderNoteDetailsModel = ({ orderNote }) => {
  return (
    <div className='order-notes'>
      <div className='ordercard-title'>Order Notes</div>
      {orderNote ?
        <div className='ordercard-body'>
          <span>{orderNote}</span>
        </div>
        : <NoRecordFound message="Notes unavailable."/>
      }
    </div>
  )
}

export default OrderNoteDetailsModel