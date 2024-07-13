/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "../../../../customerDetail/ViewCustomer.scss";
import { useParams } from "react-router-dom";
import { useLazyGetSupplierBasicInformationByIdQuery } from "../../../../../app/services/supplierAPI";
import { decryptUrlData } from "../../../../../services/CryptoService";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import RenderTabs from "../../../../../components/ui/tabs/RenderTabs";
import { AppIcons } from "../../../../../data/appIcons";
import SupplierViewDetail from "./features/SupplierViewDetail";
import CardSection from "../../../../../components/ui/card/CardSection";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import Buttons from "../../../../../components/ui/button/Buttons";
import { useNavigate } from "react-router-dom/dist";
import SupplierDocumentDetail from "./features/docuementsDetail/SupplierDocuementDetail";
import { SupplierHistoryDetail } from "./features/historyDetails/SupplierHistoryDetail";
import { useSelector } from "react-redux";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { securityKey } from "../../../../../data/SecurityKey";
import ManageSupplierNotes from "./features/notesDetails/ManageSupplierNotes";
import SupplierBasicDetail from "../../../feature/supplierBasicDetail/SupplierBasicDetail";
import SuplierAddressDetails from "../../../feature/supplierAddressDetail/SupplierAddressDetails";
import SupplierContactDetail from "../../../feature/supplierContactDetail/SupplierContactDetail";

const SupplierDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const keyId = id ? decryptUrlData(id) : 0;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [supplierData, setSupplierData] = useState(null);
  const authState = useSelector((state) => state.auth);

  const { setSupplierId, supplierId, isResponsibleUser, setIsResponsibleUser } = useContext(AddSupplierContext);

  const [
    getSupplierBasicInformationById,
    {
      isFetching: isGetSupplierBasicInformationByIdFetching,
      isSuccess: isGetSupplierBasicInformationById,
      data: GetSupplierBasicInformationByIdData,
    },
  ] = useLazyGetSupplierBasicInformationByIdQuery();

  const hasNotePermission = hasFunctionalPermission(securityKey.SUPPLIERNOTES);
  const hasAddressPermission = hasFunctionalPermission(
    securityKey.SUPPLIERADDRESS
  );
  const hasContactPermission = hasFunctionalPermission(
    securityKey.SUPPLIERCONTACT
  );
  const hasHistoryPermission = hasFunctionalPermission(
    securityKey.SUPPLIERHISTORY
  );
  const hasDocumentPermission = hasFunctionalPermission(
    securityKey.SUPPLIERDOCUMENT
  );

  useEffect(() => {
    if (
      isGetSupplierBasicInformationById &&
      GetSupplierBasicInformationByIdData &&
      !isGetSupplierBasicInformationByIdFetching
    ) {
      setSupplierData(GetSupplierBasicInformationByIdData);
      if (authState?.user?.userID !== GetSupplierBasicInformationByIdData.responsibleUserId) {
        setIsResponsibleUser(false);
      }
    }
  }, [
    isGetSupplierBasicInformationById,
    GetSupplierBasicInformationByIdData,
    isGetSupplierBasicInformationByIdFetching,
  ]);

  useEffect(() => {
    if (keyId) {
      setSupplierId(keyId);
      getSupplierById(keyId);
    }
  }, []);

  const getSupplierById = (keyId) => {
    keyId && getSupplierBasicInformationById(keyId);
  };

  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };
  const handleBackClick = () => {
    navigate("/Suppliers");
  };
  const tabs = [
    {
      sMenuItemCaption: "Address",
      component: (
        <div className="mt-2">
          <SuplierAddressDetails isEditablePage={true} />
        </div>
      ),
      isVisible: hasAddressPermission.hasAccess,
    },
    {
      sMenuItemCaption: "Contact",
      component: (
        <div className="mt-2">
          <SupplierContactDetail isEditablePage={true} isSearchFilterShow={true} />
        </div>
      ),
      isVisible: hasContactPermission.hasAccess,
    },
    {
      sMenuItemCaption: "Documents",
      component: (
        <div className="mt-2">
          <SupplierDocumentDetail keyId={keyId} isEditablePage={true} />
        </div>
      ),
      isVisible: hasDocumentPermission.hasAccess,
    },
    {
      sMenuItemCaption: "Notes",
      component: (
        <div className="mt-2">{<ManageSupplierNotes isEditablePage={true} />}</div>
      ),
      isVisible: hasNotePermission.hasAccess,
    },
    {
      sMenuItemCaption: "History",
      component: (
        <div className="mt-2">{<SupplierHistoryDetail />}</div>
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
              <SupplierViewDetail
                editClick={handleToggleModal}
                supplierData={supplierData}
                isLoading={isGetSupplierBasicInformationByIdFetching}
                supplierId={supplierId}
                onhandleRepeatCall={getSupplierById}
              />
            </CardSection>
          </div>
          <div className="col-xxl-9 col-xl-9 col-md-5 col-12 other-info-tab">
            <Buttons
              buttonTypeClassName="back-button btn dark-btn"
              onClick={handleBackClick}
              textWithIcon={true}
              buttonText="Back"
              imagePath={AppIcons.BackArrowIcon}
            ></Buttons>
            <RenderTabs tabs={supplierId ? visibleTabs : null} />
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
        <SupplierBasicDetail
          onSidebarClose={onSidebarClose}
          isOpen={isModelOpen}
          supplierData={supplierData}
          keyId={keyId}
          getSupplierById={getSupplierById}
        />
      </SidebarModel>
    </>
  );
};

export default SupplierDetails;
