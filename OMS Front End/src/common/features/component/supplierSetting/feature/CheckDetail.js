/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
//** Lib's */
import { checkFormData } from "../config/CheckForm.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import CardSection from "../../../../../components/ui/card/CardSection";
import ToastService from "../../../../../services/toastService/ToastService";
import DynamicAddressForm from "../../ConfigurableAddressForm/DynamicAddressForm";
//** Service's */
import { useAddEditCheckMutation } from "../../../../../app/services/supplierFinancialSettingsAPI";

const CheckDetail = ({ onHandleGetById, getCheckData, supplierId, financialSettingFormRef, isGetPaymentSettingsBySupplierIdSuccess,
  isGetPaymentSettingsBySupplierIdData, getSupplierCompletionCount }) => {

  const checkFormRef = useRef();

  const [addEditCheck, { isLoading: isAddEditCheckLoading, isSuccess: isAddEditCheckSuccess, data: isAddEditCheckData }] = useAddEditCheckMutation();

  useEffect(() => {
    if (isAddEditCheckSuccess && isAddEditCheckData) {
      if (isAddEditCheckData.errorMessage.includes("exists")) {
        ToastService.warning(isAddEditCheckData.errorMessage);
        return;
      }
      ToastService.success(isAddEditCheckData.errorMessage);
      if (supplierId) {
        onHandleGetById(supplierId)
      }
      getSupplierCompletionCount(supplierId);
    }
  }, [isAddEditCheckSuccess, isAddEditCheckData]);

  const handleAddCheckDetail = () => {
    let formsupplierFinancialSettings = financialSettingFormRef.current.getFormData()
    let formcheckForm = checkFormRef.current.getFormData();
    if (formcheckForm && formsupplierFinancialSettings) {
      let req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId: supplierId,
          supplierAccountingSettingId: formsupplierFinancialSettings.supplierAccountingSettingId ? formsupplierFinancialSettings.supplierAccountingSettingId : 0,
          paymentTermId: formsupplierFinancialSettings.paymentTermId && typeof formsupplierFinancialSettings.paymentTermId === "object" ? formsupplierFinancialSettings.paymentTermId.value : formsupplierFinancialSettings.paymentTermId,
          invoiceSubmissionMethod: formsupplierFinancialSettings.paymentMethodId && typeof formsupplierFinancialSettings.paymentMethodId === "object" ? formsupplierFinancialSettings.paymentMethodId.value : formsupplierFinancialSettings.paymentMethodId,
          poDeliveryMethodId: formsupplierFinancialSettings.poDeliveryMethodId && typeof formsupplierFinancialSettings.poDeliveryMethodId === "object" ? formsupplierFinancialSettings.poDeliveryMethodId.value : formsupplierFinancialSettings.poDeliveryMethodId,
        },
        supplierPaymentSettingId: getCheckData.supplierPaymentSettingId ? getCheckData.supplierPaymentSettingId : 0,
        supplierId: supplierId,
        checkMailingAddressId: getCheckData.checkMailingAddressId ? getCheckData.checkMailingAddressId : 0,
        mailingAddress: {
          addressId: getCheckData.addressId ? getCheckData.addressId : 0,
          addressLine1: formcheckForm.addressLine1Id,
          addressLine2: formcheckForm.addressLine2Id,
          cityId: formcheckForm.cityId && typeof formcheckForm.cityId === "object" ? formcheckForm.cityId.value : formcheckForm.cityId,
          stateId: formcheckForm.stateId && typeof formcheckForm.stateId === "object" ? formcheckForm.stateId.value : formcheckForm.stateId,
          countryId: formcheckForm.countryId && typeof formcheckForm.countryId === "object" ? formcheckForm.countryId.value : formcheckForm.countryId,
          zipCode: formcheckForm.zipCode
        },
      };
      addEditCheck(req)
    }
  }

  return (
    <div className="ach-wire-section">
      <div className="sub-card-sec-add">
        <CardSection cardTitle="Mailing Address">
          <DynamicAddressForm
            ref={checkFormRef}
            isGetAddressDetailsSuccess={isGetPaymentSettingsBySupplierIdSuccess}
            isGetAddressDetails={isGetPaymentSettingsBySupplierIdData?.mailingAddress}
            formConfig={checkFormData}
          />
        </CardSection>
        <div className="col-md-12">
          <div className="d-flex align-item-end justify-content-end centered" >
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText="Save"
              onClick={handleAddCheckDetail}
              isLoading={isAddEditCheckLoading}
            />
          </div>
        </div>
      </div>
    </div>

  );
};

CheckDetail.propTypes = {
  onHandleGetById: PropTypes.func.isRequired,
  getCheckData: PropTypes.shape({
    addressId: PropTypes.number,
    addressLine1Id: PropTypes.string,
    addressLine2Id: PropTypes.string,
    cityId: PropTypes.string,
    stateId: PropTypes.string,
    countryId: PropTypes.string,
    zipCode: PropTypes.string,
    supplierPaymentSettingId: PropTypes.number,
    checkMailingAddressId: PropTypes.number,
  }).isRequired,
  supplierId: PropTypes.number.isRequired,
  financialSettingFormRef: PropTypes.shape({
    current: PropTypes.shape({
      getFormData: PropTypes.func
    })
  }).isRequired,
};
export default CheckDetail;
