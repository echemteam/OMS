import React from 'react'
import CardSection from '../../../../../../components/ui/card/CardSection'
import FunctionalConfigurationViewTabs from '../functionalConfigurationViewTabs/FunctionalConfigurationViewTabs'
import { AppIcons } from '../../../../../../data/appIcons'
import { useNavigate } from 'react-router-dom'

const FunctionalConfigurationViewDetail = () => {
    const navigate = useNavigate();

    const BackButton = () => {
        navigate("/FunctionalConfiguration");
    }
    return (
        <>
            <CardSection
                cardTitle="Functionality 1"
                rightButton={true}
                buttonText="Back"
                buttonClassName="btn dark-btn"
                titleButtonClick={BackButton}
                textWithIcon={true}
                iconImg={AppIcons.BackArrowIcon}
            >
                <FunctionalConfigurationViewTabs />
            </CardSection>

        </>
    )
}

export default FunctionalConfigurationViewDetail