import React from 'react'
import FunctionalConfigurationViewTabs from '../functionalConfigurationViewTabs/FunctionalConfigurationViewTabs'
import { AppIcons } from '../../../../../../data/appIcons'
import { useNavigate, useParams } from 'react-router-dom'
import { decryptUrlData } from '../../../../../../services/CryptoService'
import Buttons from '../../../../../../components/ui/button/Buttons'

const FunctionalConfigurationViewDetail = () => {
    const { id, data } = useParams();
    const functionalityId = id ? decryptUrlData(id) : 0;
    const moduleName = data ? decryptUrlData(data) : '';
    const navigate = useNavigate();

    const BackButton = () => {
        navigate("/FunctionalConfiguration");
    }

    return (

        <div className=''>
            <div class="main-top-title p-2">
                <div class="left-section">
                    <div class="page-title">
                        <h3>{moduleName}</h3>
                    </div>
                </div>
                <div>
                    <Buttons
                        buttonTypeClassName="dark-btn"
                        iconImg={AppIcons.BackArrowIcon}
                        buttonText="Back"
                        textWithIcon={true}
                        imagePath={AppIcons.BackArrowIcon}
                        onClick={BackButton} />
                </div>
            </div>
            <FunctionalConfigurationViewTabs functionalityId={functionalityId} />
        </div>

    )
}

export default FunctionalConfigurationViewDetail