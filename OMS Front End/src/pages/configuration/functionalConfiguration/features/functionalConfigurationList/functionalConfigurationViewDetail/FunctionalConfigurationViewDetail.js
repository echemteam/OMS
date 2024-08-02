import React from 'react'
import CardSection from '../../../../../../components/ui/card/CardSection'
import FunctionalConfigurationViewTabs from '../functionalConfigurationViewTabs/FunctionalConfigurationViewTabs'
import { AppIcons } from '../../../../../../data/appIcons'
import { useNavigate, useParams } from 'react-router-dom'
import { decryptUrlData } from '../../../../../../services/CryptoService'

const FunctionalConfigurationViewDetail = () => {
    const { id , data } = useParams();
    const functionalityId = id ? decryptUrlData(id) : 0;
    const moduleName = data ? decryptUrlData(data) : '';
    const navigate = useNavigate();

    const BackButton = () => {
        navigate("/FunctionalConfiguration");
    }

    return (
         
            <div className='mt-3'>
                <CardSection
                    cardTitle={moduleName}
                    rightButton={true}
                    buttonText="Back"
                    buttonClassName="btn dark-btn"
                    titleButtonClick={BackButton}
                    textWithIcon={true}
                    iconImg={AppIcons.BackArrowIcon}
                >
                    <FunctionalConfigurationViewTabs functionalityId={functionalityId} />
                </CardSection>
            </div>
        
    )
}

export default FunctionalConfigurationViewDetail