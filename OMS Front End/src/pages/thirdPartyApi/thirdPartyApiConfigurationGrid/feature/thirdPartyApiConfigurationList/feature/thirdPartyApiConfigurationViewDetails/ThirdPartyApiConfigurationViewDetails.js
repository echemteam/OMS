import React, { useState } from 'react'
import CardSection from '../../../../../../../components/ui/card/CardSection'
import "../../../../../../customerDetail/CustomerSupplier.scss";
import ThirdPartyApiConfigurationInfoCard from '../thirdPartyApiConfigurationInfoCard/ThirdPartyApiConfigurationInfoCard';
import ThirdPartyApiConfigurationViewTab from '../thirdPartyApiConfigurationViewTab/ThirdPartyApiConfigurationViewTab';
import AddEditThirdPartyApiConfiguration from '../../../addEditThirdPartyApiConfiguration/AddEditThirdPartyApiConfiguration';
import { AppIcons } from '../../../../../../../data/appIcons';
import SidebarModel from '../../../../../../../components/ui/sidebarModel/SidebarModel';


export const ThirdPartyApiConfigurationViewDetails = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };
  const onSidebarClose = () => {
    setIsModelOpen(false);

  };

  return (
    <>
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 basic-left-part customer-desc-left-sec mb-2 mt-2">
            <CardSection>
              <ThirdPartyApiConfigurationInfoCard
                editClick={handleToggleModal}
              />
            </CardSection>
          </div>
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
            <ThirdPartyApiConfigurationViewTab />
          </div>
        </div>
      </div>
      <SidebarModel
        modalTitle="Update"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditThirdPartyApiConfiguration
          isOpen={isModelOpen}
          initData={formData}
          // getCustomerById={onGetData}
          onClose={onSidebarClose}
          isEditablePage={true}
        />
      </SidebarModel>
    </>
  )
}
