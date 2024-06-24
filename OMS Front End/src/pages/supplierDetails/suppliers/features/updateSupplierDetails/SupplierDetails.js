import React, { useContext, useEffect, useRef, useState } from "react";
import "../../../../customerDetail/ViewCustomer.scss";
import { useParams } from "react-router-dom";
import { useLazyGetSupplierBasicInformationByIdQuery } from "../../../../../app/services/supplierAPI";
import { decryptUrlData } from "../../../../../services/CryptoService";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import RenderTabs from "../../../../../components/ui/tabs/RenderTabs";
import { AppIcons } from "../../../../../data/appIcons";
import SupplierData from "./features/SupplierData";
import CardSection from "../../../../../components/ui/card/CardSection";
import SupplierBasicDetail from "../../../addSupplier/features/supplierBasicDetail/SupplierBasicDetail";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import Buttons from "../../../../../components/ui/button/Buttons";
import { useNavigate } from "react-router-dom/dist";
import SupplierDocumentDetail from "./features/docuementsDetail/SupplierDocuementDetail";
 

const SupplierDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pageId = id ? decryptUrlData(id) : 0;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [supplierData, setSupplierData] = useState(null);

  const { nextStepRef } = useContext(AddSupplierContext);

  const [
    getSupplierBasicInformationById,
    {
      isFetching: isGetSupplierBasicInformationByIdFetching,
      isSuccess: isGetSupplierBasicInformationById,
      data: GetSupplierBasicInformationByIdData,
    },
  ] = useLazyGetSupplierBasicInformationByIdQuery();

  useEffect(() => {
    if (
      isGetSupplierBasicInformationById &&
      GetSupplierBasicInformationByIdData &&
      !isGetSupplierBasicInformationByIdFetching
    ) {
      setSupplierData(GetSupplierBasicInformationByIdData);
    }
  }, [
    isGetSupplierBasicInformationById,
    GetSupplierBasicInformationByIdData,
    isGetSupplierBasicInformationByIdFetching,
  ]);

  useEffect(() => {
    if (pageId) {
      // setSupplierId(pageId);
      getSupplierBasicInformationById(pageId);
    }
  }, []);

  const handleRepeatCall = () => {
    getSupplierBasicInformationById(pageId);
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
      component: <div className="mt-2">{/* <AddressDetail /> */}</div>,
    },
    // {
    //   sMenuItemCaption: "Contact",
    //   component: (
    //     <div className="mt-2">
    //       {/* <ContactDetail /> */}
    //     </div>
    //   ),
    // },
    {
      sMenuItemCaption: "Settings",
      component: <div className="mt-2">{/* <SettingDetails /> */}</div>,
    },
    {
      sMenuItemCaption: "Documents",
      component: (
        <div className="mt-2">
          <SupplierDocumentDetail pageId={pageId}/>
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
              <SupplierData
                editClick={handleToggleModal}
                supplierData={supplierData}
                isLoading={isGetSupplierBasicInformationByIdFetching}
                supplierId={pageId}
              />
            </CardSection>
          </div>
          <div className="col-xxl-8 col-xl-8 col-md-7 col-12 other-info-tab">
            <Buttons
              buttonTypeClassName="back-button btn dark-btn"
              onClick={handleBackClick}
              textWithIcon={true}
              buttonText="Back"
              imagePath={AppIcons.BackArrowIcon}
            ></Buttons>
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
        <SupplierBasicDetail
          onSidebarClose={onSidebarClose}
          isOpen={isModelOpen}
          supplierData={supplierData}
          pageId={pageId}
          onhandleRepeatCall={handleRepeatCall}
        />
      </SidebarModel>
    </>
  );
};

export default SupplierDetails;
