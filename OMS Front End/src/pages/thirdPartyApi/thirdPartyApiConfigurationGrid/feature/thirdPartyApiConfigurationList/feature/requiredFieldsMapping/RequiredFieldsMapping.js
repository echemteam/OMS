import React, { useRef, useState } from 'react'
import RequiredMappingList from './feature/RequiredMappingList';
import AddEditRequiredMapping from './feature/AddEditRequiredMapping';
import CardSection from '../../../../../../../components/ui/card/CardSection';
import SidebarModel from '../../../../../../../components/ui/sidebarModel/SidebarModel';
import { AppIcons } from '../../../../../../../data/appIcons';

const RequiredFieldsMapping = ({keyId}) => {
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
    <>
      <CardSection
        cardTitle="Required Fields Map"
        buttonClassName="btn theme-button"
        // rightButton={buttonVisible ? true : false}
        rightButton={true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <RequiredMappingList
          keyId={keyId}
          childRef={childRef}
        />
      </CardSection>

      <SidebarModel
        modalTitle="Add Required Fields Map"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditRequiredMapping
          onClose={onSidebarClose}
          isOpen={isModelOpen}
          keyId={keyId}
          onGetData={onGetData}
        />
      </SidebarModel>
    </>
  )
}

export default RequiredFieldsMapping