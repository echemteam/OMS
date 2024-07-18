/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "../../../../customerDetail/CustomerSupplier.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { useSelector } from "react-redux";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import CustomerBasicDetail from "../../../feature/customerBasicDetail/CustomerBasicDetail";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../../data/appIcons";
import Buttons from "../../../../../components/ui/button/Buttons";
import { decryptUrlData } from "../../../../../services/CryptoService";
import { useLazyGetCustomersBasicInformationByIdQuery } from "../../../../../app/services/basicdetailAPI";
import CardSection from "../../../../../components/ui/card/CardSection";
import CustomerViewTab from "../../../feature/customerViewDetail/customerViewTab/CustomerViewTab";
import CustomerBasicInfoCard from "../../../feature/customerViewDetail/customerBasicInfoCard/CustomerBasicInfoCard";

const CustomerDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const authState = useSelector((state) => state.auth);
  const keyId = id ? decryptUrlData(id) : 0;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const { setCustomerId, customerId, setIsResponsibleUser, setCustomerCountryId ,setIsSubCompany} = useContext(BasicDetailContext);

  const [
    getCustomersBasicInformationById,
    {
      isFetching: isGetCustomersBasicInformationByIdFetching,
      isSuccess: isGetCustomersBasicInformationById,
      data: GetCustomersBasicInformationByIdData,
    },
  ] = useLazyGetCustomersBasicInformationByIdQuery();

  useEffect(() => {
    if (
      isGetCustomersBasicInformationById &&
      GetCustomersBasicInformationByIdData &&
      !isGetCustomersBasicInformationByIdFetching
    ) {
      if (
        authState?.user?.userID !==
        GetCustomersBasicInformationByIdData.responsibleUserId
      ) {
        setIsResponsibleUser(false);

      }


      setCustomerData(GetCustomersBasicInformationByIdData);
      setCustomerCountryId(GetCustomersBasicInformationByIdData.countryId)
      setIsSubCompany(GetCustomersBasicInformationByIdData.isSubCompany)
    }
  }, [
    isGetCustomersBasicInformationById,
    GetCustomersBasicInformationByIdData,
    isGetCustomersBasicInformationByIdFetching,
  ]);

  useEffect(() => {
    debugger
    if (keyId) {
      setCustomerId(keyId);
      getCustomersBasicInformationById(keyId);

getCustomersBasicInformationById()
    }
  }, [keyId]);

  const onSuccess = () => {
    keyId && getCustomersBasicInformationById(keyId);
  };

  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };
  const handleBackClick = () => {
    navigate("/Customers");
  };

  return (
    <>
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 basic-left-part customer-desc-left-sec mb-2 mt-2">
            <CardSection>
              <CustomerBasicInfoCard
                editClick={handleToggleModal}
                customerData={customerData}
                isLoading={!isModelOpen ? isGetCustomersBasicInformationByIdFetching : null}
                customerId={customerId}
                getCustomerById={onSuccess}
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
              <CustomerViewTab customerId={customerId} />
            </div>
          </div>
        </div>
      </div>
      <SidebarModel
        modalTitle="Edit Customer Basic Information"
        contentClass="content-50 basic-info-model"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <CustomerBasicDetail
          onSidebarClose={onSidebarClose}
          isOpen={isModelOpen}
          customerData={customerData}
          keyId={keyId}
          isEditablePage={true}
          getCustomerById={onSuccess}
        />
      </SidebarModel>
    </>
  );
};

export default CustomerDetails;
