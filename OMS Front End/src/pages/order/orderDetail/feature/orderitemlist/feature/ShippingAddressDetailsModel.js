import React from 'react'

const ShippingAddressDetailsModel = ({ address }) => {

  return (
    <div className='shipping-address'>
      {address &&
        <>
          <div className='addresscard-title'>{`${address.type} Address`}</div>
          <div className='addresscard-body'>
            <span>{address.addressLine1}</span>
            <span>{address?.addressLine2}</span>
            <span>
              {address?.cityName},{" "}
              {address?.stateCode ? address?.stateCode : address?.stateName}{" "}
              {address?.zipCode}
            </span>
            <span>{address?.countryName}</span>
          </div>
        </>
      }
    </div>
  )
}

export default ShippingAddressDetailsModel
