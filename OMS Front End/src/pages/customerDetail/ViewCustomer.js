import React, { useContext, useEffect, useState } from "react";
import "./ViewCustomer.scss";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import BasicDetail from "./features/basicDetail/BasicDetail";
import CardSection from "../../components/ui/card/CardSection";
import CustomerDetails from "./features/basicDetail/CustomerDetails";
import { AppIcons } from "../../data/appIcons";
import SidebarModel from "../../components/ui/sidebarModel/SidebarModel";
import SettingDetails from "./features/settingDetail/SettingDetails";
import BasicDetailContext from "../../utils/ContextAPIs/Customer/BasicDetailContext";
import NotesDetail from "./features/notesDetail/NotesDetail";
import { useLazyGetCustomersBasicInformationByIdQuery } from "../../app/services/basicdetailAPI";
import { useParams } from "react-router-dom";
import { decryptUrlData } from "../../services/CryptoService";
import { HistoryDetail } from "./features/HistoryDetail/HistoryDetail";
import { useNavigate } from "react-router-dom/dist";
import Button from "../../components/ui/button/Buttons";
import CustomerContactDetails from "./features/contactDetail/Contact/CustomerContactDetails";
import CustomerDocumentDetails from "./features/documentsDetail/CustomerDocumentDetails";
import CustomerAddressDetails from "./features/addressDetail/CustomerAddressDetails";

const ViewCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pageId = id ? decryptUrlData(id) : 0;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const { setCustomerId, customerId } = useContext(BasicDetailContext);

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
      setCustomerData(GetCustomersBasicInformationByIdData);
      console.log(
        "isGetCustomersBasicInformationByIdFetching",
        isGetCustomersBasicInformationByIdFetching
      );
    }
  }, [
    isGetCustomersBasicInformationById,
    GetCustomersBasicInformationByIdData,
    isGetCustomersBasicInformationByIdFetching,
  ]);

  useEffect(() => {
    if (pageId) {
      setCustomerId(pageId);
      getCustomersBasicInformationById(pageId);
    }
  }, []);

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
            <RenderTabs tabs={tabs} />
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
