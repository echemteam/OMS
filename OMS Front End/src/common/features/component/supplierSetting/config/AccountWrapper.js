import React from 'react';

const AccountWrapper = ({ children }) => {
    return (
        <>
            <div className='page-title'>
                <h6 className='form-wrapper'>Account Information:</h6>
            </div>
            <div className='form-card row'>
                {children} {/* Corrected prop usage */}
            </div>
        </>
    );
}

export default AccountWrapper