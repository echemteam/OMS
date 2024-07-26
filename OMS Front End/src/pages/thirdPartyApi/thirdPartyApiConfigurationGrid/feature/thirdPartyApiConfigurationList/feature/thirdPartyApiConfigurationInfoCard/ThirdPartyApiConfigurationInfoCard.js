import React from 'react'
import { AppIcons } from '../../../../../../../data/appIcons'
import Image from '../../../../../../../components/image/Image'

const ThirdPartyApiConfigurationInfoCard = ({ editClick, viewCardDetails }) => {
    console.log("viewCardDetails", viewCardDetails)
    return (
        <div className="basic-customer-detail">
            <div className="d-flex col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="field-desc">
                    <div className="inf-label">Event Name</div>
                    <b>&nbsp;:&nbsp;</b>
                    <div className="info-desc">{viewCardDetails?.eventName}</div>
                </div>
                <div className="field-desc">
                    <div className="inf-label">Description</div>
                    <b>&nbsp;:&nbsp;</b>
                    <div className="info-desc">{viewCardDetails?.description}</div>
                </div>
                <div className="edit-icons"
                    onClick={editClick}
                >
                    <Image imagePath={AppIcons.editThemeIcon} altText="Website Icon" />
                </div>
            </div>
        </div>
    )
}

export default ThirdPartyApiConfigurationInfoCard