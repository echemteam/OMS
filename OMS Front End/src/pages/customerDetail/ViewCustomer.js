/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./ViewCustomer.scss";
import CardSection from "../../components/ui/card/CardSection";
import { AppIcons } from "../../data/appIcons";
import SidebarModel from "../../components/ui/sidebarModel/SidebarModel";
import BasicDetailContext from "../../utils/ContextAPIs/Customer/BasicDetailContext";
import { useLazyGetCustomersBasicInformationByIdQuery } from "../../app/services/basicdetailAPI";
import { useParams } from "react-router-dom";
import { decryptUrlData } from "../../services/CryptoService";
import { useNavigate } from "react-router-dom/dist";
import Button from "../../components/ui/button/Buttons";
import { securityKey } from "../../data/SecurityKey";
import { hasFunctionalPermission } from "../../utils/AuthorizeNavigation/authorizeNavigation";
import { useSelector } from "react-redux";
import { CustomerHistoryDetail } from "./features/HistoryDetail/CustomerHistoryDetail";

const RenderTabs = React.lazy(() =>
  import("../../components/ui/tabs/RenderTabs")
);
const BasicDetail = React.lazy(() =>
  import("./features/basicDetail/BasicDetail")
);
const CustomerDetails = React.lazy(() =>
  import("./features/basicDetail/CustomerDetails")
);
const SettingDetails = React.lazy(() =>
  import("./features/settingDetail/SettingDetails")
);
const CustomerAddressDetails = React.lazy(() =>
  import("./features/addressDetail/CustomerAddressDetails")
);
const CustomerDocumentDetails = React.lazy(() =>
  import("./features/documentsDetail/CustomerDocumentDetails")
);
const CustomerContactDetails = React.lazy(() =>
  import("./features/contactDetail/Contact/CustomerContactDetails")
);
const ManageCustomerNotes = React.lazy(() =>
  import("./features/notesDetail/ManageCustomerNotes")
);


const ViewCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const authState = useSelector((state) => state.auth);
  const pageId = id ? decryptUrlData(id) : 0;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const { setCustomerId, customerId, isResponsibleUser, setIsResponsibleUser } = useContext(BasicDetailContext);

  const [getCustomersBasicInformationById, { isFetching: isGetCustomersBasicInformationByIdFetching, isSuccess: isGetCustomersBasicInformationById,
    data: GetCustomersBasicInformationByIdData }] = useLazyGetCustomersBasicInformationByIdQuery();

  const hasNotePermission = hasFunctionalPermission(securityKey.CUSTOMERNOTES);
  const hasAddressPermission = hasFunctionalPermission(
    securityKey.CUSTOMERADDRESS
  );
  const hasContactPermission = hasFunctionalPermission(
    securityKey.CUSTOMERCONTACT
  );
  const hasSettingPermission = hasFunctionalPermission(
    securityKey.CUSTOMERSETTING
  );
  const hasHistoryPermission = hasFunctionalPermission(
    securityKey.CUSTOMERHISTORY
  );
  const hasDocumentPermission = hasFunctionalPermission(
    securityKey.CUSTOMERDOCUMENT
  );

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
        <div className="mt-2 contact-accrodiaon-scroll">
          <CustomerAddressDetails isEditablePage={true} />
        </div>
      ),
      isVisible: hasAddressPermission.hasAccess,
    },
    {
      sMenuItemCaption: "Contact",
      component: (
        <div className="mt-2 contact-accrodiaon-scroll">
          <CustomerContactDetails isEditablePage={true} />
        </div>
      ),
      isVisible: hasContactPermission.hasAccess,
    },
    {
      sMenuItemCaption: "Settings",
      component: (
        <div className="mt-2">
          <SettingDetails isEditablePage={true} />
        </div>
      ),
      isVisible: hasSettingPermission.hasAccess,
    },
    {
      sMenuItemCaption: "Documents",
      component: (
        <div className="mt-2">
          <CustomerDocumentDetails isEditablePage={true} />
        </div>
      ),
      isVisible: hasDocumentPermission.hasAccess,
    },
    {
      sMenuItemCaption: "Notes",
      component: (
        <div className="mt-2">
          <ManageCustomerNotes isEditablePage={true} />
        </div>
      ),
      isVisible: hasNotePermission.hasAccess,
    },
    {
      sMenuItemCaption: "History",
      component: (
        <div className="">
          <CustomerHistoryDetail isEditablePage={true} />
        </div>
      ),
      isVisible: hasHistoryPermission.hasAccess,
    },
  ];

  const visibleTabs = !isResponsibleUser
    ? tabs.filter((tab) => tab.isVisible)
    : tabs;

  return (
    <>
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-md-4 col-12 basic-left-part customer-desc-left-sec">
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
          <div className="col-xxl-9 col-xl-9 col-md-8 col-12 other-info-tab">
            <Button
              buttonTypeClassName="back-button btn dark-btn"
              onClick={handleBackClick}
              textWithIcon={true}
              buttonText="Back"
              imagePath={AppIcons.BackArrowIcon}
            ></Button>
            <div className="customer-detail-tab-sec">
              <RenderTabs tabs={customerId ? visibleTabs : null} />
            </div>
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
