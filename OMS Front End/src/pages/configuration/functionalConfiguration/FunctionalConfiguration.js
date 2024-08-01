import React, { useRef, useState } from 'react'
import FunctionalConfigurationList from './features/functionalConfigurationList/FunctionalConfigurationList';
import AddEditFunctionalConfiguration from './features/addEditFunctionalConfiguration/AddEditFunctionalConfiguration';
import CardSection from '../../../components/ui/card/CardSection';
import SidebarModel from '../../../components/ui/sidebarModel/SidebarModel';
import { AppIcons } from '../../../data/appIcons';
import ModuleSelection from './features/ModuleSelection';
import { AddEditFunctionalData } from './features/addEditFunctionalConfiguration/config/AddEditFunctional.data';

const FunctionalConfiguration = () => {
    const childRef = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [moduleId, setModuleId] = useState(0);
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState(AddEditFunctionalData.initialState);

    const handleToggleModal = () => {
        setIsModelOpen(true);
        setIsEdit(false)
    };

    const onSidebarClose = () => {
        setIsModelOpen(false);
        resetForm()
    };

    const handleModuleID = (data) => {
        setModuleId(data)
    }

    const onGetData = () => {
        if (childRef.current) {
            childRef.current.callChildFunction();
        }
    };

    const resetForm = () => {
        let form = { ...AddEditFunctionalData.initialState };
        setFormData(form);
      };

    const handleEdit = (data) => {
        resetForm()
        setFormData(data);
        setIsEdit(true);
        setIsModelOpen(true);
    };

    return (
        <>
            <CardSection
                cardTitle="Module Selection"
                buttonClassName="btn theme-button"
            >
                <ModuleSelection handleModuleID={handleModuleID} />
            </CardSection>
            {moduleId > 0 &&
                <div>
                    <CardSection
                        cardTitle="Functional Configuration"
                        buttonClassName="btn theme-button"
                        rightButton={true}
                        buttonText="Add"
                        textWithIcon={true}
                        iconImg={AppIcons.PlusIcon}
                        titleButtonClick={handleToggleModal}
                    >
                        <FunctionalConfigurationList moduleId={moduleId} childRef={childRef} onEdit={handleEdit} />
                    </CardSection>

                    <SidebarModel
                        modalTitle={`${isEdit ? "Update" : "Add"} Functional Configuration`}
                        contentClass="content-35"
                        onClose={onSidebarClose}
                        modalTitleIcon={AppIcons.AddIcon}
                        isOpen={isModelOpen}
                    >
                        <AddEditFunctionalConfiguration initData={formData} isEdit={isEdit} onGetData={onGetData} isOpen={isModelOpen} moduleId={moduleId} onClose={onSidebarClose} />
                    </SidebarModel>
                </div>
            }
        </>

    )
}

export default FunctionalConfiguration