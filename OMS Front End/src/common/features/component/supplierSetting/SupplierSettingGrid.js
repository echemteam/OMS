import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import FormCreator from "../../../../components/Forms/FormCreator";
import { financialSettingFormData } from "./config/FinancialSettingForm.data";
import ACHWireDetail from "./feature/ACHWireDetail";
import RenderTabs from "../../../../components/ui/tabs/RenderTabs";
import CreditCardDetail from "./feature/CreditCardDetail";
import Buttons from "../../../../components/ui/button/Buttons";
import CheckDetail from "./feature/CheckDetail";
import OtherDetail from "./feature/OtherDetail";
import { useLazyGetAllPaymentMethodQuery, useLazyGetAllPaymentTermsQuery } from "../../../../app/services/customerSettingsAPI";
import { setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../app/services/basicdetailAPI";
import { SupplierFinancialSettings } from "../../../../utils/Enums/commonEnums";
import { useLazyGetAllPODeliveryMethodQuery } from "../../../../app/services/supplierFinancialSettingsAPI";

const SupplierSettingGrid = ({supplierId}) => {
  const financialSettingFormRef = useRef();
  const [financialSettingForm, setfinancialSettingForm] = useState(financialSettingFormData);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  const [getAllPaymentTerms, { isFetching: isGetAllPaymentTermsFetching, isSuccess: isGetAllPaymentTermsSuccess, data: isGetAllPaymentTermsData }] = useLazyGetAllPaymentTermsQuery();
  const [getAllPaymentMethod, { isFetching: isGetAllPaymentMethodFetching, isSuccess: isGetAllPaymentMethodSuccess, data: isGetAllPaymentMethodData }] = useLazyGetAllPaymentMethodQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSucess, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStatesSucess, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
  const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllDeliveryAccounts, { isFetching: isGetAllPODeliveryMethodFetching, isSuccess: isGetAllPODeliveryMethodSuccess, data: isGetAllPODeliveryMethodData }] = useLazyGetAllPODeliveryMethodQuery();

  useEffect(() => {
    getAllPaymentTerms();
    getAllPaymentMethod();
    getAllDeliveryAccounts()
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

  const addressDetailProps = {
    financialSettingFormRef,
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
            <RenderTabs tabs={tabs} isCollapse={true} />
          </div>
        </CardSection>
      </div>
    </div>
  );
};

export default SupplierSettingGrid;
