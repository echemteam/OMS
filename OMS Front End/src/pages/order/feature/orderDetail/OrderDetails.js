import React, { useContext, useEffect, useRef, useState } from "react";
import { orderInformationData } from "./config/OrderInformation.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import SwalAlert from "../../../../services/swalService/SwalService";
import { useGetAllSubCustomerByCustomerIdMutation, useLazyGetAllCustomersQuery,useLazyGetAllAddressesByCustomerIdAndAddressTypeIdQuery } from "../../../../app/services/commonAPI";
import { setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../data/appIcons";
import { addressFormData } from "../../../../../src/common/features/component/Address/config/AddressForm.data";
import { AddressType } from "../../../../utils/Enums/commonEnums";
import NoRecordFound from "../../../../components/ui/noRecordFound/NoRecordFound";
import AddEditAddress from "../../../../common/features/component/Address/feature/AddEditAddress";
import { useAddAddressMutation, useLazyGetAllAddressTypesQuery, useLazyGetCustomerAddresssByAddressIdQuery, useUpdateAddAddressMutation } from "../../../../app/services/addressAPI";
import AddOrderContext from "../../../../utils/Order/AddOrderContext";

const OrderDetails = () => {
  const basicInformation = useRef();

  const [formData, setFormData] = useState(orderInformationData);
  const [isSubCustomerDropdownVisible, setIsSubCustomerDropdownVisible] = useState(false);
  const { blocked } = SwalAlert();
  const [getAllCustomers, { isFetching: isGetAllCustomersFetching, isSuccess: isGetAllCustomersSuccess, data: isGetAllCustomersData }] = useLazyGetAllCustomersQuery();
  const [getAllSubCustomerByCustomerId, { isFetching: isGetAllSubCustomersFetching, isSuccess: isGetAllSubCustomersSuccess, data: isGetAllSubCustomersData }] = useGetAllSubCustomerByCustomerIdMutation();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [getAddressData, setGetAddressData] = useState(null)
  const [getAddressTypeId, setGetAddressTypeId] = useState(null)

  const { orderCustomerId, setOrderCustomerId } = useContext(AddOrderContext);

  const [getAllAddressesByCustomerIdAndAddressTypeId, { isFetching: isGetAllAddressesByCustomerIdAndAddressTypeIdFetching, isSuccess: isGetAllAddressesByCustomerIdAndAddressTypeIdSuccess, data: isGetAllAddressesByCustomerIdAndAddressTypeIdData }] = useLazyGetAllAddressesByCustomerIdAndAddressTypeIdQuery();
  const [getAllAddressTypes, { isSuccess: isGetAllAddressTypesSucess, data: allGetAllAddressTypesData }] = useLazyGetAllAddressTypesQuery();

  useEffect(() => {
    if (isGetAllAddressTypesSucess && allGetAllAddressTypesData) {
      const filterCondition = (item) => {
        let condition = item.isForCustomers
        return condition;
      };
      setDropDownOptionField(allGetAllAddressTypesData, 'addressTypeId', 'type', addressFormData, 'addressTypeId', filterCondition);
    }
  }, [isGetAllAddressTypesSucess, allGetAllAddressTypesData]);

  useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        addressTypeId: AddressType.Shipping
      }
      getAllAddressesByCustomerIdAndAddressTypeId(req)
    }
  }, [orderCustomerId])

  useEffect(() => {
    getAllAddressTypes();
  }, []);

  useEffect(() => {
    if (!isGetAllAddressesByCustomerIdAndAddressTypeIdFetching && isGetAllAddressesByCustomerIdAndAddressTypeIdSuccess && isGetAllAddressesByCustomerIdAndAddressTypeIdData) {
      setDropDownOptionField(isGetAllAddressesByCustomerIdAndAddressTypeIdData, 'addressId', 'addressLine1', orderInformationData, 'addressId');
    }
  }, [isGetAllAddressesByCustomerIdAndAddressTypeIdFetching, isGetAllAddressesByCustomerIdAndAddressTypeIdSuccess, isGetAllAddressesByCustomerIdAndAddressTypeIdData])

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const handleOrderInfoRepeatCall = () => {
    let req = {
      customerId: orderCustomerId,
      addressTypeId: AddressType.Shipping
    }
    getAllAddressesByCustomerIdAndAddressTypeId(req)
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    if (!isGetAllCustomersFetching && isGetAllCustomersSuccess && isGetAllCustomersData) {
      const customerData = isGetAllCustomersData.map((item) => ({
        value: item.customerId,
        label: item.name,
        date: item.createdAt,
        status: item.statusName,
        isBuyingForThirdParty: item.isBuyingForThirdParty
      }));
      const dropdownField = formData?.formFields?.find(item => item.dataField === "customerId");

      dropdownField.fieldSetting.options = customerData

      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetAllCustomersFetching, isGetAllCustomersSuccess, isGetAllCustomersData]);

  useEffect(() => {
    if (!isGetAllSubCustomersFetching && isGetAllSubCustomersSuccess && isGetAllSubCustomersData) {
        const subcustomerData = isGetAllSubCustomersData.map((item) => ({
          value: item.subCustomerId,
          label: item.subCustomerName,
          date: item.createdAt,
          status: item.statusName
        }));
        const dropdownField = formData?.formFields?.find(item => item.dataField === "subCustomerMainCustomerId");

      dropdownField.fieldSetting.options = subcustomerData;
      }
  }, [isGetAllSubCustomersFetching, isGetAllSubCustomersSuccess, isGetAllSubCustomersData]);


  useEffect(() => {
    if (!isSubCustomerDropdownVisible) {
      const newFrom = { ...formData };
      newFrom.formFields = newFrom.formFields.filter(field => field.dataField !== "subCustomerMainCustomerId");
      setFormData(newFrom);
    }
  }, [isSubCustomerDropdownVisible]);


  const handleChangeDropdownList = (data, dataField) => {
    if (dataField === "customerId") {
      if (data.isBuyingForThirdParty === true) {
        setIsSubCustomerDropdownVisible(true);
        getAllSubCustomerByCustomerId(data.value);
        const manageData = { ...formData };
        let filteredFormFields;
        filteredFormFields = orderInformationData.formFields
        manageData.formFields = filteredFormFields;
        setFormData(manageData)
        basicInformation.current.updateFormFieldValue({
          customerId: data.value,
          subCustomerMainCustomerId: null
        });
      }
      else{
        setIsSubCustomerDropdownVisible(false);
      }
    }

    const blockedOptionValue = "Blocked";
    if (data.status === blockedOptionValue) {
      blocked(
        "Blocked !",
        "The selected customer is currently blocked. Please choose a different customer",
        "OK",
        "Cancel"
      ).then((result) => {
        if (result) {
          console.log("User acknowledged the blocked status alert.");
        }
      });
    }
    if (data.value && dataField === "addressId") {
      const finalData = isGetAllAddressesByCustomerIdAndAddressTypeIdData?.filter((item) => item.addressId === data.value);
      setGetAddressData(finalData.length ? finalData[0] : null);
    }
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };

  const handleInputGroupButton = (id) => {
    if (id > 0) {
      setGetAddressTypeId(id)
      setIsModelOpen(!isModelOpen);
    }
  };
  const updatedFormData = { ...formData };
  if (!isSubCustomerDropdownVisible) {
    updatedFormData.formFields = updatedFormData.formFields.filter(field => field.dataField !== "subCustomerMainCustomerId");
  }

  return (
    <>
      <div className="row">
        <FormCreator
          config={formData}
          ref={basicInformation}
          {...formData}
          onActionChange={formActionHandler}
          handleInputGroupButton={handleInputGroupButton}
        />
      </div>
      <div className="row address-group">
        <div className="col-4"></div>
        <div className="col-4 address">
          <div>Chemistry Research Laboratory</div>
          <div>MansField Road</div>
          <div>Oxford</div>
          <div>United Kingdom, Oxfordshire OX1 3TA</div>
        </div>
        <div className="col-4 address">
          {getAddressData ? (
            <>
              <div>{getAddressData.addressLine1}</div>
              <div>{getAddressData.addressLine2}</div>
              <div>{getAddressData.cityName}</div>
              <div>{getAddressData.stateName}</div>
              <div>{getAddressData.countryName}, {getAddressData.zipCode}</div>
            </>
          ) : (
            <NoRecordFound />
          )}
        </div>
      </div>

      <SidebarModel
        modalTitle="Add/Edit Address"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        {/* <div className="mt-2">
          <FormCreator
            config={formAddressData}
            ref={ref}
            {...formAddressData}
          />
        </div> */}
        <AddEditAddress
          // editRef={editRef}
          // isSupplier={isSupplier}
          isModelOpen={isModelOpen}
          // editMode={editMode}
          // keyId={keyId}
          // isButtonDisable={isButtonDisable}
          isOrderManage={true}
          updateAddress={useUpdateAddAddressMutation}
          addAddress={useAddAddressMutation}
          getAddresssById={useLazyGetCustomerAddresssByAddressIdQuery}
          onSidebarClose={onSidebarClose}
          getAddressTypeIdOrder={getAddressTypeId}
          orderCustomerId={orderCustomerId}
          onHandleOrderInfoRepeatCall={handleOrderInfoRepeatCall}
        />
      </SidebarModel>
    </>
  );
};

export default OrderDetails;
