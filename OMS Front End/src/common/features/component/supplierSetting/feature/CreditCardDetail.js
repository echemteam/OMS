import React, { useEffect, useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { creditCardFormData } from "../config/CreditCardForm.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import { useAddEditCreditCardMutation } from "../../../../../app/services/supplierFinancialSettingsAPI";
import ToastService from "../../../../../services/toastService/ToastService";

const CreditCardDetail = ({supplierId,financialSettingFormRef}) => {
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

  const handleAddResponse = (isSuccess, responseData) => {
    if (isSuccess && responseData) {
      if (responseData.errorMessage.includes("exists")) {
        ToastService.warning(responseData.errorMessage);
        return;
      }
      ToastService.success(responseData.errorMessage);
    }
  }


  const handleCreditCradAdd = () => {
    let creditCardForm = creditCardFormRef.current.getFormData()
    let formsupplierFinancialSettings = financialSettingFormRef.current.getFormData()
    if (creditCardForm || formsupplierFinancialSettings) {
      let req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId: supplierId.supplierId,
          supplierAccountingSettingId: 0,
          paymentTermId: formsupplierFinancialSettings.paymentTermId && typeof formsupplierFinancialSettings.paymentTermId === "object" ? formsupplierFinancialSettings.paymentTermId.value : formsupplierFinancialSettings.paymentTermId,
          invoiceSubmissionMethod: formsupplierFinancialSettings.paymentMethodId && typeof formsupplierFinancialSettings.paymentMethodId === "object" ? formsupplierFinancialSettings.paymentMethodId.value : formsupplierFinancialSettings.paymentMethodId,
          poDeliveryMethodId: formsupplierFinancialSettings.poDeliveryMethodId && typeof formsupplierFinancialSettings.poDeliveryMethodId === "object" ? formsupplierFinancialSettings.poDeliveryMethodId.value : formsupplierFinancialSettings.poDeliveryMethodId,
        },
        supplierPaymentSettingId:0,
        supplierId:supplierId.supplierId,
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
            <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
            // onClick={onSidebarClose}
            />
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default CreditCardDetail;
