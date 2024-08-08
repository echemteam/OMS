/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
//** Lib's */
import "../../../../customerDetail/CustomerSupplier.scss";
import { AppIcons } from "../../../../../data/appIcons";
import Buttons from "../../../../../components/ui/button/Buttons";
import { decryptUrlData } from "../../../../../services/CryptoService";
import CardSection from "../../../../../components/ui/card/CardSection";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
//** Service's */
import { useLazyGetSupplierBasicInformationByIdQuery } from "../../../../../app/services/supplierAPI";

//** Component's */
const SupplierViewTab = React.lazy(() => import("../../../feature/supplierViewDetail/supplierViewTabs/SupplierViewTab"));
const SupplierBasicDetail = React.lazy(() => import("../../../feature/supplierBasicDetail/SupplierBasicDetail"));
const SupplierBasicInfoCard = React.lazy(() => import("../../../feature/supplierViewDetail/SupplierBasicInfo/SupplierBasicInfoCard"));

const SupplierDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const keyId = id ? decryptUrlData(id) : 0;
  const [isModelOpen, setisModelOpen] = useState(false);
  const [supplierData, setSupplierData] = useState(null);
  const authState = useSelector((state) => state.auth);

  const { setSupplierId, supplierId, setIsResponsibleUser } = useContext(AddSupplierContext);

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

  const onSuccess = () => {
    keyId && getSupplierBasicInformationById(keyId);
  }

  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };
  const handleBackClick = () => {
    navigate("/Suppliers");
  };


  return (
    <>
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 basic-left-part customer-desc-left-sec mb-2 mt-2">
            <CardSection>
              <SupplierBasicInfoCard
                editClick={handleToggleModal}
                supplierData={supplierData}
                isLoading={!isModelOpen ? isGetSupplierBasicInformationByIdFetching : null}
                supplierId={supplierId}
                getSupplierById={onSuccess} />
            </CardSection>
          </div>
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
            <Buttons buttonTypeClassName="back-button btn dark-btn" onClick={handleBackClick}
              textWithIcon={true} buttonText="Back" imagePath={AppIcons.BackArrowIcon}></Buttons>
            {/* Supplier Tab's */}
            <SupplierViewTab supplierId={supplierId} />
          </div>
        </div>
      </div>
      <SidebarModel
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
      </SidebarModel>
    </>
  );
};

export default SupplierDetails;
