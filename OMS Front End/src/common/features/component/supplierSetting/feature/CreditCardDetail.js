import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { creditCardFormData } from "../config/CreditCardForm.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import { useAddEditCreditCardMutation } from "../../../../../app/services/supplierFinancialSettingsAPI";
import ToastService from "../../../../../services/toastService/ToastService";

const CreditCardDetail = ({ onHandleGetById, getCreditData, supplierId, financialSettingFormRef }) => {
  const creditCardFormRef = useRef();
  const [creditCardForm, setCreditCardFormDataForm] = useState(creditCardFormData);

  const [addEditCreditCard, { isLoading: isAddEditCreditCardLoading, isSuccess: isAddEditCreditCardSuccess, data: isAddEditCreditCardData }] = useAddEditCreditCardMutation();

  useEffect(() => {
    handleResponse(isAddEditCreditCardSuccess, isAddEditCreditCardData);
  }, [isAddEditCreditCardSuccess, isAddEditCreditCardData]);

  const handleResponse = (success, data) => {
    if (success && data) {
      handleAddResponse(success, data);
    }
  };

  useEffect(() => {
    if (getCreditData.supplierPaymentSettingId > 0) {
      let formCreditData = { ...creditCardForm };
      formCreditData.initialState = {
        ccNote: getCreditData.ccNote,
        isCCExistsOnFile: getCreditData.isCCExistsOnFile
      };
      setCreditCardFormDataForm(formCreditData);
    }
  }, [getCreditData])

  const handleAddResponse = (isSuccess, responseData) => {
    if (isSuccess && responseData) {
      if (responseData.errorMessage.includes("exists")) {
        ToastService.warning(responseData.errorMessage);
        return;
      }
      ToastService.success(responseData.errorMessage);
      if (supplierId) {
        onHandleGetById(supplierId)
      }
    }
  }

  const handleCreditCradAdd = () => {
    let creditCardForm = creditCardFormRef.current.getFormData()
    let formsupplierFinancialSettings = financialSettingFormRef.current.getFormData()
    if (creditCardForm && formsupplierFinancialSettings) {
      let req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId: supplierId,
          supplierAccountingSettingId: formsupplierFinancialSettings.supplierAccountingSettingId ? formsupplierFinancialSettings.supplierAccountingSettingId : 0,
          paymentTermId: formsupplierFinancialSettings.paymentTermId && typeof formsupplierFinancialSettings.paymentTermId === "object" ? formsupplierFinancialSettings.paymentTermId.value : formsupplierFinancialSettings.paymentTermId,
          invoiceSubmissionMethod: formsupplierFinancialSettings.paymentMethodId && typeof formsupplierFinancialSettings.paymentMethodId === "object" ? formsupplierFinancialSettings.paymentMethodId.value : formsupplierFinancialSettings.paymentMethodId,
          poDeliveryMethodId: formsupplierFinancialSettings.poDeliveryMethodId && typeof formsupplierFinancialSettings.poDeliveryMethodId === "object" ? formsupplierFinancialSettings.poDeliveryMethodId.value : formsupplierFinancialSettings.poDeliveryMethodId,
        },
        supplierPaymentSettingId: getCreditData.supplierPaymentSettingId ? getCreditData.supplierPaymentSettingId : 0,
        supplierId: supplierId,
        ccNote: creditCardForm.ccNote,
        isCCExistsOnFile: creditCardForm.isCCExistsOnFile,
      };
      addEditCreditCard(req)
    }
  }

  return (
    <div className="ach-wire-section">
      <div className="sub-card-sec-add">
        <div className="row">
          <FormCreator
            config={creditCardForm}
            ref={creditCardFormRef}
            {...creditCardForm}
          />
        </div>
        <div className="col-md-12">
          <div className="d-flex align-item-end justify-content-end" >
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText="Save"
              onClick={handleCreditCradAdd}
              isLoading={isAddEditCreditCardLoading}
            // isDisable={isButtonDisable}
            />
            {/* <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
            // onClick={onSidebarClose}
            /> */}
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

CreditCardDetail.propTypes = {
  onHandleGetById: PropTypes.func.isRequired,
  getCreditData: PropTypes.shape({
    supplierPaymentSettingId: PropTypes.number,
    ccNote: PropTypes.string,
    isCCExistsOnFile: PropTypes.string,
  }).isRequired,
  supplierId: PropTypes.number.isRequired,
  financialSettingFormRef: PropTypes.shape({
    current: PropTypes.shape({
      getFormData: PropTypes.func
    })
  }).isRequired,
};

export default CreditCardDetail;
