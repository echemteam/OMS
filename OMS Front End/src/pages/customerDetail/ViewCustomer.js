import React, { useContext, useEffect, useState } from "react";
import "./ViewCustomer.scss";
import CardSection from "../../components/ui/card/CardSection";
import { AppIcons } from "../../data/appIcons";
import SidebarModel from "../../components/ui/sidebarModel/SidebarModel";
import BasicDetailContext from "../../utils/ContextAPIs/Customer/BasicDetailContext";
import { useLazyGetCustomersBasicInformationByIdQuery } from "../../app/services/basicdetailAPI";
import { useParams } from "react-router-dom";
import { decryptUrlData } from "../../services/CryptoService";
import { HistoryDetail } from "./features/HistoryDetail/HistoryDetail";
import { useNavigate } from "react-router-dom/dist";
import Button from "../../components/ui/button/Buttons";
import { getAuthProps } from "../../lib/authenticationLibrary";


const NotesDetail = React.lazy(() => import("./features/notesDetail/NotesDetail"));
const RenderTabs = React.lazy(() => import("../../components/ui/tabs/RenderTabs"));
const BasicDetail = React.lazy(() => import("./features/basicDetail/BasicDetail"));
const CustomerDetails = React.lazy(() => import("./features/basicDetail/CustomerDetails"));
const SettingDetails = React.lazy(() => import("./features/settingDetail/SettingDetails"));
const CustomerAddressDetails = React.lazy(() => import("./features/addressDetail/CustomerAddressDetails"));
const CustomerDocumentDetails = React.lazy(() => import("./features/documentsDetail/CustomerDocumentDetails"));
const CustomerContactDetails = React.lazy(() => import("./features/contactDetail/Contact/CustomerContactDetails"));

const ViewCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pageId = id ? decryptUrlData(id) : 0;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const { setCustomerId, customerId, setIsResponsibleUser } = useContext(BasicDetailContext);

  const [getCustomersBasicInformationById, { isFetching: isGetCustomersBasicInformationByIdFetching, isSuccess: isGetCustomersBasicInformationById, data: GetCustomersBasicInformationByIdData }] = useLazyGetCustomersBasicInformationByIdQuery();

  useEffect(() => {
    if (isGetCustomersBasicInformationById && GetCustomersBasicInformationByIdData && !isGetCustomersBasicInformationByIdFetching) {
      const authData = getAuthProps();
      if (authData.user.userID !== GetCustomersBasicInformationByIdData.responsibleUserId) {
        setIsResponsibleUser(false);
      }
      setCustomerData(GetCustomersBasicInformationByIdData);
    }
  }, [isGetCustomersBasicInformationById, GetCustomersBasicInformationByIdData, isGetCustomersBasicInformationByIdFetching]);

  useEffect(() => {
    if (pageId) {
      setCustomerId(pageId);
      getCustomersBasicInformationById(pageId);
    }
  }, [pageId]);

  const handleRepeatCall = () => {
    getCustomersBasicInformationById(pageId);
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

  const tabs = [
    {
      sMenuItemCaption: "Address",
      component: (
        <div className="mt-2">
          <CustomerAddressDetails isEditablePage={true} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Contact",
      component: (
        <div className="mt-2">
          <CustomerContactDetails isEditablePage={true} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Settings",
      component: (
        <div className="mt-2">
          <SettingDetails />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Documents",
      component: (
        <div className="mt-2">
          <CustomerDocumentDetails isEditablePage={true} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Notes",
      component: (
        <div className="mt-2">
          <NotesDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "History",
      component: (
        <div className="">
          <HistoryDetail />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-4 col-xl-4 col-md-5 col-12 basic-left-part customer-desc-left-sec">
            <CardSection>
              <CustomerDetails
                editClick={handleToggleModal}
                customerData={customerData}
                isLoading={isGetCustomersBasicInformationByIdFetching}
                customerId={customerId}
                onhandleRepeatCall={handleRepeatCall}
              />
            </CardSection>
          </div>
          <div className="col-xxl-8 col-xl-8 col-md-7 col-12 other-info-tab">
            <Button
              buttonTypeClassName="back-button btn dark-btn"
              onClick={handleBackClick}
              textWithIcon={true}
              buttonText="Back"
              imagePath={AppIcons.BackArrowIcon}
            ></Button>
            <RenderTabs tabs={customerId ? tabs : null} />
          </div>
        </div>
      </div>
      <SidebarModel
        modalTitle="Edit Basic Information"
        contentClass="content-65 basic-info-model"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <BasicDetail
          onSidebarClose={onSidebarClose}
          isOpen={isModelOpen}
          customerData={customerData}
          pageId={pageId}
          onhandleRepeatCall={handleRepeatCall}
        />
      </SidebarModel>
    </>
  );
};

export default ViewCustomer;
