/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppIcons } from "../../../../../data/appIcons";
import ApiProviderBasicInfoCard from "./apiProviderInfoCard/ApiProviderBasicInfoCard";
import CardSection from "../../../../../components/ui/card/CardSection";
import { useLazyGetApiProviderByProviderIdQuery } from "../../../../../app/services/apiProviderAPI";
import Buttons from "../../../../../components/ui/button/Buttons";
import {  useNavigate, useParams } from "react-router-dom";
import { decryptUrlData } from "../../../../../services/CryptoService";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import AddEditApiProviders from "../AddEditApiProviders";
import "../../../../customerDetail/customerGrid/feature/customerViewDetail/CustomerDetails.scss";
import ApiproviderViewTab from "./apiProviderViewTab.js/ApiProviderViewTab";


const ApiProviderDetail = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const  mainProviderId= id ? decryptUrlData(id) : 0;
  const [getApiProviderByProviderId,{  isFetching: isGetApiProviderByProviderIdFetching,isSuccess: isGetApiProviderByProviderSuccess,data: GetApiProviderByProviderIdData, },] = useLazyGetApiProviderByProviderIdQuery();
  const[providerFormData,setProviderFormData]=useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
   
  useEffect(()=>{
    getApiProviderByProviderId(mainProviderId)
  },[mainProviderId])
   
  const onGetData=()=>{
    mainProviderId && getApiProviderByProviderId(mainProviderId)
  }
  useEffect(() => {
    if ( isGetApiProviderByProviderSuccess && GetApiProviderByProviderIdData && !isGetApiProviderByProviderIdFetching) {
      setProviderFormData(GetApiProviderByProviderIdData);   
    }
  }, [isGetApiProviderByProviderSuccess, GetApiProviderByProviderIdData, isGetApiProviderByProviderIdFetching]);
  
  
  const handleBackClick = () => {
    navigate("/APIProviders");
  };

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };
  const onSidebarClose = () => {
     setIsModelOpen(false);
  
  };

return(<>
  
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 basic-left-part customer-desc-left-sec mb-2 mt-2">
            <CardSection>
              <ApiProviderBasicInfoCard
                 editClick={handleToggleModal}
                providerFormData={providerFormData}
                 mainProviderId={mainProviderId}
                 getCustomerById={onGetData}
              />
            </CardSection>
          </div>
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
            <Buttons
              buttonTypeClassName="back-button btn dark-btn"
              onClick={handleBackClick}
              textWithIcon={true}
              buttonText="Back"
              imagePath={AppIcons.BackArrowIcon}
            ></Buttons>
            <div className="customer-detail-tab-sec">
              <ApiproviderViewTab providerData={providerFormData} providerId={mainProviderId} />
            </div>
          </div>
        </div>
      </div>
      <SidebarModel
         modalTitle= "Update API Provider"
         contentClass="content-35"
         onClose={onSidebarClose}
         modalTitleIcon={AppIcons.AddIcon}
         isOpen={isModelOpen}
        >
          <AddEditApiProviders
         isOpen={isModelOpen}
          initData={providerFormData}
          getCustomerById={onGetData}
          onClose={onSidebarClose}
          isEditablePage={true}
          />
        </SidebarModel>
    
</>)
}
ApiProviderBasicInfoCard.propTypes = {
  editClick: PropTypes.func.isRequired,
  providerFormData: PropTypes.object,
  mainProviderId: PropTypes.number.isRequired,
  getCustomerById: PropTypes.func,
};

ApiproviderViewTab.propTypes = {
  providerData: PropTypes.object,
  providerId: PropTypes.number.isRequired,
};

AddEditApiProviders.propTypes = {
  isOpen: PropTypes.bool,
  initData: PropTypes.object,
  getCustomerById: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  isEditablePage: PropTypes.bool,
};
export default ApiProviderDetail;