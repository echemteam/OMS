import React from 'react';

const BankAddressWrapper = ({ children }) => {
    return (
        <>
            <div className='page-title'>
                <h6 className='form-wrapper'>Address Information:</h6>
            </div>
            <div className='form-card row'>
                {children} {/* Corrected prop usage */}
            </div>
        </>
    );
}

export default BankAddressWrapper