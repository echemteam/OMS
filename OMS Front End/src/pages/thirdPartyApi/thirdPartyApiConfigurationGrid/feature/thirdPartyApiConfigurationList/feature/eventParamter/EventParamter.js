import React, { useRef, useState } from 'react'
import CardSection from '../../../../../../../components/ui/card/CardSection';
import SidebarModel from '../../../../../../../components/ui/sidebarModel/SidebarModel';
import { AppIcons } from '../../../../../../../data/appIcons';
import AddEditEventParameter from './feature/AddEditEventParameter';
import EventParameterList from './feature/EventParameterList';

const EventParamter = ({ keyId }) => {
  const childRef = useRef();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [getData, setGetData] = useState(null)

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };

  const handleDataToggleModal = (data) => {
    setIsModelOpen(true);
    setGetData(data)
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
    setGetData(null)
  };

  const onGetData = () => {
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  return (
    <>
      <CardSection
        cardTitle="Event Mapping"
        buttonClassName="btn theme-button"
        // rightButton={buttonVisible ? true : false}
        rightButton={true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <EventParameterList
          keyId={keyId}
          childRef={childRef}
          handleDataToggleModal={handleDataToggleModal}
        />
      </CardSection>

      <SidebarModel
        modalTitle="Event Mapping"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditEventParameter
          onClose={onSidebarClose}
          isOpen={isModelOpen}
          keyId={keyId}
          onGetData={onGetData}
          getData={getData}
        />
      </SidebarModel>
    </>
  )
}

export default EventParamter