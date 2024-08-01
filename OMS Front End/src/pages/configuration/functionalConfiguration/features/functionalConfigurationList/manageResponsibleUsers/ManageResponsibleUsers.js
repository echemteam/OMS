import React, { useRef, useState } from 'react'
import AddEditManageResponsibleUser from './feature/AddEditManageResponsibleUser'
import ManageResponsibleUserList from './feature/ManageResponsibleUserList'
import CardSection from '../../../../../../components/ui/card/CardSection'
import { AppIcons } from '../../../../../../data/appIcons'
import SidebarModel from '../../../../../../components/ui/sidebarModel/SidebarModel'

const ManageResponsibleUsers = (props) => {

    const childRef = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModelOpen(true);
    };

    const onSidebarClose = () => {
        setIsModelOpen(false);
    };

    const onGetData = () => {
        if (childRef.current) {
            childRef.current.callChildFunction();
        }
    };

    return (
        <div>
            <CardSection
                cardTitle="Manage Responsible Users"
                buttonClassName="btn theme-button"
                // rightButton={buttonVisible ? true : false}
                rightButton={true}
                buttonText="Add"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                titleButtonClick={handleToggleModal}
            >
                <ManageResponsibleUserList
                    functionalityId={props.functionalityId}
                    childRef={childRef}
                />
            </CardSection>

            <SidebarModel
                modalTitle="Add Responsible User"
                contentClass="content-35"
                onClose={onSidebarClose}
                modalTitleIcon={AppIcons.AddIcon}
                isOpen={isModelOpen}
            >
                <AddEditManageResponsibleUser
                    onClose={onSidebarClose}
                    isOpen={isModelOpen}
                    functionalityId={props.functionalityId}
                    onGetData={onGetData}
                />
            </SidebarModel>
        </div>
    )
}

export default ManageResponsibleUsers