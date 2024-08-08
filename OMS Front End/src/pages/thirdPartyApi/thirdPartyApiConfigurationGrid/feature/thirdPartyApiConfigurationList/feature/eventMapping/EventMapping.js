import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import CardSection from '../../../../../../../components/ui/card/CardSection'
import { AppIcons } from '../../../../../../../data/appIcons'
import EventMappingList from './feature/EventMappingList'
import SidebarModel from '../../../../../../../components/ui/sidebarModel/SidebarModel'
import AddEditEventMapping from './feature/AddEditEventMapping'
import "../../../../../../customerDetail/CustomerSupplier.scss";


const EventMapping = ({ keyId, setEndpointId }) => {
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
      <div className='customer-desc-left-sec'>

        <CardSection
          cardTitle="API Provider"
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
            setIsProviderData={setIsProviderData}
          />
        </CardSection>
      </div>

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
EventMapping.propTypes = {
  keyId: PropTypes.number.isRequired,
  setEndpointId: PropTypes.func.isRequired,
};
export default EventMapping