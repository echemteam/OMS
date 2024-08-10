import React, { useEffect, useState } from 'react'
import CardSection from '../../../../../../../components/ui/card/CardSection'
import "../../../../../../customerDetail/CustomerSupplier.scss";
import ThirdPartyApiConfigurationInfoCard from '../thirdPartyApiConfigurationInfoCard/ThirdPartyApiConfigurationInfoCard';
import ThirdPartyApiConfigurationViewTab from '../thirdPartyApiConfigurationViewTab/ThirdPartyApiConfigurationViewTab';
import AddEditThirdPartyApiConfiguration from '../../../addEditThirdPartyApiConfiguration/AddEditThirdPartyApiConfiguration';
import { AppIcons } from '../../../../../../../data/appIcons';
import SidebarModel from '../../../../../../../components/ui/sidebarModel/SidebarModel';
import { useLazyGetApiEventByApiEventIdQuery } from '../../../../../../../app/services/thirdPartyAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { decryptUrlData } from '../../../../../../../services/CryptoService';
import Buttons from '../../../../../../../components/ui/button/Buttons';


export const ThirdPartyApiConfigurationViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const keyId = id ? decryptUrlData(id) : 0;
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [viewCardDetails, setViewCsrdDetails] = useState(null);

  const [getApiEventByApiEventId, { isFetching: isGetApiEventByApiEventIdFetching, isSuccess: isGetApiEventByApiEventIdSuccess, data: GetApiEventByApiEventIdData, },] = useLazyGetApiEventByApiEventIdQuery();

  useEffect(() => {
    if (keyId) {
      getApiEventByApiEventId(keyId)
    }
  }, [keyId])

  useEffect(() => {
    if (isGetApiEventByApiEventIdSuccess && GetApiEventByApiEventIdData && !isGetApiEventByApiEventIdFetching) {
      setViewCsrdDetails(GetApiEventByApiEventIdData);
    }
  }, [isGetApiEventByApiEventIdSuccess, GetApiEventByApiEventIdData, isGetApiEventByApiEventIdFetching]);

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const onRepetGetData = (id) => {
    getApiEventByApiEventId(id)
  }

  const handleBackClick = () => {
    navigate("/ThirdPartyApiConfiguration");
  }

  return (
    <>
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 basic-left-part customer-desc-left-sec mb-2 mt-2">
            <CardSection>
              <ThirdPartyApiConfigurationInfoCard
                editClick={handleToggleModal}
                viewCardDetails={viewCardDetails}
              />
            </CardSection>
          </div>
          <div className='d-flex justify-content-end'> 
            <Buttons
              buttonTypeClassName="btn dark-btn"
              onClick={handleBackClick}
              textWithIcon={true}
              buttonText="Back"
              imagePath={AppIcons.BackArrowIcon}
            ></Buttons>
          </div>
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab grid-over-flow">
            <ThirdPartyApiConfigurationViewTab
              keyId={keyId}
            />
          </div>
        </div>
      </div>
      <SidebarModel
        modalTitle="Update Api Event"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditThirdPartyApiConfiguration
          isOpen={isModelOpen}
          onClose={onSidebarClose}
          isEditablePage={true}
          viewCardDetails={viewCardDetails}
          keyId={keyId}
          onRepetGetData={onRepetGetData}
          isUpdate={true}
        />
      </SidebarModel>
    </>
  )
}
