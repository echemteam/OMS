import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import FormCreator from "../../../../components/Forms/FormCreator";
import { financialSettingFormData } from "./config/FinancialSettingForm.data";
import ACHWireDetail from "./feature/ACHWireDetail";
import RenderTabs from "../../../../components/ui/tabs/RenderTabs";
import CreditCardDetail from "./feature/CreditCardDetail";
import CheckDetail from "./feature/CheckDetail";
import OtherDetail from "./feature/OtherDetail";
import { useLazyGetAllPaymentMethodQuery, useLazyGetAllPaymentTermsQuery } from "../../../../app/services/customerSettingsAPI";
import { setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../app/services/basicdetailAPI";
import { SupplierFinancialSettings } from "../../../../utils/Enums/commonEnums";
import { useLazyGetAllPODeliveryMethodQuery, useLazyGetPaymentSettingsBySupplierIdQuery, useLazyGetSupplierFinancialSettingsBySupplierIdQuery } from "../../../../app/services/supplierFinancialSettingsAPI";
import { checkFormData } from "./config/CheckForm.data";
import { creditCardFormData } from "./config/CreditCardForm.data";
import { otherFormData } from "./config/OtherForm.data";

const SupplierSettingGrid = ({ supplierId }) => {
  const financialSettingFormRef = useRef();
  const [financialSettingForm, setfinancialSettingForm] = useState(financialSettingFormData);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const [getCheckData, setGetCheckData] = useState(checkFormData)
  const [getCreditData, setGetCreditData] = useState(creditCardFormData)
  const [getOtherData, setGetOtherData] = useState(otherFormData)
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const [getAllPaymentTerms, { isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData }] = useLazyGetAllPaymentTermsQuery();
  const [getAllPaymentMethod, { isFetching: isGetAllPaymentMethodFetching, isSuccess: isGetAllPaymentMethodSuccess, data: isGetAllPaymentMethodData }] = useLazyGetAllPaymentMethodQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSucess, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStatesSucess, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
  const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllDeliveryAccounts, { isFetching: isGetAllPODeliveryMethodFetching, isSuccess: isGetAllPODeliveryMethodSuccess, data: isGetAllPODeliveryMethodData }] = useLazyGetAllPODeliveryMethodQuery();
  const [getSupplierFinancialSettingsBySupplierId, { isFetching: isGetSupplierFinancialSettingsBySupplierIdFetching, isSuccess: isGetSupplierFinancialSettingsBySupplierIdSuccess, data: isGetSupplierFinancialSettingsBySupplierIdData }] = useLazyGetSupplierFinancialSettingsBySupplierIdQuery();
  const [getPaymentSettingsBySupplierId, { isFetching: isGetPaymentSettingsBySupplierIdFetching, isSuccess: isGetPaymentSettingsBySupplierIdSuccess, data: isGetPaymentSettingsBySupplierIdData }] = useLazyGetPaymentSettingsBySupplierIdQuery();

  useEffect(() => {
    getAllPaymentTerms();
    getAllPaymentMethod();
    getAllDeliveryAccounts()
    getSupplierFinancialSettingsBySupplierId(supplierId)
    getPaymentSettingsBySupplierId(supplierId)
  }, []);

  useEffect(() => {
    if (!isGetAllPaymentTermsFetching && isGetAllPaymentTermsSuccess && isGetAllPaymentTermsData) {
      setDropDownOptionField(isGetAllPaymentTermsData, "paymentTermId", "paymentTerm", financialSettingFormData, "paymentTermId");
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (!isGetAllPaymentMethodFetching && isGetAllPaymentMethodSuccess && isGetAllPaymentMethodData) {
      setDropDownOptionField(isGetAllPaymentMethodData, "paymentMethodId", "method", financialSettingFormData, "paymentMethodId");
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (!isGetAllPODeliveryMethodFetching && isGetAllPODeliveryMethodSuccess && isGetAllPODeliveryMethodData) {
      setDropDownOptionField(isGetAllPODeliveryMethodData, "poDeliveryMethodId", "poDeliveryMethod", financialSettingFormData, "poDeliveryMethodId");
      setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllPaymentTermsFetching, isGetAllPaymentTermsSuccess, isGetAllPaymentTermsData, isGetAllPaymentMethodFetching, isGetAllPaymentMethodSuccess, isGetAllPaymentMethodData, isGetAllPODeliveryMethodData, isGetAllPODeliveryMethodSuccess, isGetAllPODeliveryMethodFetching]);

  useEffect(() => {
    if (!isGetSupplierFinancialSettingsBySupplierIdFetching && isGetSupplierFinancialSettingsBySupplierIdSuccess && isGetSupplierFinancialSettingsBySupplierIdData) {
      let formData = { ...financialSettingForm };
      formData.initialState = {
        paymentTermId: isGetSupplierFinancialSettingsBySupplierIdData.paymentTermId,
        paymentMethodId: isGetSupplierFinancialSettingsBySupplierIdData.invoiceSubmissionMethod,
        poDeliveryMethodId: isGetSupplierFinancialSettingsBySupplierIdData.poDeliveryMethodId,
        supplierAccountingSettingId: isGetSupplierFinancialSettingsBySupplierIdData.supplierAccountingSettingId
      };
      setfinancialSettingForm(formData);
    }
  }, [isGetSupplierFinancialSettingsBySupplierIdFetching, isGetSupplierFinancialSettingsBySupplierIdSuccess, isGetSupplierFinancialSettingsBySupplierIdData,]);

  useEffect(() => {
    if (!isGetPaymentSettingsBySupplierIdFetching && isGetPaymentSettingsBySupplierIdSuccess && isGetPaymentSettingsBySupplierIdData) {
      let formCreditData = { ...getCreditData };
      let formCheckData = { ...getCheckData };
      let formOtherData = { ...getOtherData };
      if (activeTabIndex === 1) {
        formCreditData.initialState = {
          supplierPaymentSettingId: isGetPaymentSettingsBySupplierIdData.supplierPaymentSettingId,
          supplierId: supplierId,
          ccNote: isGetPaymentSettingsBySupplierIdData.ccNote,
          isCCExistsOnFile: isGetPaymentSettingsBySupplierIdData.isCCExistsOnFile,
        };
      }
      setGetCreditData(formCreditData);
      if (activeTabIndex === 2) {
        formCheckData.initialState = {
          addressId: isGetPaymentSettingsBySupplierIdData.mailingAddress.addressId ? isGetPaymentSettingsBySupplierIdData.mailingAddress.addressId : 0,
          addressLine1Id: isGetPaymentSettingsBySupplierIdData.mailingAddress.addressLine1,
          addressLine2Id: isGetPaymentSettingsBySupplierIdData.mailingAddress.addressLine2,
          cityId: isGetPaymentSettingsBySupplierIdData.mailingAddress.cityId,
          stateId: isGetPaymentSettingsBySupplierIdData.mailingAddress.stateId,
          countryId: isGetPaymentSettingsBySupplierIdData.mailingAddress.countryId,
          zipCode: isGetPaymentSettingsBySupplierIdData.mailingAddress.zipCode,
          checkMailingAddressId: isGetPaymentSettingsBySupplierIdData.mailingAddress.checkMailingAddressId,
          supplierPaymentSettingId: isGetPaymentSettingsBySupplierIdData.mailingAddress.supplierPaymentSettingId,
        };
        setGetCheckData(formCheckData);
      }
      if (activeTabIndex === 3) {
        formOtherData.initialState = {
          supplierPaymentSettingId: isGetPaymentSettingsBySupplierIdData.supplierPaymentSettingId,
          supplierId: supplierId,
          otherNote: isGetPaymentSettingsBySupplierIdData.otherNote,
        };
        setGetOtherData(formOtherData);
      }
    }
  }, [isGetPaymentSettingsBySupplierIdFetching, isGetPaymentSettingsBySupplierIdSuccess, isGetPaymentSettingsBySupplierIdData,]);

  const addressDetailProps = {
    financialSettingFormRef,
    getCheckData,
    supplierId,
    getAllCities,
    getAllStates,
    getAllCountries,
    isGetAllCitiesSucess,
    allGetAllCitiesData,
    isGetAllStatesSucess,
    allGetAllStatesData,
    isGetAllCountriesSucess,
    allGetAllCountriesData,
  };

  const handleGetById = (id) => {
    getPaymentSettingsBySupplierId(id)
  }

  const onTabClick = (index) => {
    setActiveTabIndex(index)
  }

  const tabs = [
    {
      sMenuItemCaption: "ACH/Wire",
      component: (
        <div className="mt-2">
          <ACHWireDetail
            {...addressDetailProps}
          />
        </div>
      ),
      tab: SupplierFinancialSettings.ACHWIRE,
    },
    {
      sMenuItemCaption: "Credit Card (CC)",
      component: (
        <div className="mt-2">
          <CreditCardDetail
            financialSettingFormRef={financialSettingFormRef}
            supplierId={supplierId}
            getCreditData={getCreditData.initialState}
            onHandleGetById={handleGetById}
          />
        </div>
      ),
      tab: SupplierFinancialSettings.CREDITCARD,
    },
    {
      sMenuItemCaption: "Check",
      component: (
        <div className="mt-2">
          <CheckDetail
            {...addressDetailProps}
            onHandleGetById={handleGetById}
          />
        </div>
      ),
      tab: SupplierFinancialSettings.CHECK,
    },
    {
      sMenuItemCaption: "Other",
      component: (
        <div className="mt-2">
          <OtherDetail
            financialSettingFormRef={financialSettingFormRef}
            supplierId={supplierId}
            getOtherData={getOtherData.initialState}
            onHandleGetById={handleGetById}
          />
        </div>
      ),
      tab: SupplierFinancialSettings.OTHER,
    },
  ];

  return (
    <div className="address-main-card-sec">
      <div className="mb-2">
        <CardSection>
          <div className="row">
            <FormCreator
              config={financialSettingForm}
              ref={financialSettingFormRef}
              {...financialSettingForm}
              key={shouldRerenderFormCreator}
            />
          </div>
        </CardSection>
      </div>
      <div className="payment-method-sec">
        <CardSection cardTitle="Payment Method">
          <div className="vertical-tab-inner">
            <RenderTabs tabs={tabs} isCollapse={true} onTabClick={onTabClick} />
          </div>
        </CardSection>
      </div>
    </div>
  );
};

export default SupplierSettingGrid;
