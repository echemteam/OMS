/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import Buttons from "../../../../components/ui/button/Buttons";
import ToastService from "../../../../services/toastService/ToastService";
import { OrganizationAccountingFormData } from "./config/OrganizationAccounting.data";
import {
  useAddEditOrganizationAccountingDetailsMutation,
  useLazyGetOrganizationAccountingDetailsQuery,
} from "../../../../app/services/organizationAPI";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { useSelector } from "react-redux";
import FormCreator from "../../../../components/FinalForms/FormCreator";

const OrganizationAccountingDetail = (isEditablePage) => {
  const organizationAccountingRef = useRef();
  const [organizationAccountingData, setOrganizationAccountingData] = useState(
    OrganizationAccountingFormData
  );
  const [
    addEditOrganizationAccountingDetails,
    {
      isLoading: isAddEditOrganizationAccountingDetailsLoading,
      isSuccess: isAddEditOrganizationAccountingDetailsSuccess,
      data: isAddEditOrganizationAccountingDetailsData,
    },
  ] = useAddEditOrganizationAccountingDetailsMutation();
  const [
    getOrganizationAccountingDetails,
    {
      isFetching: isGetOrganizationAccountingDetailsFetching,
      isSuccess: isGetOrganizationAccountingDetailsSuccess,
      data: isGetOrganizationAccountingDetailsData,
    },
  ] = useLazyGetOrganizationAccountingDetailsQuery();
  const [accountingDetailId, setAccountingDetailId] = useState(0);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const { formSetting } = OrganizationAccountingFormData;
  const roles = useSelector((state) => state.auth.roles.roleName);

  useEffect(() => {
    if (isEditablePage) {
      if (roles?.includes("Admin")) {
        setIsButtonDisable(false);
        formSetting.isViewOnly = false;
      } else {
        setIsButtonDisable(true);
        formSetting.isViewOnly = true;
      }
    }
  }, [isEditablePage, roles]);

  useEffect(() => {
    if (
      isAddEditOrganizationAccountingDetailsSuccess &&
      isAddEditOrganizationAccountingDetailsData
    ) {
      ToastService.success(
        isAddEditOrganizationAccountingDetailsData.errorMessage
      );
      getOrganizationAccountingDetails();
    }
  }, [
    isAddEditOrganizationAccountingDetailsSuccess,
    isAddEditOrganizationAccountingDetailsData,
  ]);

  useEffect(() => {
    getOrganizationAccountingDetails();
  }, [getOrganizationAccountingDetails]);

  const handleAddEditAccountingDetail = () => {
    let accountingData = organizationAccountingRef.current.getFormData();
    if (accountingData) {
      const request = {
        ...accountingData,
        organizationAccountingDetailId: accountingDetailId,
        creditLimit: accountingData?.creditLimit,
      };
      addEditOrganizationAccountingDetails(request);
    }
  };

  useEffect(() => {
    if (
      !isGetOrganizationAccountingDetailsFetching &&
      isGetOrganizationAccountingDetailsSuccess &&
      isGetOrganizationAccountingDetailsData
    ) {
      let formData = { ...organizationAccountingData };
      formData.initialState = {
        ...isGetOrganizationAccountingDetailsData,
      };
      setOrganizationAccountingData(formData);
      setAccountingDetailId(
        isGetOrganizationAccountingDetailsData.organizationAccountingDetailId
      );
    }
  }, [
    isGetOrganizationAccountingDetailsFetching,
    isGetOrganizationAccountingDetailsSuccess,
    isGetOrganizationAccountingDetailsData,
  ]);

  if (isGetOrganizationAccountingDetailsFetching) {
    return (
      <div>
        <DataLoader />
      </div>
    ); // Replace with a proper loading spinner or component
  }

  return (
    <div className="row mt-2 add-address-form">
      {/* <h4 className="organization-tab-title">Accounting Details</h4> */}
      <div className="col-12">
        <FormCreator
          config={organizationAccountingData}
          ref={organizationAccountingRef}
        />
      </div>
      {isEditablePage ? (
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-end justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText="Save"
              onClick={handleAddEditAccountingDetail}
              isLoading={isAddEditOrganizationAccountingDetailsLoading}
              isDisable={isButtonDisable}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default OrganizationAccountingDetail;
