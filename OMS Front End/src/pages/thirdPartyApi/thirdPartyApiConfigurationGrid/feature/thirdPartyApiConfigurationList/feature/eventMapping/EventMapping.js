import React, { useRef, useState } from 'react'
import CardSection from '../../../../../../../components/ui/card/CardSection'
import { AppIcons } from '../../../../../../../data/appIcons'
import EventMappingList from './feature/EventMappingList'
import SidebarModel from '../../../../../../../components/ui/sidebarModel/SidebarModel'
import AddEditEventMapping from './feature/AddEditEventMapping'

const EventMapping = ({ keyId, setEndpointId, setProviderId }) => {
  const childRef = useRef();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isProviderData, setIsProviderData] = useState(false);

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
        cardTitle="Event Mapping"
        buttonClassName="btn theme-button"
        // rightButton={buttonVisible ? true : false}
        rightButton={isProviderData ? false : true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <EventMappingList
          keyId={keyId}
          childRef={childRef}
          setEndpointId={setEndpointId}
          setProviderId={setProviderId}
          setIsProviderData={setIsProviderData}
        />
      </CardSection>

      <SidebarModel
        modalTitle="Add Event Mapping"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditEventMapping
          onClose={onSidebarClose}
          isOpen={isModelOpen}
          keyId={keyId}
          onGetData={onGetData}
        />
      </SidebarModel>
    </>
  )
}

export default EventMapping