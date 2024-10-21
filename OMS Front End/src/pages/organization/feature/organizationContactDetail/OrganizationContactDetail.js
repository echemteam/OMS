/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { OrganizationContactFormData } from "./config/OrganizationContact.data";
import Buttons from "../../../../components/ui/button/Buttons";
import {
  useAddEditOrganizationContactDetailsMutation,
  useLazyGetOrganizationContactDetailsQuery,
} from "../../../../app/services/organizationAPI";
import ToastService from "../../../../services/toastService/ToastService";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { useSelector } from "react-redux";
import FormCreator from "../../../../components/FinalForms/FormCreator";

const OrganizationContactDetail = (isEditablePage) => {
  const organizationContactRef = useRef();
  const [contactDetailId, setContactDetailId] = useState(0);
  const { formSetting } = OrganizationContactFormData;
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const roles = useSelector((state) => state.auth.roles.roleName);
  const [organizationContactData, setOrganizationContactData] = useState(
    OrganizationContactFormData
  );

  const [
    addEditOrganizationContactDetails,
    {
      isLoading: isAddEditOrganizationContactDetailsLoading,
      isSuccess: isAddEditOrganizationContactDetailsSuccess,
      data: isAddEditOrganizationContactDetailsData,
    },
  ] = useAddEditOrganizationContactDetailsMutation();
  const [
    getOrganizationContactDetails,
    {
      isFetching: isGetOrganizationContactDetailsFetching,
      isSuccess: isGetOrganizationContactDetailsSuccess,
      data: isGetOrganizationContactDetailsData,
    },
  ] = useLazyGetOrganizationContactDetailsQuery();

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
      isAddEditOrganizationContactDetailsSuccess &&
      isAddEditOrganizationContactDetailsData
    ) {
      ToastService.success(
        isAddEditOrganizationContactDetailsData.errorMessage
      );
      getOrganizationContactDetails();
    }
  }, [
    isAddEditOrganizationContactDetailsSuccess,
    isAddEditOrganizationContactDetailsData,
  ]);

  useEffect(() => {
    getOrganizationContactDetails();
  }, []);

  const handleAddEditContactDetail = () => {
    let contactData = organizationContactRef.current.getFormData();
    if (contactData) {
      const request = {
        ...contactData,
        organizationContactDetailId: contactDetailId,
        companyWebsite: contactData?.companyWebsite,
        salesEmail: contactData?.salesEmail,
        accountsEmail: contactData?.accountsEmail,
        purchaseEmail: contactData?.purchaseEmail,
        customerServiceEmail: contactData?.customerServiceEmail,
        salesPhone: contactData?.salesPhone,
        accountsPhone: contactData?.accountsPhone,
        tollFreePhone: contactData?.tollFreePhone,
      };
      addEditOrganizationContactDetails(request);
    }
  };

  useEffect(() => {
    if (
      !isGetOrganizationContactDetailsFetching &&
      isGetOrganizationContactDetailsSuccess &&
      isGetOrganizationContactDetailsData
    ) {
      let formData = { ...organizationContactData };
      formData.initialState = {
        ...isGetOrganizationContactDetailsData,
      };
      setOrganizationContactData(formData);
      setContactDetailId(
        isGetOrganizationContactDetailsData.organizationContactDetailId
      );
    }
  }, [
    isGetOrganizationContactDetailsFetching,
    isGetOrganizationContactDetailsSuccess,
    isGetOrganizationContactDetailsData,
  ]);

  if (isGetOrganizationContactDetailsFetching) {
    return (
      <div>
        <DataLoader />
      </div>
    ); // Replace with a proper loading spinner or component
  }

  return (
    <>
      <div className="row mt-2 add-address-form">
        {/* <h4 className="organization-tab-title">Contact Details</h4> */}
        <div className="col-12">
          <FormCreator
            config={organizationContactData}
            ref={organizationContactRef}
          />
        </div>
        {isEditablePage ? (
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-end justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
                onClick={handleAddEditContactDetail}
                isLoading={isAddEditOrganizationContactDetailsLoading}
                isDisable={isButtonDisable}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default OrganizationContactDetail;
