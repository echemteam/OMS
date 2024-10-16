/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../../../../../components/FinalForms/FormCreator";
import { otherFormData } from "../config/OtherForm.data";
import { useAddEditOtherMutation } from "../../../../../app/services/supplierFinancialSettingsAPI";
import ToastService from "../../../../../services/toastService/ToastService";
import Buttons from "../../../../../components/ui/button/Buttons";

const OtherDetail = ({ getOtherData, financialSettingFormRef, supplierId, onHandleGetById, getSupplierCompletionCount }) => {

  const otherFormRef = useRef();
  const [otherForm, setOtherForm] = useState(otherFormData);
  const [addEditOther, { isLoading: isAddEditOtherLoading, isSuccess: isAddEditOtherSuccess, data: isAddEditOtherData }] = useAddEditOtherMutation();

  useEffect(() => {
    if (isAddEditOtherSuccess && isAddEditOtherData) {
      if (isAddEditOtherData.errorMessage.includes("exists")) {
        ToastService.warning(isAddEditOtherData.errorMessage);
        return;
      }
      ToastService.success(isAddEditOtherData.errorMessage);
      if (supplierId) {
        onHandleGetById(supplierId)
      }
      getSupplierCompletionCount(supplierId);
    }
  }, [isAddEditOtherData, isAddEditOtherSuccess]);

  useEffect(() => {
    if (getOtherData.supplierPaymentSettingId > 0) {
      let formOtherData = { ...otherForm };
      formOtherData.initialState = {
        supplierPaymentSettingId: getOtherData.supplierPaymentSettingId,
        supplierId: supplierId,
        otherNote: getOtherData.otherNote,
      };
      setOtherForm(formOtherData);
    }
  }, [getOtherData])

  const handleOtherDetailAdd = () => {
    let otherDataForm = otherFormRef.current.getFormData()
    let formsupplierFinancialSettings = financialSettingFormRef.current.getFormData()
    if (otherDataForm && formsupplierFinancialSettings) {
      let req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId: supplierId,
          supplierAccountingSettingId: formsupplierFinancialSettings.supplierAccountingSettingId ? formsupplierFinancialSettings.supplierAccountingSettingId : 0,
          paymentTermId: formsupplierFinancialSettings.paymentTermId && typeof formsupplierFinancialSettings.paymentTermId === "object" ? formsupplierFinancialSettings.paymentTermId.value : formsupplierFinancialSettings.paymentTermId,
          invoiceSubmissionMethod: formsupplierFinancialSettings.paymentMethodId && typeof formsupplierFinancialSettings.paymentMethodId === "object" ? formsupplierFinancialSettings.paymentMethodId.value : formsupplierFinancialSettings.paymentMethodId,
          poDeliveryMethodId: formsupplierFinancialSettings.poDeliveryMethodId && typeof formsupplierFinancialSettings.poDeliveryMethodId === "object" ? formsupplierFinancialSettings.poDeliveryMethodId.value : formsupplierFinancialSettings.poDeliveryMethodId,
        },
        otherNote: otherDataForm.otherNote,
        supplierPaymentSettingId: getOtherData.supplierPaymentSettingId ? getOtherData.supplierPaymentSettingId : 0,
        supplierId: supplierId
      };
      addEditOther(req)
    }
  }

  return (

    <div className="ach-wire-section">
      <div className="sub-card-sec-add">
        <div className="row">
          <FormCreator config={otherForm} ref={otherFormRef} />
        </div>
        <div className="col-md-12">
          <div className="d-flex align-item-end justify-content-end centered" >
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText="Save"
              onClick={handleOtherDetailAdd}
              isLoading={isAddEditOtherLoading}
            />
          </div>
        </div>
      </div>
    </div>

  );
};
OtherDetail.propTypes = {
  getOtherData: PropTypes.shape({
    supplierPaymentSettingId: PropTypes.number,
    otherNote: PropTypes.string,
  }).isRequired,
  financialSettingFormRef: PropTypes.shape({
    current: PropTypes.shape({
      getFormData: PropTypes.func
    })
  }).isRequired,
  supplierId: PropTypes.number.isRequired,
  onHandleGetById: PropTypes.func.isRequired,
};
export default OtherDetail;
