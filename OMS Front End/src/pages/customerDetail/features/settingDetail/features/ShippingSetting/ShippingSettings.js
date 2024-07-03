import React, { useContext, useEffect, useRef, useState } from "react";
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

//** Component's */
const ManageCarrier = React.lazy(() => import("../Carrier/ManageCarrier"));
const ManageDevliveryMethod = React.lazy(() => import("../DeliveryMethod/ManageDevliveryMethod"));

const ShippingSettings = ({ isEditablePage }) => {

  const ref = useRef();
  const { confirm } = SwalAlert();
  const [isShowButton, setIsShowButton] = useState(true);
  const [accountTypeId, setAccountTypeId] = useState(0);
  const [isDefaultValue, setIsDefaultValue] = useState(0);
  const [formData, setFormData] = useState(shippingFormData);
  const { customerId, setDeliveryMethodsList, setCarriersList, isResponsibleUser } = useContext(BasicDetailContext);

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
          "Yes", "No"
        ).then((confirmed) => {
          let request = {
            customerId: customerId,
            deliveryAccountId: data.value,
            isByDefault: true
          }
          if (confirmed) {
            setIsDefaultValue(true);
            addDefaultShippings(request);
            setAccountTypeId(data.value);
          } else if (!confirmed) {
            let request = {
              customerId: customerId,
              deliveryAccountId: data.value,
              isByDefault: false
            }
            setIsDefaultValue(false);
            addDefaultShippings(request);
            setAccountTypeId(data.value);
          }
        });
      } else {
        confirm("Shipping Methods?",
          "Are you sure you want to Add Default Shipping Method?",
          "Yes", "No"
        ).then((confirmed) => {
          let request = {
            customerId: customerId,
            deliveryAccountId: data.value,
            isByDefault: true
          }
          if (confirmed) {
            setIsDefaultValue(true);
            addDefaultShippings(request);
            setAccountTypeId(data.value);
          } else if (!confirmed) {
            let request = {
              customerId: customerId,
              deliveryAccountId: data.value,
              isByDefault: false
            }
            setIsDefaultValue(false);
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
    <div className="row horizontal-form">
      <FormCreator config={formData} ref={ref} {...formData} onActionChange={formActionHandler} />
      {!isGetDefaultValueFetching ?
        <div className="grid-section">
          {accountTypeId === 1 ?
            <ManageDevliveryMethod isShowButton={isShowButton} handleGetDefaultList={handleGetDefaultList} isGetDataLoading={isGetDefaultValueFetching} /> :
            accountTypeId === 2 ?
              <>
                <ManageCarrier isShowButton={isShowButton} handleGetDefaultList={handleGetDefaultList} isGetDataLoading={isGetDefaultValueFetching} />
                <ManageDevliveryMethod isShowButton={isShowButton} handleGetDefaultList={handleGetDefaultList} isGetDataLoading={isGetDefaultValueFetching} />
              </> : null
          }
        </div>
        : <DataLoader />}
    </div>
  );
};

export default ShippingSettings;
