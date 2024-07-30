import React, { useState } from 'react'
import FunctionalConfigurationList from './features/functionalConfigurationList/FunctionalConfigurationList';
import AddEditFunctionalConfiguration from './features/addEditFunctionalConfiguration/AddEditFunctionalConfiguration';
import CardSection from '../../../components/ui/card/CardSection';
import SidebarModel from '../../../components/ui/sidebarModel/SidebarModel';
import { AppIcons } from '../../../data/appIcons';
import ModuleSelection from './features/ModuleSelection';

const FunctionalConfiguration = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModelOpen(true);
    };

    const onSidebarClose = () => {
        setIsModelOpen(false);
    };

    return (
        <>
            <CardSection
                cardTitle="Module Selection"
                buttonClassName="btn theme-button"
            // rightButton={buttonVisible ? true : false}
            >
                <ModuleSelection />
            </CardSection>
            <div>
                <CardSection
                    cardTitle="Functional Configuration"
                    buttonClassName="btn theme-button"
                    // rightButton={buttonVisible ? true : false}
                    rightButton={true}
                    buttonText="Add"
                    textWithIcon={true}
                    iconImg={AppIcons.PlusIcon}
                    titleButtonClick={handleToggleModal}
                >
                    <FunctionalConfigurationList />
                </CardSection>

                <SidebarModel
                    modalTitle="Add Api Event"
                    contentClass="content-35"
                    onClose={onSidebarClose}
                    modalTitleIcon={AppIcons.AddIcon}
                    isOpen={isModelOpen}
                >
                    <AddEditFunctionalConfiguration />
                </SidebarModel>
            </div>
        </>

    )
}

export default FunctionalConfiguration