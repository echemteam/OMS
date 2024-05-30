import React from 'react'
import "./Footer.scss";

function Footer() {
    return (
        <div className='footer-main'>
            <div className='custom-width-foot'>
                <div className='row'>
                    <div className='col-12'>
                        <p>© {(new Date().getFullYear())} <span className='brand-name'>OMS Lite</span>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer