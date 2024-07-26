import React, { useRef, useState } from 'react'
import { AppIcons } from '../../../data/appIcons'
import CardSection from '../../../components/ui/card/CardSection'
import SidebarModel from '../../../components/ui/sidebarModel/SidebarModel'

const ThirdPartyApiConfigurationList = React.lazy(() => import('./feature/thirdPartyApiConfigurationList/ThirdPartyApiConfigurationList'));
const AddEditThirdPartyApiConfiguration = React.lazy(() => import('./feature/addEditThirdPartyApiConfiguration/AddEditThirdPartyApiConfiguration'));

const ThirdPartyApiConfiguration = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const childRef = useRef();

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
        cardTitle="Third Party Api Configuration"
        buttonClassName="btn theme-button"
        // rightButton={buttonVisible ? true : false}
        rightButton={true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <ThirdPartyApiConfigurationList
          childRef={childRef}
        />
      </CardSection>

      <SidebarModel
        modalTitle="Add Api Event"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditThirdPartyApiConfiguration
          onGetData={onGetData}
          onClose={onSidebarClose}
          isOpen={isModelOpen}
        />
      </SidebarModel>
    </div>
  )
}

export default ThirdPartyApiConfiguration