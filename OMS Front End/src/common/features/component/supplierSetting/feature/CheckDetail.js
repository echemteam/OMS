/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CardSection from "../../../../../components/ui/card/CardSection";
import { checkFormData } from "../config/CheckForm.data";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { useAddEditCheckMutation } from "../../../../../app/services/supplierFinancialSettingsAPI";
import { setDropDownOptionField, setFieldSetting } from "../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import ToastService from "../../../../../services/toastService/ToastService";
import Buttons from "../../../../../components/ui/button/Buttons";
import { FieldSettingType } from "../../../../../utils/Enums/commonEnums";
import { useLazyGetAllCitiesQuery, useLazyGetAllStatesQuery } from "../../../../../app/services/addressAPI";
import { useLazyGetAllCountriesQuery } from "../../../../../app/services/basicdetailAPI";

const CheckDetail = ({ onHandleGetById, getCheckData, supplierId, financialSettingFormRef,isGetPaymentSettingsBySupplierIdSuccess,isGetPaymentSettingsBySupplierIdData }) => {
  const checkFormRef = useRef();
  const [checkformData, setCheckFormData] = useState(checkFormData);

  const [addEditCheck, { isLoading: isAddEditCheckLoading, isSuccess: isAddEditCheckSuccess, data: isAddEditCheckData }] = useAddEditCheckMutation();
  const [getAllCountries, { isSuccess: isGetAllCountriesSuccess, isFetching: isGetAllCountriesFetching, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();
  const [getAllCities, { isSuccess: isGetAllCitiesSuccess, isFetching: isGetAllCitiesFetching, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStateSuccess, isFetching: isGetAllStateFetching, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

  useEffect(() => {
    if (!isGetAllCountriesFetching && isGetAllCountriesSuccess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', checkformData, 'countryId');
    }
  }, [isGetAllCountriesFetching, isGetAllCountriesSuccess, allGetAllCountriesData]);


  useEffect(() => {
    if (!isGetAllCitiesFetching && isGetAllCitiesSuccess && allGetAllCitiesData) {
      const cities = allGetAllCitiesData.map((item) => ({
        value: item.cityId,
        label: item.name,
      }));
      let data = { ...checkformData };
      const dropdownField = data?.formFields?.find(data => data.id === "cityId");
      dropdownField.fieldSetting.options = cities;
      setCheckFormData(data);
    }
  }, [isGetAllCitiesFetching, isGetAllCitiesSuccess, allGetAllCitiesData]);



  useEffect(() => {
    handleResponse(isAddEditCheckSuccess, isAddEditCheckData);
  }, [isAddEditCheckSuccess, isAddEditCheckData]);

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
        onHandleGetById(supplierId)
      }
    }
  }
  useEffect(() => {

    if ( !isGetAllStateFetching && isGetAllStateSuccess &&isGetPaymentSettingsBySupplierIdSuccess && isGetPaymentSettingsBySupplierIdData?.mailingAddress ) {
      const {mailingAddress }= isGetPaymentSettingsBySupplierIdData;
      let data = { ...checkformData };
      if (mailingAddress.countryId) {
        setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', data, 'stateId', item => item.countryId === mailingAddress.countryId);
      }

      if (mailingAddress.stateId) {
        getAllCities(mailingAddress.stateId)
      }

      data.initialState = {
        addressId: mailingAddress.addressId,
        addressLine1Id: mailingAddress.addressLine1,
        addressLine2Id: mailingAddress.addressLine2,
        countryId: mailingAddress.countryId,
        zipCode: mailingAddress.zipCode,
        stateId: mailingAddress.stateId,
        cityId: mailingAddress.cityId,
      };
      setCheckFormData(data);
    }
  }, [isGetAllStateFetching,isGetAllStateSuccess,isGetPaymentSettingsBySupplierIdSuccess, isGetPaymentSettingsBySupplierIdData]);

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

  const handleChangeDropdownList = (data, dataField) => {
    const manageData = { ...checkformData };
    if (dataField === "countryId") {
      setDropDownOptionField(allGetAllStatesData, 'stateId', 'name', manageData, 'stateId', item => item.countryId === data.value);
      setDropDownOptionField(null, 'cityId', 'name', manageData, 'cityId', null);
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      checkFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
        cityId: null
      });
    } else if (dataField === "stateId") {
      getAllCities(data.value)
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      checkFormRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
    setCheckFormData(manageData);
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };


  return (
     
      <div className="ach-wire-section">
        <div className="sub-card-sec-add">
          <CardSection cardTitle="Mailing Address">
            <div className="row">
              <FormCreator
                config={checkformData}
                ref={checkFormRef}
                {...checkformData}
                // key={shouldRerenderFormCreator}
                onActionChange={formActionHandler}
              />
            </div>
            <div className="col-md-12">
              <div className="d-flex align-item-end justify-content-end" >
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Save"
                  onClick={handleAddCheckDetail}
                  isLoading={isAddEditCheckLoading}
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
          </CardSection>
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
