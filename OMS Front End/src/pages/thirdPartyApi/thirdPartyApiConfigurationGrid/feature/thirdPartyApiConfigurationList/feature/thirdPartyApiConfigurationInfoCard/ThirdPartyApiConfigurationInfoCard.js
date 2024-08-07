import React from 'react'
import { AppIcons } from '../../../../../../../data/appIcons'
import Image from '../../../../../../../components/image/Image'

const ThirdPartyApiConfigurationInfoCard = ({ editClick, viewCardDetails }) => {
    return (
        <div className='customer-desc-left-sec'>
            <div className="basic-customer-detail">
                <div className="d-flex col-xl-12 col-lg-12 col-md-12 col-12 configuration-seprations">
                    <div className='col-6'>
                        <div className="field-desc">
                            <div className="inf-label">Event Name</div>
                            <b>&nbsp;:&nbsp;</b>
                            <div className="info-desc">{viewCardDetails?.eventName}</div>
                        </div>
                    </div>
                    <div className='col-6 separator'>
                        <div className="field-desc ">
                            <div className="inf-label">Description</div>
                            <b>&nbsp;:&nbsp;</b>
                            <div className="info-desc">{viewCardDetails?.description}</div>
                        </div>
                    </div>
                    <div className="edit-icons"
                        onClick={editClick}
                    >
                        <Image imagePath={AppIcons.editThemeIcon} altText="Website Icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThirdPartyApiConfigurationInfoCard