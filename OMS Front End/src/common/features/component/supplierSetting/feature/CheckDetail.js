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

const CheckDetail = ({ onHandleGetById, getCheckData, supplierId, financialSettingFormRef }) => {
  const checkFormRef = useRef();
  const [checkformData, setCheckFormData] = useState(checkFormData);

  const [addEditCheck, { isLoading: isAddEditCheckLoading, isSuccess: isAddEditCheckSuccess, data: isAddEditCheckData }] = useAddEditCheckMutation();
  const [getAllCities, { isSuccess: isGetAllCitiesSucess, data: allGetAllCitiesData }] = useLazyGetAllCitiesQuery();
  const [getAllStates, { isSuccess: isGetAllStatesSucess, data: allGetAllStatesData }] = useLazyGetAllStatesQuery();
  const [getAllCountries, { isSuccess: isGetAllCountriesSucess, data: allGetAllCountriesData }] = useLazyGetAllCountriesQuery();

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

  useEffect(() => {
    if (isGetAllCountriesSucess && allGetAllCountriesData) {
      setDropDownOptionField(allGetAllCountriesData, 'countryId', 'name', checkFormData, 'countryId');
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllStatesSucess && allGetAllStatesData) {
      handleStateOption(allGetAllStatesData);
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
    if (isGetAllCitiesSucess && allGetAllCitiesData) {
      setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', checkFormData, 'cityId');
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllCountriesSucess, allGetAllCountriesData, isGetAllStatesSucess, allGetAllStatesData, isGetAllCitiesSucess, allGetAllCitiesData]);

  const handleStateOption = (responseData) => {
    setDropDownOptionField(responseData, 'stateId', 'name', checkFormData, 'stateId');
  };

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
    if (getCheckData.addressId > 0) {
      if (getCheckData.stateId) {
        getAllCities(getCheckData.stateId)
      }
      let formCheckData = { ...checkformData };
      formCheckData.initialState = {
        // addressId:getCheckData.addressId,
        addressLine1Id: getCheckData.addressLine1Id,
        addressLine2Id: getCheckData.addressLine2Id,
        cityId: getCheckData.cityId,
        stateId: getCheckData.stateId,
        countryId: getCheckData.countryId,
        zipCode: getCheckData.zipCode,
      };
      setCheckFormData(formCheckData);
    }
  }, [getCheckData])

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
      setFieldSetting(manageData, 'stateId', FieldSettingType.DISABLED, false);
      checkFormRef.current.updateFormFieldValue({
        countryId: data.value,
        stateId: null,
      });
    } else if (dataField === "stateId") {
      getAllCities(data.value)
      // setDropDownOptionField(allGetAllCitiesData, 'cityId', 'name', manageData, 'cityId', item => item.stateId === data.value);
      setFieldSetting(manageData, 'cityId', FieldSettingType.DISABLED, false);
      checkFormRef.current.updateFormFieldValue({
        stateId: data.value,
        cityId: null,
      });
    }
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
