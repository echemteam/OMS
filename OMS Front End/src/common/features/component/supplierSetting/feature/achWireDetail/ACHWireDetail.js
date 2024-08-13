/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import CardSection from "../../../../../../components/ui/card/CardSection";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import { achWireFormData } from "../../config/ACHWireForm.data";
import Buttons from "../../../../../../components/ui/button/Buttons";
import { bankAddressFormData } from "../../config/BankAddressForm.data";
import { setDropDownOptionField } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useAddEditACHWireMutation, useLazyGetACHWireBySupplierIdQuery } from "../../../../../../app/services/supplierFinancialSettingsAPI";
import { useLazyGetAllPaymentTermsQuery } from "../../../../../../app/services/customerSettingsAPI";
import { registeredBankAddressForm } from "../../config/RegisteredBankAddressForm.data";
import ToastService from "../../../../../../services/toastService/ToastService";
import BankAddressDetail from "./features/BankAddressDetail";
import RegisteredBankAddressDetail from "./features/RegisteredBankAddressDetail";

const ACHWireDetail = ({ activeTabIndex, supplierId, financialSettingFormRef }) => {
  const aCHWireFormRef = useRef();
  const bankFormRef = useRef();
  const registeredFormRef = useRef();
  const [achWireData, setAchWireData] = useState(achWireFormData);

  const [addEditACHWire, { isLoading: isAddEditACHWireLoading, isSuccess: isAddEditACHWireSuccess, data: isAddEditACHWireData }] = useAddEditACHWireMutation();
  const [getAllPaymentTerms, { isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData }] = useLazyGetAllPaymentTermsQuery();
  const [getACHWireBySupplierId, { isFetching: isGetACHWireBySupplierIdFetching, isSuccess: isGetACHWireBySupplierIdSuccess, data: isGetACHWireBySupplierIdData }] = useLazyGetACHWireBySupplierIdQuery();

  useEffect(() => {
    getAllPaymentTerms();
  }, []);

  useEffect(() => {
    if (activeTabIndex === 0 && supplierId > 0) {
      getACHWireBySupplierId(supplierId)
    }
  }, [activeTabIndex])

  useEffect(() => {
    if (!isGetAllPaymentTermsFetching && isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData) {
      setDropDownOptionField(isGetAllPaymentTermsData, "paymentTermId", "paymentTerm", achWireFormData, "paymentTermId");
    }
  }, [isGetAllPaymentTermsFetching, isGetAllPaymentTermsSuccess, isGetAllPaymentTermsData]);


  useEffect(() => {
    handleResponse(isAddEditACHWireSuccess, isAddEditACHWireData);
  }, [isAddEditACHWireSuccess, isAddEditACHWireData]);

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
      if (supplierId) {
        getACHWireBySupplierId(supplierId)
      }
    }
  }

  useEffect(() => {

    if (!isGetACHWireBySupplierIdFetching && isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData) {

      let formDataAchWire = { ...achWireData };
      if (isGetACHWireBySupplierIdData.supplierBankDetailsId) {
        formDataAchWire.initialState = {
          supplierBankDetailsId: isGetACHWireBySupplierIdData.supplierBankDetailsId,
          bankAddressId: isGetACHWireBySupplierIdData.bankAddressId,
          recipientAddressId: isGetACHWireBySupplierIdData.recipientAddressId,
          supplierId: supplierId,
          messageToRecipient: isGetACHWireBySupplierIdData.messageToRecipient,
          isAddressInUs: isGetACHWireBySupplierIdData.isAddressInUs,
          recipientPhoneNumber: isGetACHWireBySupplierIdData.recipientPhoneNumber,
          paymentTermId: isGetACHWireBySupplierIdData.paymentTermId,
          messageToRecipientBank: isGetACHWireBySupplierIdData.messageToRecipientBank,
          beneficiaryName: isGetACHWireBySupplierIdData.beneficiaryName,
          bankName: isGetACHWireBySupplierIdData.bankName,
          accountType: isGetACHWireBySupplierIdData.accountType,
          accountNumber: isGetACHWireBySupplierIdData.accountNumber,
          branchCode: isGetACHWireBySupplierIdData.branchCode,
          ibanNumber: isGetACHWireBySupplierIdData.ibanNumber,
          swiftCode: isGetACHWireBySupplierIdData.swiftCode,
          routingNumber: isGetACHWireBySupplierIdData.routingNumber,
          sortCode: isGetACHWireBySupplierIdData.sortCode,
          bsbNumber: isGetACHWireBySupplierIdData.bsbNumber,
        }
        setAchWireData(formDataAchWire)
      }
    }
  }, [isGetACHWireBySupplierIdFetching, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData,]);


  const handleACHWireAdd = () => {
    const formsupplierFinancialSettings = financialSettingFormRef.current.getFormData();
    const formBankAddress = bankFormRef.current.getFormData();
    const formRegisteredBankAddress = registeredFormRef.current.getFormData();
    const formOtherDetail = aCHWireFormRef.current.getFormData();

    if (formsupplierFinancialSettings && formBankAddress && formRegisteredBankAddress && formOtherDetail) {
      const extractId = (item, key) => (item[key] && typeof item[key] === "object" ? item[key].value : item[key]);

      const req = {
        supplierFinancialSettings: {
          isActive: true,
          supplierId,
          supplierAccountingSettingId: formsupplierFinancialSettings.supplierAccountingSettingId ?? 0,
          paymentTermId: extractId(formsupplierFinancialSettings, 'paymentTermId'),
          invoiceSubmissionMethod: extractId(formsupplierFinancialSettings, 'paymentMethodId'),
          poDeliveryMethodId: extractId(formsupplierFinancialSettings, 'poDeliveryMethodId'),
        },
        bankAddress: {
          addressId: formBankAddress.addressId ?? 0,
          addressLine1: formBankAddress.addressLine1Id,
          addressLine2: formBankAddress.addressLine2Id,
          cityId: extractId(formBankAddress, 'cityId'),
          stateId: extractId(formBankAddress, 'stateId'),
          countryId: extractId(formBankAddress, 'countryId'),
          zipCode: formBankAddress.zipCode
        },
        recipientAddress: {
          addressId: formRegisteredBankAddress.addressId ?? 0,
          addressLine1: formRegisteredBankAddress.addressLine1Id,
          addressLine2: formRegisteredBankAddress.addressLine2Id,
          cityId: extractId(formRegisteredBankAddress, 'cityId'),
          stateId: extractId(formRegisteredBankAddress, 'stateId'),
          countryId: extractId(formRegisteredBankAddress, 'countryId'),
          zipCode: formRegisteredBankAddress.zipCode
        },
        supplierBankDetailsId: formOtherDetail.supplierBankDetailsId ?? 0,
        bankAddressId: formOtherDetail.bankAddressId ?? 0,
        recipientAddressId: formOtherDetail.recipientAddressId ?? 0,
        supplierId,
        isActive: true,
        messageToRecipient: formOtherDetail.messageToRecipient,
        isAddressInUs: formOtherDetail.isAddressInUs,
        recipientPhoneNumber: formOtherDetail.recipientPhoneNumber,
        paymentTermId: extractId(formOtherDetail, 'paymentTermId'),
        messageToRecipientBank: formOtherDetail.messageToRecipientBank,
        beneficiaryName: formOtherDetail.beneficiaryName,
        bankName: formOtherDetail.bankName,
        accountType: formOtherDetail.accountType,
        accountNumber: formOtherDetail.accountNumber,
        branchCode: formOtherDetail.branchCode,
        ibanNumber: formOtherDetail.ibanNumber,
        swiftCode: formOtherDetail.swiftCode,
        routingNumber: formOtherDetail.routingNumber,
        sortCode: formOtherDetail.sortCode,
        bsbNumber: formOtherDetail.bsbNumber,
      };

      addEditACHWire(req);
    }
  };

  return (
    <div className="ach-wire-section">

      <CardSection cardTitle="Beneficiary Details">
        <div className="row">
          <FormCreator
            config={achWireData}
            ref={aCHWireFormRef}
            {...achWireData}
          />
        </div>
      </CardSection>

      <BankAddressDetail bankFormRef={bankFormRef} bankAddressFormData={bankAddressFormData}
        isGetACHWireBySupplierIdSuccess={isGetACHWireBySupplierIdSuccess}
        isGetACHWireBySupplierIdData={isGetACHWireBySupplierIdData}
      />

      <RegisteredBankAddressDetail
        registeredBankAddressForm={registeredBankAddressForm}
        registeredFormRef={registeredFormRef}
        isGetACHWireBySupplierIdSuccess={isGetACHWireBySupplierIdSuccess}
        isGetACHWireBySupplierIdData={isGetACHWireBySupplierIdData}
      />

      <div className="col-md-12">
        <div className="d-flex align-item-end justify-content-end" >
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            onClick={handleACHWireAdd}
            isLoading={isAddEditACHWireLoading}
          />
        </div>
      </div>
    </div>
  );
};

ACHWireDetail.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  supplierId: PropTypes.number.isRequired,
  financialSettingFormRef: PropTypes.object.isRequired,
};
export default ACHWireDetail;
