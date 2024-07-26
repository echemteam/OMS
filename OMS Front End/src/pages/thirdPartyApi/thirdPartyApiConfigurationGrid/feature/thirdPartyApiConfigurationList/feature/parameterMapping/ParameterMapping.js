import React, { useRef, useState } from 'react'
import ParameterMappingList from './feature/ParameterMappingList';
import AddEditParameterMapping from './feature/AddEditParameterMapping';
import CardSection from '../../../../../../../components/ui/card/CardSection';
import { AppIcons } from '../../../../../../../data/appIcons';
import SidebarModel from '../../../../../../../components/ui/sidebarModel/SidebarModel';

const ParameterMapping = ({ keyId }) => {
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
        cardTitle="Parameter Mapping"
        buttonClassName="btn theme-button"
        // rightButton={buttonVisible ? true : false}
        rightButton={true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <ParameterMappingList
          keyId={keyId}
          childRef={childRef}
        />
      </CardSection>

      <SidebarModel
        modalTitle="Add Parameter Mapping"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditParameterMapping
          onClose={onSidebarClose}
          isOpen={isModelOpen}
          keyId={keyId}
          onGetData={onGetData}
        />
      </SidebarModel>
    </>
  )
}

export default ParameterMapping