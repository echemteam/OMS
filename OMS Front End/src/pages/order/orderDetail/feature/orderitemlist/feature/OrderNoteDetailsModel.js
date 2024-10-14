import React from 'react'
import NoRecordFound from "../../../../../../components/ui/noRecordFound/NoRecordFound"

const OrderNoteDetailsModel = ({ orderNoteDetails }) => {
  return (
    <div className='order-notes'>
      <div className='ordercard-title'>Order Notes</div>
      {orderNoteDetails && orderNoteDetails.note ?
        <div className='ordercard-body'>
          <span>{orderNoteDetails?.note}</span>
        </div>
        : <NoRecordFound message="Notes unavailable." />
      }
    </div>
  )
}

export default OrderNoteDetailsModel