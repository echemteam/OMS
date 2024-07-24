import React from 'react'
import CardSection from '../../../../../../../components/ui/card/CardSection'
import "../../../../../../customerDetail/CustomerSupplier.scss";
import { AppIcons } from '../../../../../../../data/appIcons';
import Buttons from '../../../../../../../components/ui/button/Buttons';
import ThirdPartyApiConfigurationInfoCard from '../thirdPartyApiConfigurationInfoCard/ThirdPartyApiConfigurationInfoCard';
import ThirdPartyApiConfigurationViewTab from '../thirdPartyApiConfigurationViewTab/ThirdPartyApiConfigurationViewTab';


export const ThirdPartyApiConfigurationViewDetails = () => {
  return (
    <>
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 basic-left-part customer-desc-left-sec mb-2 mt-2">
            <CardSection>
              <ThirdPartyApiConfigurationInfoCard />
            </CardSection>
          </div>
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
            {/* <Buttons buttonTypeClassName="back-button btn dark-btn"
              textWithIcon={true} buttonText="Back" imagePath={AppIcons.BackArrowIcon}></Buttons> */}
            <ThirdPartyApiConfigurationViewTab />
          </div>
        </div>
      </div>
      {/* <SidebarModel
      modalTitle="Edit Basic Information"
      contentClass="content-50 basic-info-model"
      onClose={onSidebarClose}
      modalTitleIcon={AppIcons.AddIcon}
      isOpen={isModelOpen}>
      <SupplierBasicDetail
        onSidebarClose={onSidebarClose}
        isOpen={isModelOpen}
        supplierData={supplierData}
        keyId={keyId}
        getSupplierById={onSuccess}
        isEditablePage={true}
      />
    </SidebarModel> */}
    </>
  )
}
