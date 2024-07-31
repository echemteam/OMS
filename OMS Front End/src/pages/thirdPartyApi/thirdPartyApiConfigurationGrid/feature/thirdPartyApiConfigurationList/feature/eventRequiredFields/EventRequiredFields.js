import React, { useRef, useState } from 'react'
import EventRequiredFieldsList from './feature/EventRequiredFieldsList';
import AddEditRequiredFields from './feature/AddEditRequiredFields';
import CardSection from '../../../../../../../components/ui/card/CardSection';
import { AppIcons } from '../../../../../../../data/appIcons';
import SidebarModel from '../../../../../../../components/ui/sidebarModel/SidebarModel';

const EventRequiredFields = ({ keyId }) => {
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
        cardTitle="Event Required Fields"
        buttonClassName="btn theme-button"
        // rightButton={buttonVisible ? true : false}
        rightButton={true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <EventRequiredFieldsList
          keyId={keyId}
          childRef={childRef}
          handleDataToggleModal={handleDataToggleModal}
        />
      </CardSection>

      <SidebarModel
        modalTitle="Add Event Required Fields"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditRequiredFields
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

export default EventRequiredFields