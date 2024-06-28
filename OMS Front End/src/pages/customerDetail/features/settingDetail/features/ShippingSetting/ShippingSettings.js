import React, { useContext, useEffect, useRef, useState } from "react";
//** Lib's */
import { shippingFormData } from "./config/ShippingConfig";
import FormCreator from "../../../../../../components/Forms/FormCreator";
import BasicDetailContext from "../../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import SwalAlert from "../../../../../../services/swalService/SwalService";
import ToastService from "../../../../../../services/toastService/ToastService";
import { useLazyGetAllDeliveryAccountsQuery } from "../../../../../../app/services/commonAPI";
import { useAddCustomerShppingDeliveryCarriersAndDeliveryMethodsMutation, useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery } from "../../../../../../app/services/customerSettingsAPI";
import DataLoader from "../../../../../../components/ui/dataLoader/DataLoader";

//** Component's */
const ManageCarrier = React.lazy(() => import("../Carrier/ManageCarrier"));
const ManageDevliveryMethod = React.lazy(() => import("../DeliveryMethod/ManageDevliveryMethod"));

const ShippingSettings = () => {

  const ref = useRef();
  const { confirm } = SwalAlert();
  const [accountTypeId, setAccountTypeId] = useState(0);
  const [isDefaultValue, setIsDefaultValue] = useState(0);
  const [formData, setFormData] = useState(shippingFormData);
  const { customerId, setDeliveryMethodsList, setCarriersList } = useContext(BasicDetailContext);

  const [getAllAccountType, { isFetching: isAccountTypeFetching, isSuccess: isAccountTypeSuccess, data: isAccountTypeData, },] = useLazyGetAllDeliveryAccountsQuery();
  const [addDefaultShippings, { isLoading: isAddDefaultShippingsLoading, isSuccess: isAddDefaultShippingsSuccess, data: isAddDefaultShippingsData, },] = useAddCustomerShppingDeliveryCarriersAndDeliveryMethodsMutation();
  const [getDefaultList, { isFetching: isGetDefaultValueFetching, isSuccess: isGetDefaultValueSuccess, data: isGetDefaultValueData }] = useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery();

  useEffect(() => {
    getAllAccountType();
    handleGetDefaultList();
  }, []);

  useEffect(() => {
    if (!isAccountTypeFetching && isAccountTypeSuccess && isAccountTypeData) {
      const getData = isAccountTypeData.map((item) => ({
        value: item.deliveryAccountId,
        label: item.name,
      }));
      const dropdownField = shippingFormData.formFields.find((item) => item.dataField === "deliveryAccountId");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isAccountTypeFetching, isAccountTypeSuccess, isAccountTypeData]);

  useEffect(() => {
    if (isAddDefaultShippingsSuccess && isAddDefaultShippingsData) {
      if (isDefaultValue) {
        handleGetDefaultList();
      }
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
      }

      if (isGetDefaultValueData?.shppingDeliveryCarriersList?.length > 0) {
        setCarriersList(isGetDefaultValueData?.shppingDeliveryCarriersList);
      }
    }
  }, [isGetDefaultValueFetching, isGetDefaultValueSuccess, isGetDefaultValueData]);

  const handleChangeDropdown = (data, dataField) => {
    if (dataField === 'deliveryAccountId') {
      if (accountTypeId > 0) {
        confirm("Change Shipping Methods?",
          "Are you sure you want Change the Shipping Method?",
          "Yes", "No", false
        ).then((confirmed) => {
          let request = {
            customerId: customerId,
            deliveryAccountId: data.value
          }
          if (confirmed) {
            setIsDefaultValue(true);
            addDefaultShippings(request);
            setAccountTypeId(data.value);
          }
        });
      } else {
        confirm("Shipping Methods?",
          "Are you sure you want to Add Default Shipping Method?",
          "Yes", "No", false
        ).then((confirmed) => {
          let request = {
            customerId: customerId,
            deliveryAccountId: data.value
          }
          if (confirmed) {
            setIsDefaultValue(true);
            addDefaultShippings(request);
            setAccountTypeId(data.value);
          }
        });
      }
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
    <>
      <div className="row horizontal-form">
        <FormCreator config={formData} ref={ref} {...formData} onActionChange={formActionHandler} />
        {!isGetDefaultValueFetching ?
          <div className="grid-section">
            {accountTypeId === 1 ?
              <ManageDevliveryMethod handleGetDefaultList={handleGetDefaultList} isGetDataLoading={isGetDefaultValueFetching} /> :
              accountTypeId === 2 ?
                <>
                  <ManageCarrier handleGetDefaultList={handleGetDefaultList} isGetDataLoading={isGetDefaultValueFetching} />
                  <ManageDevliveryMethod handleGetDefaultList={handleGetDefaultList} isGetDataLoading={isGetDefaultValueFetching} />
                </> : null
            }
          </div>
          : <DataLoader />}
      </div>
    </>
  );
};

export default ShippingSettings;
