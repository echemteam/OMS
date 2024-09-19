/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import { shippingFormData } from "./config/ShippingConfig";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import DataLoader from "../../../../../../components/ui/dataLoader/DataLoader";
import BasicDetailContext from "../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import SwalAlert from "../../../../../../services/swalService/SwalService";
import ToastService from "../../../../../../services/toastService/ToastService";
import { useLazyGetAllDeliveryAccountsQuery } from "../../../../../../app/services/commonAPI";
import { useAddCustomerShppingDeliveryCarriersAndDeliveryMethodsMutation, useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery } from "../../../../../../app/services/customerSettingsAPI";
import { securityKey } from "../../../../../../data/SecurityKey";
import { hasFunctionalPermission } from "../../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { OurAccountGridConfig } from "../DeliveryMethod/config/DevliveryConfig";
import { AccountGridConfig } from "../Carrier/config/CarrierConfig";
import { setDropDownOptionField } from "../../../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import PropTypes from "prop-types";

//** Component's */
const ManageCarrier = React.lazy(() => import("../Carrier/ManageCarrier"));
const ManageDevliveryMethod = React.lazy(() => import("../DeliveryMethod/ManageDevliveryMethod"));

const ShippingSettings = ({ isEditablePage, customerStatusId }) => {

  const ref = useRef();
  const { confirm } = SwalAlert();
  const [isShowButton, setIsShowButton] = useState(true);
  const [accountTypeId, setAccountTypeId] = useState(0);
  const [formData, setFormData] = useState(shippingFormData);
  const { customerId, setDeliveryMethodsList, setCarriersList, isResponsibleUser, isExistsFinancialSetting, financialRef } = useContext(BasicDetailContext);

  const [getAllAccountType, { isFetching: isAccountTypeFetching, isSuccess: isAccountTypeSuccess, data: isAccountTypeData, },] = useLazyGetAllDeliveryAccountsQuery();
  const [addDefaultShippings, { isSuccess: isAddDefaultShippingsSuccess, data: isAddDefaultShippingsData, },] = useAddCustomerShppingDeliveryCarriersAndDeliveryMethodsMutation();
  const [getDefaultList, { isFetching: isGetDefaultValueFetching, isSuccess: isGetDefaultValueSuccess, data: isGetDefaultValueData }] = useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery();

  const { formSetting } = shippingFormData;
  const DeliveryActionColumn = OurAccountGridConfig.columns.find(column => column.name === "Action");
  const CarrierActionColumn = AccountGridConfig.columns.find(column => column.name === "Action");
  const hasAddEditPermission = hasFunctionalPermission(securityKey.ADDEDITCUSTOMERSHIPPINGSETTING);

  useEffect(() => {
    if (isEditablePage) {
      if (!isResponsibleUser) {
        if (hasAddEditPermission.hasAccess === true) {
          formSetting.isViewOnly = false;
        } else {
          setIsShowButton(false);
          formSetting.isViewOnly = true;
          DeliveryActionColumn.defaultAction.allowEdit = false;
          DeliveryActionColumn.defaultAction.allowDelete = false;
          CarrierActionColumn.defaultAction.allowEdit = false;
          CarrierActionColumn.defaultAction.allowDelete = false;
        }
      }
    }
  }, [hasAddEditPermission]);

  useEffect(() => {
    getAllAccountType();
    handleGetDefaultList();
  }, [customerId, isEditablePage, isExistsFinancialSetting]);

  useImperativeHandle(financialRef, () => ({
    handleGetDefaultList,
  }));

  useEffect(() => {
    if (!isAccountTypeFetching && isAccountTypeSuccess && isAccountTypeData) {
      setDropDownOptionField(isAccountTypeData, 'deliveryAccountId', 'name', shippingFormData, 'deliveryAccountId');
    }
  }, [isAccountTypeFetching, isAccountTypeSuccess, isAccountTypeData]);

  useEffect(() => {
    if (isAddDefaultShippingsSuccess && isAddDefaultShippingsData) {

      handleGetDefaultList();
      ToastService.success(isAddDefaultShippingsData.errorMessage);
    }
  }, [isAddDefaultShippingsSuccess, isAddDefaultShippingsData]);

  useEffect(() => {
    if (!isGetDefaultValueFetching && isGetDefaultValueSuccess && isGetDefaultValueData) {
      let form = { ...shippingFormData };
      form.initialState = {
        deliveryAccountId: isGetDefaultValueData.deliveryAccountId
      }
      setFormData(form);
      setAccountTypeId(isGetDefaultValueData.deliveryAccountId);

      if (isGetDefaultValueData?.deliveryMethodsList?.length > 0) {
        const updatedDeliveryMethodsList = isGetDefaultValueData?.deliveryMethodsList?.map((data) => ({
          ...data,
          zone: data.isForInternational ? 'International' : 'Domestic'
        }));
        setDeliveryMethodsList(updatedDeliveryMethodsList);
      } else if (isGetDefaultValueData?.deliveryMethodsList?.length === 0) {
        setDeliveryMethodsList([]);
      }

      if (isGetDefaultValueData?.shppingDeliveryCarriersList?.length > 0) {
        setCarriersList(isGetDefaultValueData?.shppingDeliveryCarriersList);
      } else if (isGetDefaultValueData?.shppingDeliveryCarriersList?.length === 0) {
        setCarriersList([]);
      }
    }
  }, [isGetDefaultValueFetching, isGetDefaultValueSuccess, isGetDefaultValueData]);

  const handleChangeDropdown = (data, dataField) => {
    if (dataField === 'deliveryAccountId') {
      confirm(
        "Shipping Methods?", "Are you sure you want to Add Default Shipping Method?",
        "Yes", '', false
      ).then((confirmed) => {
        let request = {
          customerId: customerId,
          deliveryAccountId: data.value
        }
        if (confirmed) {
          let defaultRequest = {
            ...request,
            isByDefault: true
          }
          addDefaultShippings(defaultRequest);
          setAccountTypeId(data.value);
        } else if (!confirmed) {
          let defaultRequest = {
            ...request,
            isByDefault: false
          }
          addDefaultShippings(defaultRequest);
          setAccountTypeId(data.value);
        }
      });
    }
  }
  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdown,
  };

  const handleGetDefaultList = () => {
    if (customerId && customerId > 0) {
      getDefaultList(customerId);
    }
  }


  return (
    <div className="row">
      <FormCreator config={formData} ref={ref} {...formData} onActionChange={formActionHandler} />
      {!isGetDefaultValueFetching ?
        <div className="grid-section">
          {accountTypeId === 1 ?
            <ManageDevliveryMethod isEditablePage={isEditablePage} isShowButton={isShowButton} handleGetDefaultList={handleGetDefaultList} customerStatusId={customerStatusId}
              isGetDataLoading={isGetDefaultValueFetching} /> :
            accountTypeId === 2 ?
              <>
                <ManageCarrier isShowButton={isShowButton} handleGetDefaultList={handleGetDefaultList} isGetDataLoading={isGetDefaultValueFetching}
                  isEditablePage={isEditablePage} customerStatusId={customerStatusId} />
                <ManageDevliveryMethod isShowButton={isShowButton} handleGetDefaultList={handleGetDefaultList} isGetDataLoading={isGetDefaultValueFetching}
                  isEditablePage={isEditablePage} customerStatusId={customerStatusId} />
              </> : null
          }
        </div>
        : <DataLoader />}
    </div>
  );
};

ShippingSettings.propTypes = {
  isEditablePage: PropTypes.bool.isRequired,
};

export default ShippingSettings;
